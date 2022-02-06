const {validationResult} = require('express-validator');
const sanitize = require('mongo-sanitize');

const user_service = require('../services/user_service.js');

class UserController
{
  async register(req, res){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      delete errors.array()[0].value;
      res.status(400).send(errors.array());
      return;
    }

    try{
      const [username, email, password] = [sanitize(req.body.username), sanitize(req.body.email), sanitize(req.body.password)];
      const new_user = await user_service.register(username, email, password);
      console.log("NEW USER:\n", new_user);
      res.status(200).send({msg: "Account successfully created"});
    } 
    catch(err){
      err.sendError(res);
    }
  }

  async login(req, res){
    const [username, password] = [sanitize(req.body.username), sanitize(req.body.password)];
    try{
      const user = await user_service.loginByUsername(username, password);
      req.session.user_id = user._id;
      //req.session.user_rating = user.stats.rating;
      //console.log("req.session.user_id: ", req.session.user_id)
      //console.log("req.session.user_rating: ", req.session.user_rating)

      res.status(200).send({msg: "Login success"});
      console.log("Successful login");
    }
    catch(err){
      err.sendError(res);
    }
  }

  logout(req, res){
    req.session.destroy(err => {
      if(err)
        res.status(400).send({msg: "Unable to logout"});
      else
        res.clearCookie('sid', { httpOnly: true }).sendStatus(200);
    });
  }
  
  async getUserByUsername(req, res){
    const username = sanitize(req.params.username);
    try{
      res.status(200).send(await user_service.getUserByUsername(username));
    }
    catch(err){
      err.sendError(res);
    }
  }

  async getCurrentUser(req, res){
    try{
      res.status(200).send(await user_service.getUserById(req.session.user_id));
    }
    catch(err){
      err.sendError(res);
    }
  }
}

module.exports = new UserController();