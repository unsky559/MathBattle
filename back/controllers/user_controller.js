const {sendError, convertValidationResult} = require('../modules/error_handler/error_handler.js');
const {StatusCodes} = require('http-status-codes');
const {validationResult} = require('express-validator');
const sanitize = require('mongo-sanitize');
const user_service = require('../services/user_service.js');

class UserController
{
  async register(req, res){
    try{
      const validation_result = validationResult(req);
      if(!validation_result.isEmpty()){
        res.status(StatusCodes.BAD_REQUEST).send(convertValidationResult(validation_result));
        return;
      }

      const [username, email, password] = [sanitize(req.body.username), sanitize(req.body.email), sanitize(req.body.password)];
      const new_user = await user_service.register(username, email, password);
      console.log("NEW USER:\n", new_user);
      res.status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: null});
    } 
    catch(err){
      sendError(res, err);
    }
  }

  async login(req, res){
    try{
      const validation_result = validationResult(req);
      if(!validation_result.isEmpty()){
        res.status(StatusCodes.BAD_REQUEST).send(convertValidationResult(validation_result));
        return;
      }
  
      const [username, password] = [sanitize(req.body.username), sanitize(req.body.password)];
      
      const user = await user_service.loginByUsername(username, password);
      req.session.user_id = user._id;

      res.status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: null});
      console.log("Successful login");
    }
    catch(err){
      sendError(res, err);
    }
  }

  logout(req, res){
    req.session.destroy((err) => {
      if(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status: "error", code: StatusCodes.INTERNAL_SERVER_ERROR, message: "Unable to logout"});
      else
        res.clearCookie('sid', { httpOnly: true }).status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: null});
    });
  }

  async getUserByUsername(req, res){
    try{
      const username = sanitize(req.params.username);
      res.status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: await user_service.getUserByUsername(username)});
    }
    catch(err){
      sendError(res, err);
    }
  }

  async getCurrentUser(req, res){
    try{
      res.status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: await user_service.getUserById(req.session.user_id)});
    }
    catch(err){
      sendError(res, err);
    }
  }

  async changePassword(req, res){
    try{
      const validation_result = validationResult(req);
      if(!validation_result.isEmpty()){
        res.status(StatusCodes.BAD_REQUEST).send(convertValidationResult(validation_result));
        return;
      }
  
      const [current_password, new_password] = [sanitize(req.body.current_password), sanitize(req.body.new_password)];
      
      if(await user_service.changePassword(req.session.user_id, current_password, new_password)){
        res.status(StatusCodes.OK).send({status: "success", code: StatusCodes.OK, data: null});
      }
    }
    catch(err){
      sendError(res, err);
    }
  }
}

module.exports = new UserController();