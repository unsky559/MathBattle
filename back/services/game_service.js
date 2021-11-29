const game_preset_model = require('../models/game_preset_model.js');
const ErrorHandler = require('../modules/error_handler/error_handler.js');

class GameService
{
  getGamePresets(done){
    game_preset_model.find({}, (err, presets) => {
      if(err){
        return done(new ErrorHandler(500, 'Cannot find presets'));
      }
      return done(null, presets);
    });
  }
}


module.exports = new GameService();