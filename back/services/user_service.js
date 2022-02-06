const user_model = require('../models/user_model.js');
const ErrorHandler = require('../modules/error_handler/error_handler.js');


class UserService
{
  async register(username, email, password){
    const [doc_by_email, doc_by_username] = await Promise.all([user_model.exists({email: email}), user_model.exists({username: username})])
    .catch(err => {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error.");
    });
    
    if(doc_by_email) throw new ErrorHandler(409, "This email already exists");
    else if(doc_by_username) throw new ErrorHandler(409, "This username already exists");

    return await user_model.create({ username: username, email: email, authkeys: {password: password}, date_reg: new Date, stats:{rating: 1000} })
    .catch(err => {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error.");
    });
  }

  async loginByUsername(username, password){
    const user = await user_model.findOne({username: username})
    .catch(err => {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error."); 
    });

    if(!user) 
      throw new ErrorHandler(403, "Incorrect username or password");
    
    if(user.compareUserPassword(password)){
      console.log("logU: ", user);
      return user;
    }
    throw new ErrorHandler(403, "Incorrect username or password");
  } 

  async getUserByUsername(username){
    const user = await user_model.findOne({username: username}, '-_id -authkeys -__v')
    .catch(err => {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error.");
    });

    if(!user)
      throw new ErrorHandler(500, "User not found.");
    
    return user;
  }

  async getUserById(user_id){
    return await user_model.findById(user_id, '-_id -authkeys -__v')
    .catch(err => {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error.");
    });
  }
  
  async getFullUserInfoById(user_id){
    return await user_model.findById(user_id)
    .catch(err => {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error.");
    });
  }

  async changeUserStats(user_id, finished_lobby){
    try{
      let user = await user_model.findById(user_id);
      if(user){
        user.stats.rating += finished_lobby.result.rating_changed; 
        user.stats.finished_lobbies.push(finished_lobby);       
        return await user.save();
      }
      console.log("changeUserStats: user not found");
    }
    catch(err){
      console.log(err);
      throw ErrorHandler(500, "Internal server error");
    }
  }
  /*
  changeLastOnline(username, done){
    user_model.findOne({username: username}, (err, user) => {
      if(err){
        console.log(err);
        return done(new ErrorHandler(500, "Find user error"));
      }
      if(user){
        user.last_online = new Date;
        user.save(err => {
          if(err) console.log(err);
          else done(null, user);
        });
      }
    });
  }*/
}

module.exports = new UserService();