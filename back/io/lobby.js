const game_service = require('../services/game_service.js');
const user_service = require('../services/user_service.js');

module.exports = {
  findOpponentForAnonyms(pool, finder){
    // finder = {game_preset_id, socket_id}
    for(let candidate of pool){
      if(candidate === undefined) continue;
      if(candidate.user_id === null && candidate.game_preset_id === finder.game_preset_id && candidate.socket_id !== finder.socket_id){
        return candidate;
      }
    }
    return null;
  },

  findOpponentForAuthorized(pool, finder, raiting_range){
    // finder = {game_preset_id, socket_id, uid, raiting}
    for(let candidate of pool){
      if(candidate === undefined) continue;
      if(candidate.user_id !== null && candidate.game_preset_id === finder.game_preset_id && candidate.user_id !== finder.uid && candidate.socket_id !== finder.socket_id){
        if(candidate.raiting <= finder.rating + raiting_range && candidate.raiting >= finder.rating - raiting_range){
          return candidate;
        }
      }
    }
    return null;
  },

  generateMathExpression(modes){
    const cnt_modes = modes.length;
    const mode = modes[game_service.getRandomInt(0, cnt_modes - 1)];
    return game_service.translationModeToMathExpression(mode);
  },

  makeRatingCalculation(players_data){
    /*
      input: [{userdata, score, is_win}]
      output: [{userdata, rating_change, is_win}]
    */
    console.log("makeRatingCalculation: ", players_data);
    let total_score = 0;
    
    for(let data of players_data){
      total_score += data.score;
    }
    let average = Math.floor(total_score / players_data.length);
    let players_rating = [];
    for(let player of players_data){
      if(player.userdata === null) continue;

      let rating_change = player.score - average;
      players_rating.push({userdata: player.userdata, rating_change: rating_change, is_win: player.is_win});
    }
    return players_rating;
  },

  changeUsersStats(players_rating, date_create, preset_settings){
    /*
      input: [{userdata, rating_change, is_win}]
    */
    let date_end = new Date; 
    for(let player of players_rating){
      if(player.userdata === null) continue;

      const finished_lobby = {
        date_create: date_create,
        date_end: date_end,
        setting: preset_settings,
        result: {
          is_win: player.is_win,
          rating_changed: player.rating_change
        }
      };
      user_service.changeUserStats(player.userdata._id, finished_lobby);
    }
  },

  sendFinalGameResults(players, io){
    /*
      input: [{socket_id, is_win}]
    */
    for(let player of players){
      if(player.socket_id === null) continue;
      io.to(player.socket_id).emit('game_finished', player.is_win);
    }
  },

  clearSockets(players, io){
    for(let player of players){
      if(player.socket_id === null) continue;

      let sock = io.sockets.sockets.get(player.socket_id);
      if(sock.pool_index !== null && pool[sock.pool_index] !== undefined)
        if(pool[sock.pool_index].socket_id === sock.id)
          deleteItemPool(sock.pool_index);
      
      sock.pool_index = null;
      sock.in_game = false;
      sock.room_id = null;
    }
  },

  breakLobby(room, io){
    if(room && room.is_start === false){
      //console.log("break");
      module.exports.clearSockets(room.players_data, io);
      io.to(room.room_id).emit('lobby_canceled');
      io.socketsLeave(room.room_id);
    }
  }
}