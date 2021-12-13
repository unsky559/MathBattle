const { v4: uuidv4 } = require('uuid');
const lobby = require('./lobby.js');
const game_service = require('../services/game_service.js');
const user_service = require('../services/user_service.js');
/*
  pool format:
  pool[x] = { socket_id: String, user_id: String/null, raiting: Number/null, is_wait: Boolean }
*/

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

  io.on('connection', (socket) => {
    let game_status = {room_id: null, in_game: false, lobby_users_data: null}; // [room_id: null, in_game: true/false]
    let pool_index = null;
    const socket_id = socket.id;
    const authorized_user_id = (socket.request.session.user_id) ? socket.request.session.user_id : null;
    console.log("A new user: ", socket.id, (authorized_user_id) ? " (authorized)" : " (anonym)");


    socket.on('find_game', (data) => {
      // data = {"game_preset_id": "61b4b4e819d7bbace8124a93"}
      
      console.log('find_game');


      game_preset_id = data.game_preset_id;

      if(pool_index !== null || game_status.in_game === true) return;

      console.log('find_game ->');

      pool_index = pushIntoPool({
        socket_id: socket_id, 
        user_id: (authorized_user_id) ? authorized_user_id : null,
        raiting: (authorized_user_id) ? socket.request.session.user_rating : null,
        game_preset_id: game_preset_id,
        is_wait: false
      });
      
      console.log(pool);
      console.log(empty_spaces);
      
      let opponent = null;

      // for authorized 
      if(authorized_user_id){
        //const user_id = socket.request.session.user_id;
        const user_rating = socket.request.session.user_rating;
        for(let i = 0; i < pool.length; i++){
          const candidate = pool[i];
          if(candidate === undefined) continue;
          if(candidate.user_id !== null && candidate.user_id !== authorized_user_id && candidate.socket_id !== socket_id && candidate.game_preset_id === game_preset_id && candidate.is_wait === true){
            if(candidate.raiting <= user_rating + RAITING_RANGE && candidate.raiting >= user_rating - RAITING_RANGE){
              opponent = candidate;
              break;
            }
          }
        }
      }
      else{ // for anonyms
        for(let i = 0; i < pool.length; i++){
          const candidate = pool[i];
          if(candidate === undefined) continue;
          if(candidate.user_id === null && candidate.socket_id !== socket_id && candidate.game_preset_id === game_preset_id && candidate.is_wait === true){
            opponent = candidate;
            break;
          }
        }
      }
      if(opponent !== null){
        const room_id = uuidv4(); 
        
        // CREATE FUTURE LOBBY IN DATABASE

        if(authorized_user_id){
          //const err_flbp = await lobby.createFutureLobbyByPreset([pool[pool_index], opponent], room_id);
          //if(err_flbp !== 0){
          //  return socket.emit("error_create_lobby");
          //}

          user_service.getUserById(authorized_user_id, (err, cur_user) => {
            user_service.getUserById(opponent.user_id, (err1, opp_user) => {
              game_status.lobby_users_data = 
              [
                { userdata: cur_user, score: 0, socket_id: socket_id },
                { userdata: opp_user, score: 0, socket_id: opponent.socket_id }
              ];

              console.log('send auth game_found');
              socket.emit("game_found", room_id);
              io.to(opponent.socket_id).emit("game_found", room_id);
            });
          });


        }
        else{ // anon
          game_status.lobby_users_data = 
          [
            { userdata: null, score: 0, socket_id: socket_id },
            { userdata: null, score: 0, socket_id: opponent.socket_id }
          ];
          console.log('send anon game_found');
          socket.emit("game_found", room_id);
          io.to(opponent.socket_id).emit("game_found", room_id);
        }
      }
      else{
        pool[pool_index].is_wait = true;
      }
    });

    socket.on("join_lobby", (room_id) => {
      console.log('in join_lobby');
      
      if(pool_index !== null && game_status.in_game === false){
        game_status.room_id = room_id;
        game_status.in_game = true;
        const user_data = deleteItemPool(pool_index);
        pool_index = null;
        
        console.log((authorized_user_id) ? `An authorized user joined to the lobby, user id: ${authorized_user_id}, socket id: ${socket_id}` : `An anonym user joined to the lobby, socket id: ${socket_id}`);
        socket.join(room_id);    
        
        const room = io.of("/").adapter.rooms.get(room_id);
        
        if(game_status.lobby_users_data){
          room.players_data = game_status.lobby_users_data;
          game_status.lobby_users_data = null;
        }

        // !!!          2 
        if(room.size >= 2){
          game_service.getGamePresetById(user_data.game_preset_id, (err, preset) => {
            if(!err){
              room.lobby_rules = preset; 
              console.log("room.lobby_rules:", room.lobby_rules);

              console.log('2 READY. START!');

              const cnt_modes = room.lobby_rules.settings.modes.length;
              const mode = room.lobby_rules.settings.modes[game_service.getRandomInt(0, cnt_modes - 1)];
              //const math_expression = game_service.translationModeToMathExpression(mode);

              room.math_expression = game_service.translationModeToMathExpression(mode); //math_expression;
              room.date_create = new Date;
              console.log(`mode: ${mode}, expr: ${room.math_expression.expression}, aswer: ${room.math_expression.answer}`);

              console.log('room.players_data: ', room.players_data);
              //if
              //user_service/

              io.to(room_id).emit('new_math_expression', room.math_expression.expression, room.players_data);
            }
            else console.log(err);
          });
        }
      }
      else{
        console.log('error_start_lobby: pool_index ', socket_id);
        //socket.emit("error_start_lobby");
      }
    });

    socket.on('answer', (answer) => {

      try {
        answer = JSON.parse(answer).answer;
      } catch(e) {
        return console.log(e);
      }

      const room = io.of("/").adapter.rooms.get(game_status.room_id);
      //room.players_points[socket_id];
      
      if(game_status.in_game === true){
        if(answer === room.math_expression.answer){
          io.to(socket_id).emit('answer_correct', true);
          let player_stat = room.players_data.find(obj => obj.socket_id === socket_id);
          if(++player_stat.score === room.lobby_rules.settings.win_condition.value){
            
            // for auth
            const rating_change = Math.ceil(Math.abs(room.players_data[0].score - room.players_data[1].score) / 2);
            if(player_stat.userdata !== null){
              const finished_lobby = {
                date_create: room.date_create,
                date_end: new Date,
                setting: room.lobby_rules.settings,
                result: {
                  is_win: true,
                  rating_changed: rating_change
                }
              };
              user_service.changeUserStats(player_stat.userdata.username, finished_lobby, () => {
                io.to(player_stat.socket_id).emit('game_finished', true);
              });
            }
            else{ // for anon 
              io.to(player_stat.socket_id).emit('game_finished', true); 
            }

            const losing_players = room.players_data.filter(obj => obj.socket_id !== socket_id);
            for(let los_player of losing_players){
              console.log('losed: ', los_player);
              
              // for auth
              if(los_player.userdata !== null){
                const finished_lobby = {
                  date_create: room.date_create,
                  date_end: new Date,
                  setting: room.lobby_rules.settings,
                  result: {
                    is_win: false,
                    rating_changed: -rating_change
                  }
                };
                user_service.changeUserStats(los_player.userdata.username, finished_lobby, () => {
                  io.to(los_player.socket_id).emit('game_finished', false);
                });
              }
              else{
                io.to(los_player.socket_id).emit('game_finished', false); 
              }
            }
            io.socketsLeave(game_status.room_id);
          }
          else{ // generates new math expression and sendes to all client of room

            console.log(room.players_data);

            const cnt_modes = room.lobby_rules.settings.modes.length;
            const mode = room.lobby_rules.settings.modes[game_service.getRandomInt(0, cnt_modes - 1)];
            room.math_expression = game_service.translationModeToMathExpression(mode);
            console.log(`mode: ${mode}, expr: ${room.math_expression.expression}, aswer: ${room.math_expression.answer}`);
            io.to(game_status.room_id).emit('new_math_expression', room.math_expression.expression, room.players_data);
          }
        }
        else{
          io.to(socket_id).emit('answer_correct', false);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log("USER LEFT: ", socket.id, (socket.request.session.user_id) ? " (authorized)" : " (anonym)");
      if(pool_index !== null && pool[pool_index] !== undefined){
        if(pool[pool_index].socket_id == socket_id){
          deleteItemPool(pool_index);
          console.log(pool);
          console.log(empty_spaces);
        }
      }
    });
 });

  return io;
}
