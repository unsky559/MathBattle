const user_model = require('../models/user_model.js');
const ErrorHandler = require('../modules/error_handler/error_handler.js');


class UserService
{
  register(username, email, password, done){
    user_model.exists({email: email}, (err, doc) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Register error"));
      }
      else if(doc)
        return done(new ErrorHandler(409, "This email already exists"));
      else{
        user_model.exists({username: username}, (err1, doc1) => {
          if(err1){
            console.log(err1);
            return done(new ErrorHandler(500, "Register error"));
          }
          else if(doc1)
            return done(new ErrorHandler(409, "This username already exists"));
          else{
            user_model.create({ username: username, email: email, authkeys: {password: password}, date_reg: new Date, stats:{rating: 1000} }, (error, new_user) => {
              if(error) {
                console.log(error);
                return done(new ErrorHandler(500, "Server didn't create account"));
              }
              else{
                done(null, new_user);
              }
            });
          }
        });
      }
    });
  }

  login(condition, password, done){
    user_model.findOne(condition, (err, user) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Login error"));
      }
      else if(!user){
        console.log("User not found!");
        return done(new ErrorHandler(403, "Incorrect username or password"));
      }
      else{
        user.compareUserPassword(password, function (match_error, is_match) {
          if (match_error) {
            console.log(match_error);
            return done(new ErrorHandler(500, "Match error"));
          } 
          else if(!is_match) {
            console.log("Incorrect password!");
            return done(new ErrorHandler(403, "Incorrect username or password"));
          } 
          else{
            done(null, user);
          }
        });
      }
    });
  }
  getUserByUsername(username, done){
    user_model.findOne({username: username}, '-_id -authkeys -__v', (err, user) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Find user error!"));
      }
      else if(!user){
        console.log("Error: User not found!");
        return done(new ErrorHandler(403, "User not found"));
      }
      else{
        done(null, user);
      }
    });
  }
  getCurrentUser(user_id, done){
    user_model.findById(user_id, '-_id -authkeys -__v', (err, user) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Find user error"));
      }
      return done(null, user);
    });
  }
}

module.exports = new UserService();