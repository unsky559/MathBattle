const user_service = require('../services/game_service.js');

class GameController
{
  async getGamePresets(req, res){
    try{
      res.status(200).send(await user_service.getGamePresets());
    }
    catch(err){
      err.sendError(res);
    }
  }
}

module.exports = new GameController();