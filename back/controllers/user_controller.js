const {validationResult} = require('express-validator');
const sanitize = require('mongo-sanitize');

const user_service = require('../services/user_service.js');

class UserController
{
  register(req, res){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      console.log(errors.array());
      res.status(400).send(errors.array());
    }
    else{
      const [username, email, password] = [sanitize(req.body.username), sanitize(req.body.email), sanitize(req.body.password)];
      user_service.register(username, email, password, (err, new_user) => {
        //console.log("In done function");
        if(err){
          err.sendError(res);
        }
        else{
          console.log("New user in database:\n", new_user);
          res.redirect(200, "/login");
        }
      });
    }
  }
  login(req, res){
    console.log(req.body);
    const [username, email, password] = [sanitize(req.body.username), sanitize(req.body.email), sanitize(req.body.password)];
    const condition = username ? {username: username} : {email: email};
    
    user_service.login(condition, password, (err, user) => {
      console.log("in done() login");
      if(err){
        err.sendError(res);
      }
      else{
        console.log("Successful login");
        req.session.user_id = user._id;
        req.session.username = user.username;
        res.send("login success!");
        //res.send("test");
      }
    });
  }
  logout(req, res){
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.send('Logout successful');
      }
    });
  }
  getUserByUsername(req, res){
    const username = sanitize(req.params.username);
    user_service.getUserByUsername(username, (err, user_data) => {
      if(err){
        err.sendError(res);
      }
      else{
        console.log(user_data);
        res.send(user_data);
      }
    });
  }
}

module.exports = new UserController();