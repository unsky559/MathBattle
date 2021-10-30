const sanitize = require('mongo-sanitize');
const database = require('./database.js');

const conn = database.getDatabaseConnection();
const user_model = database.getUserModel();

const MIN_NICKNAME_LEN = 5;
const MIN_PASS_LEN = 5;

module.exports = {
  /**
  * Registers a new user.
  * @param {string} nickname - nickname of registrant
  * @param {string} email - email of registrant
  * @param {string} password - password of registrant
  * @param {callback} callback
  */
  register: function(nickname, email, password, callback) {
    const [clr_nick, clr_email, clr_password] = [sanitize(nickname), sanitize(email), sanitize(password)];
    console.log(`Register data: {clr_nick: ${clr_nick}, clr_email: ${clr_email}, clr_password: ${clr_password}}`);

    if(clr_nick.lenght < MIN_NICKNAME_LEN || clr_password < MIN_PASS_LEN){
      console.log("short nickname or password!");
      callback(new Error("Short nickname or password!"));
    }

    user_model.exists({$or:[{username: clr_nick}, {email: clr_email}]}, function (exists_err, doc) {
      if (exists_err){
        console.log(exists_err);
        callback(exists_err);
      }
      else{
        if (!doc){
          user_model.create({ username: clr_nick, email: clr_email, authkeys: {password: clr_password}, date: new Date }, function (create_err, small){
            if (create_err){
              console.log(create_err);
              callback(create_err);
            }
              console.log("Successful saving account!");
              callback();
            });
        }
        else{
          console.log("nickname exists");
          callback(new Error("Nickname/email exists!"));
        }
      }
    });
  }
}
