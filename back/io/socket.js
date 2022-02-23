const { v4: uuidv4 } = require('uuid');
const sanitize = require('mongo-sanitize');

const lobby = require('./lobby.js');
const game_service = require('../services/game_service.js');
const user_service = require('../services/user_service.js');

const RAITING_RANGE = 100;
const pool = []; 
const empty_spaces = [];


// returns the index where the data is in the pool
function pushIntoPool(data){
  if(empty_spaces.length > 0){
    const empty_index = empty_spaces.shift();
    pool[empty_index] = data;
    return empty_index;
  }
  return pool.push(data) - 1;
}
function deleteItemPool(index){
  const del_data = pool[index];
  delete pool[index];

  let low = 0, high = empty_spaces.length;
  while (low < high) {
    var mid = low + high >>> 1;
    if (empty_spaces[mid] < index) low = mid + 1;
    else high = mid;
  }
  empty_spaces.splice(low, 0, index);
  return del_data;
}

module.exports.listen = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', async (socket) => {
    socket.pool_index = null;
    socket.in_game = false;
    socket.room_id = null;

    let is_authorized = (socket.request.session.user_id) ? true : false;
    let authorized_user_id = (socket.request.session.user_id) ? socket.request.session.user_id : null;

    let userdata = (is_authorized) ? await user_service.getFullUserInfoById(authorized_user_id) : null;
    let user_rating = (is_authorized) ? userdata.stats.rating : null;

    console.log(user_rating);

    socket.on('find_game', async (data) => {
      if(socket.pool_index !== null || socket.in_game === true) return;
      
      let game_preset_id = sanitize(data.game_preset_id);
      let opponent = null;
      
      if(is_authorized){
        let finder = {rating: user_rating, uid: authorized_user_id, socket_id: socket.id, game_preset_id: game_preset_id};
        opponent = lobby.findOpponentForAuthorized(pool, finder, RAITING_RANGE);
      }
      else{
        let finder = {game_preset_id: game_preset_id, socket_id: socket.id};
        opponent = lobby.findOpponentForAnonyms(pool, finder);
      }
      
      if(opponent !== null){     
        const opp_socket = io.sockets.sockets.get(opponent.socket_id);
        const room = io.of("/").adapter.rooms.get(opp_socket.room_id);
        
        socket.room_id = opp_socket.room_id;
        socket.join(opp_socket.room_id);

        room.players_data.push({ userdata: userdata, score: 0, socket_id: socket.id, ready: false});

        if(room.preset.settings.max_players > room.size) return; // waiting for other players

        setTimeout(lobby.breakLobby, 5000, room, io);

        deleteItemPool(opp_socket.pool_index);
        opp_socket.pool_index = null;
        
        room.date_create = new Date;
        io.to(socket.room_id).emit('game_found', socket.room_id, room.preset, room.players_data);
      }
      else{      
        try{
          socket.room_id = uuidv4();
          socket.join(socket.room_id);
          const room = io.of("/").adapter.rooms.get(socket.room_id);

          room.preset = await game_service.getGamePresetById(game_preset_id);
          // TODO: if game for 1 player
          
          room.room_id = socket.room_id;
          room.players_data = [{ userdata: userdata, score: 0, socket_id: socket.id, ready: false }];
          room.is_start = false;
          room.cnt_ready_players = 0;

          socket.pool_index = pushIntoPool({
            socket_id: socket.id, 
            user_id: authorized_user_id,
            raiting: user_rating,
            game_preset_id: game_preset_id,
            room_id: socket.room_id
          });
        }
        catch(err){
          // TODO
          console.log(err);
          socket.emit("error");
          return;
        }
      }
    });
    socket.on("join_lobby", (room_id) => {
      // TODO: if socket.room_id == null
      if(socket.room_id === null || socket.in_game === true) return;
      const room = io.of("/").adapter.rooms.get(socket.room_id);
      if(!room){
        socket.emit("error");
        return;
      }

      let room_player_data = room.players_data.find(player => player.socket_id === socket.id);
      if (room_player_data === undefined){
        socket.emit("error");
        return;
      }
      room_player_data.ready = true; // room.players_data[socket.id].ready = true
      socket.in_game = true;

      if(room.players_data.find(player => player.ready === false) === undefined && room.is_start === false){
        room.is_start = true;
        
        room.math_expression = lobby.generateMathExpression(room.preset.settings.modes);
        
        io.to(socket.room_id).emit('new_math_expression', room.math_expression.expression);
        io.to(socket.room_id).emit('player_data', room.players_data);
      }
    });

    socket.on('answer', async (answer) => {
      const room = io.of("/").adapter.rooms.get(socket.room_id);
      answer = answer.answer;

      if(!room){
        // console.log('room doesnot exist');
        //socket.emit("error", "answer: room doesnot exist");
        return;
      }
      else if(!room.is_start){
        return;
      }
      else if(typeof answer !== "number" || answer === Infinity || answer === -Infinity){
        //socket.emit("error", "answer: is not number");
        return;
      }
      
      if(answer !== room.math_expression.answer){
        io.to(socket.id).emit('answer_correct', false);
        return;
      }

      let player_stat = room.players_data.find(obj => obj.socket_id === socket.id);
      player_stat.score++;

      io.to(socket.id).emit('answer_correct', true);
      io.to(socket.room_id).emit('player_data', room.players_data);

      if(player_stat.score === room.preset.settings.win_condition.value){
        room.players_data.map(obj => { if(obj.socket_id === socket.id){ obj.is_win = true }else{ obj.is_win = false } });

        if(room.preset.settings.is_rating === true)
          lobby.changeUsersStats(lobby.makeRatingCalculation(room.players_data), room.date_create, room.preset.settings);
        
        lobby.sendFinalGameResults(room.players_data, io);
        
        lobby.clearSockets(room.players_data, io);
        io.socketsLeave(socket.room_id);
      }
      else{ // generates new math expression and sendes to all client of room
        room.math_expression = lobby.generateMathExpression(room.preset.settings.modes);
        io.to(socket.room_id).emit('new_math_expression', room.math_expression.expression);

        //io.to(socket.room_id).emit('player_data', room.players_data);
      }
    });

    socket.on('disconnect', async () => {
      console.log("user disconnect: ", socket.id, (is_authorized) ? " (authorized)" : " (anonym)");
      
      if(socket.pool_index !== null && pool[socket.pool_index] !== undefined)
        if(pool[socket.pool_index].socket_id === socket.id)
          deleteItemPool(socket.pool_index);
      
      if(socket.in_game === true){
        const room = io.of("/").adapter.rooms.get(socket.room_id);

        if(room && room.is_start && room.size === 1){
          room.players_data.map(obj => { if(obj.socket_id === socket.id){ obj.is_win = false; obj.socket_id = null; }else{ obj.is_win = true } });
      
          if(room.preset.settings.is_rating === true)
            lobby.changeUsersStats(lobby.makeRatingCalculation(room.players_data), room.date_create, room.preset.settings); // TODO: change score 
          
          lobby.sendFinalGameResults(room.players_data, io);

          io.socketsLeave(socket.room_id);
        }
        else if(room && room.is_start && room.size > 1){
          room.players_data.map(obj => { if(obj.socket_id === socket.id){ obj.socket_id = null; }});
          // TODO
        }
      }
    });
 });
  return io;
}