const user_service = require('../services/game_service.js');

class GameController
{
  getGamePresets(req, res){
    user_service.getGamePresets((err, presets) => {
      if(err){
          err.sendError(res);
      }
      else{
        res.send(presets);
      }
    });
  }
}

module.exports = new GameController();