const user_model = require('../models/user_model.js');
const {InternalErrorHandler, FailHandler} = require('../modules/error_handler/error_handler.js');
const {StatusCodes} = require('http-status-codes');

class UserService
{
  async register(username, email, password){
    const [doc_by_email, doc_by_username] = await Promise.all([user_model.exists({email: email}), user_model.exists({username: username})])
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });
    
    if(doc_by_email) throw new FailHandler(StatusCodes.CONFLICT, {param: 'email', message: 'This email already exists.'});
    else if(doc_by_username) throw new FailHandler(StatusCodes.CONFLICT, {param: 'username', message: 'This username already exists.'});

    return await user_model.create({ username: username, email: email, authkeys: {password: password}, date_reg: new Date, stats:{rating: 1000} })
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });
  }

  async loginByUsername(username, password){
    const user = await user_model.findOne({username: username})
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });

    if(!user)
      throw new FailHandler(StatusCodes.FORBIDDEN, [{param: 'username', message: 'Incorrect username'}, {param: 'password', message: 'Incorrect password'}]);
    
    if(user.compareUserPassword(password))
      return user;
    
    throw new FailHandler(StatusCodes.FORBIDDEN, [{param: 'username', message: 'Incorrect username'}, {param: 'password', message: 'Incorrect password'}]);
  }

  async getUserByUsername(username){
    const user = await user_model.findOne({username: username}, '-_id -authkeys -__v')
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });

    if(!user)
      throw new FailHandler(StatusCodes.NOT_FOUND, null);
    
    return user;
  }

  async getUserById(user_id){
    const user = await user_model.findById(user_id, '-_id -authkeys -__v')
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });

    if(!user)
      throw new FailHandler(StatusCodes.NOT_FOUND, null);
  
    return user;
  }
  
  async getFullUserInfoById(user_id){
    const user = await user_model.findById(user_id)
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });

    if(!user)
      throw new FailHandler(StatusCodes.NOT_FOUND, null);

    return user;
  }

  async changeUserStats(user_id, finished_lobby){
    let user = await this.getFullUserInfoById(user_id);
    
    user.stats.rating += finished_lobby.result.rating_changed; 
    user.stats.finished_lobbies.push(finished_lobby);       
    
    return await user.save()
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });
  }

  async changePassword(user_id, current_password, new_password){
    let user = await this.getFullUserInfoById(user_id)
    .catch(err => {
      console.log(err);
      throw new InternalErrorHandler();
    });

    if(user.compareUserPassword(current_password)){
      if(current_password === new_password){
        throw new FailHandler(StatusCodes.CONFLICT, {param: 'new_password', message: 'New password must be different from previous password.'});
      }

      user.authkeys.password = new_password;

      return await user.save()
      .catch(err => {
        console.log(err);
        throw new InternalErrorHandler();
      });
    }
    throw new FailHandler(StatusCodes.CONFLICT, {param: 'current_password', message: 'Incorrect current password.'});
  }
}

module.exports = new UserService();