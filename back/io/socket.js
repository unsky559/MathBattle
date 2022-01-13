const { v4: uuidv4 } = require('uuid');
const lobby = require('./lobby.js');
const game_service = require('../services/game_service.js');
const user_service = require('../services/user_service.js');
/*
  pool format:
  pool[x] = { socket_id: String, user_id: String/null, raiting: Number/null, is_wait: Boolean }
*/

/*
  mytest@test.test
  mytest
  123456789

  -----

  tester@test.test
  tester
  123456789

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
    socket.pool_index = null;
    socket.game_status = {room_id: null, in_game: false};

    const socket_id = socket.id;
    const authorized_user_id = (socket.request.session.user_id) ? socket.request.session.user_id : null;
    console.log("A new user: ", socket.id, (authorized_user_id) ? " (authorized)" : " (anonym)");

    socket.on('find_game', (data) => {
      console.log('find_game');
      let game_preset_id = data.game_preset_id;
      let opponent = null;

      if(socket.pool_index !== null || socket.game_status.in_game !== false) return;
      console.log('find_game: after condition');

      //console.log(pool);
      //console.log(empty_spaces);
      
      // for authorized 
      if(authorized_user_id){
        //const user_id = socket.request.session.user_id;
        const user_rating = socket.request.session.user_rating;
        for(let i = 0; i < pool.length; i++){
          const candidate = pool[i];
          if(candidate === undefined) continue;
          if(candidate.user_id !== null && candidate.user_id !== authorized_user_id && candidate.socket_id !== socket_id && candidate.game_preset_id === game_preset_id /*&& candidate.is_wait === true*/){
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
          if(candidate.user_id === null && candidate.socket_id !== socket_id && candidate.game_preset_id === game_preset_id /*&& candidate.is_wait === true*/){
            opponent = candidate;
            break;
          }
        }
      }
      if(opponent !== null){
        
        socket.join(opponent.room_id);
        
        const room = io.of("/").adapter.rooms.get(opponent.room_id);
        const opp_socket = io.sockets.sockets.get(opponent.socket_id);
        const opp_user_id = opponent.user_id;
        
        opp_socket.game_status.room_id = opponent.room_id;
        opp_socket.game_status.in_game = true;
        socket.game_status.room_id = opp_socket.game_status.room_id;
        socket.game_status.in_game = true;
        
        deleteItemPool(opp_socket.pool_index);
        opp_socket.pool_index = null;

        game_service.getGamePresetById(game_preset_id, (err1, preset) => {
          if(err1){
            console.log(err1); 
            io.to(socket.game_status.room_id).emit('error', "did not create lobby");
            //io.in(opponent.room_id).socketsLeave(opponent.room_id);
            return;
          }
          else if(authorized_user_id){
            user_service.getUserById(authorized_user_id, (err2, cur_user) => {
              user_service.getUserById(opp_user_id, (err3, opp_user) => {
                  if(err2 || err3){
                    io.to(socket.game_status.room_id).emit('error', "did not create lobby");
                    //io.in(opponent.room_id).socketsLeave(opponent.room_id);
                    return;
                  }
                  createLobby(room, socket.game_status.room_id, cur_user, opp_user, socket_id, opp_socket.id, preset);
              });
            });
          }
          else{ // anon
            game_service.getGamePresetById(game_preset_id, (err, preset) => {
              if(err){
                console.log(err); 
                io.to(socket.game_status.room_id).emit('error', "join_lobby: did not create lobby");
                //io.in(opponent.room_id).socketsLeave(opponent.room_id); 
                return;
              }

              createLobby(room, socket.game_status.room_id, null, null, socket_id, opp_socket.id, preset);
            });
          }
        });
      }
      else{
        const _room_id = uuidv4();
        socket.join(_room_id);
        
        socket.pool_index = pushIntoPool({
          socket_id: socket_id, 
          user_id: (authorized_user_id) ? authorized_user_id : null,
          raiting: (authorized_user_id) ? socket.request.session.user_rating : null,
          game_preset_id: game_preset_id,
          room_id: _room_id
        });
      }
    });
    
    socket.on("join_lobby", (room_id) => {
      const room = io.of("/").adapter.rooms.get(room_id);
      if(!room){
        socket.emit("error", "room doesnot exist");
        return;
      }
      if(++room.players_ready === 2){
        const cnt_modes = room.lobby_rules.settings.modes.length;
        const mode = room.lobby_rules.settings.modes[game_service.getRandomInt(0, cnt_modes - 1)];
        room.math_expression = game_service.translationModeToMathExpression(mode);
        io.to(room_id).emit('new_math_expression', room.math_expression.expression);
        io.to(room_id).emit('player_data', room.players_data);
      }


      //io.to(room_id).emit('new_math_expression', room.math_expression.expression, room.players_data);
      //return;
    });

    socket.on('answer', (answer) => {
      const room = io.of("/").adapter.rooms.get(socket.game_status.room_id);

      if(!room){
        // console.log('room doesnot exist');
        socket.emit("error", "answer: room doesnot exist");
        return;
      }
      else if(socket.game_status.room_id === null){
        socket.emit("error", "answer: request rejected");
        return;
      } 
      else if(typeof answer.answer !== "number" || answer.answer === Infinity || answer.answer === -Infinity){
        socket.emit("error", "answer: is not number");
        return;
      }

      answer = answer.answer;
    
      if(answer === room.math_expression.answer){
        io.to(socket_id).emit('answer_correct', true);
        let player_stat = room.players_data.find(obj => obj.socket_id === socket_id);
        if(++player_stat.score === room.lobby_rules.settings.win_condition.value){
          io.to(socket.game_status.room_id).emit('player_data', room.players_data);

          //io.to(socket_id).emit('answer_correct', true); // ???????????????
          
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
          io.socketsLeave(socket.game_status.room_id);
        }
        else{ // generates new math expression and sendes to all client of room
          console.log(room.players_data);

          const cnt_modes = room.lobby_rules.settings.modes.length;
          const mode = room.lobby_rules.settings.modes[game_service.getRandomInt(0, cnt_modes - 1)];
          room.math_expression = game_service.translationModeToMathExpression(mode);
          console.log(`mode: ${mode}, expr: ${room.math_expression.expression}, aswer: ${room.math_expression.answer}`);
          io.to(socket.game_status.room_id).emit('new_math_expression', room.math_expression.expression);
          io.to(socket.game_status.room_id).emit('player_data', room.players_data);
        }
      }
      else{
        io.to(socket_id).emit('answer_correct', false);
      }
    });

    socket.on('disconnect', () => {
      console.log("USER LEFT: ", socket_id, (socket.request.session.user_id) ? " (authorized)" : " (anonym)");
      if(socket.pool_index !== null && pool[socket.pool_index] !== undefined){
        if(pool[socket.pool_index].socket_id == socket_id){
          deleteItemPool(socket.pool_index);
          console.log(pool);
          console.log(empty_spaces);
        }
      }
      /// socket.game_status = {room_id: null, in_game: false};
      else if(socket.game_status.in_game === true){
        const room = io.of("/").adapter.rooms.get(socket.game_status.room_id);
        if(authorized_user_id && room){          
          const rating_change = Math.ceil(Math.abs(room.players_data[0].score - room.players_data[1].score) / 2);          
          const now_date = new Date;
          const player_stat = room.players_data.find(obj => obj.socket_id === socket_id);

          user_service.changeUserStats(player_stat.userdata.username, 
            {
              date_create: room.date_create,
              date_end: now_date,
              setting: room.lobby_rules.settings,
              result: {
                is_win: false,
                rating_changed: -rating_change
              }
            }, () => {
              //socket.close();
              //io.to(socket_id).emit('game_finished', false);
          });

          const win_player = room.players_data.filter(obj => obj.socket_id !== socket_id);
          user_service.changeUserStats(win_player[0].userdata.username, 
            {
              date_create: room.date_create,
              date_end: now_date,
              setting: room.lobby_rules.settings,
              result: {
                is_win: true,
                rating_changed: rating_change
              }
          }, () => {
            io.to(win_player[0].socket_id).emit('game_finished', true);
            //io.sockets.sockets.get(win_player[0].socket_id).close();
          });

          if(room){
            io.to(socket.game_status.room_id).socketsLeave(socket.game_status.room_id);
          }
        }
        else{
          io.to(socket.game_status.room_id).emit('game_finished', true);
          
          if(room){
            io.to(socket.game_status.room_id).socketsLeave(socket.game_status.room_id);
          }
          //io.to(socket.game_status.room_id).socketsLeave(socket.game_status.room_id);
        }
      }


    });

    function createLobby(room, room_id, player1_data, player2_data, player1_socket_id, player2_socket_id, preset){
      room.players_data = [
        { userdata: player1_data, score: 0, socket_id: player1_socket_id },
        { userdata: player2_data, score: 0, socket_id: player2_socket_id }
      ];
      room.lobby_rules = preset; 
      room.date_create = new Date;
      room.players_ready = 0;

      /*
      const cnt_modes = room.lobby_rules.settings.modes.length;
      const mode = room.lobby_rules.settings.modes[game_service.getRandomInt(0, cnt_modes - 1)];
      room.math_expression = game_service.translationModeToMathExpression(mode);
*/
/*
      console.log(`LOBBY DATA (auth):\n \
              date: ${room.date_create}; \n \
              rules: ${room.lobby_rules};\n \
              players_data: ${room.players_data};\n \
              expression: ${room.math_expression.expression};\n \
              aswer: ${room.math_expression.answer};`
      );
*/      
      console.log('The lobby is set up. Starting game.');
      
      io.to(room_id).emit('game_found', room_id, preset, room.players_data);
      //io.to(room_id).emit('new_math_expression', room.math_expression.expression, room.players_data);
    }

 });
  return io;
}
