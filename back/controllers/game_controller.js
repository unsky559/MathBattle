const game_service = require('../services/game_service.js');
const {StatusCodes} = require('http-status-codes');
const {sendError} = require('../modules/error_handler/error_handler.js');


class GameController
{
  async getGamePresets(req, res){
    try{
      res.status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: await game_service.getGamePresets()});
    }
    catch(err){
      sendError(res, err);
    }
  }
}

module.exports = new GameController();