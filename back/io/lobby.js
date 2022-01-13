const lobby_model = require('../models/lobby_model.js');
const game_preset_model = require('../models/game_preset_model.js');
//const ErrorHandler = require('../modules/error_handler/error_handler.js');

module.exports.createFutureLobbyByPreset = async function(players_data, room_id)
{
  console.log('</createFutureLobbyByPreset>:');
  console.log(players_data[0].socket_id);
  console.log(players_data[1].socket_id);
  console.log(room_id);
  console.log('<createFutureLobbyByPreset\\>');
 
  try {
    const game_preset_doc = await game_preset_model.findById(players_data[0].game_preset_id);
    if(game_preset_doc){
      const lobby_doc = await lobby_model.create({
        room_id: room_id,
        create_date: new Date,
        settings: game_preset_doc.settings
      });

      for (let player of players_data) {
        let push_data = {socket_id: player.socket_id};
        if(player.user_id !== null)
          push_data['user_id'] = player.user_id;
        lobby_doc.players.push(push_data);
        await lobby_doc.save();
      }
      return 0;
    }
    else{
      return 1;
      //throw new ErrorHandler(404, 'no preset found');
    }
  }
  catch (error) {
    console.log(`createFutureLobbyByPreset error: ${error}`);
    return 1;
    //throw ErrorHandler(500, 'Server error');
  }
}