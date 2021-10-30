const sanitize = require('mongo-sanitize');
const database = require('./database.js');

const conn = database.getDatabaseConnection();
const user_model = database.getUserModel();

module.exports = {
  login: function(login_word, password, callback) {
    const [clr_login_word, clr_password] = [sanitize(login_word), sanitize(password)];

    user_model.findOne({$or:[ {username: clr_login_word}, {email: clr_login_word} ]}).exec(function(error, user) {
      if (error) {
        console.log(error);
        callback(error);
      } else if (!user) {
        console.log("Nickname/email did not find!");
        callback(new Error("Nickname/email did not find!"));
      } else {
        user.compareUserPassword(clr_password, function(match_error, is_match) {
          if (match_error) {
            console.log(match_error);
            callback(match_error);
          } else if (!is_match) {
            console.log("Incorrect password!");
            callback(new Error("Incorrect password!"));
          } else {
            console.log("Successful login!");
            callback();
          }
        });
      }
    });
  }
}
