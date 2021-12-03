const {Schema, model} = require('mongoose');
const bcrypt = require("bcryptjs");
const {setting_subschema} = require('./setting_subschema.js');


const user_schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  authkeys: {
    password: String
  },
  userpic: String,
  date_reg: Date, // registration date 
  stats: {
    rating: Number,
    winrate: Number,
    time_spend: Number,
    finished_lobbies: [{
      date_create: Date,
      date_end: Date,
      setting: setting_subschema,
      avg_rating: Number,
      result: {
        is_win: Boolean,
        rating_changed: Number
      }
    }]
  },
  //is_online: Boolean
  //is_playing: Boolean
  last_online: Date,
  current_lobbies: {
    type: Schema.Types.ObjectId,
    ref: 'lobby'
  }
});

user_schema.pre("save", function (done) {
  const user = this;

  if (this.isModified("authkeys.password") || this.isNew) {
    bcrypt.genSalt(10, function (salt_error, salt) {
      if (salt_error) {
        return done(salt_error);
      } else {
        bcrypt.hash(user.authkeys.password, salt, function(hash_error, hash) {
          if (hash_error) {
            return done(hash_error);
          }
          user.authkeys.password = hash;
          done();
        });
      }
    });
  } else {
    return done();
  }
});

user_schema.methods.compareUserPassword = function(password, done) {
  bcrypt.compare(password, this.authkeys.password, function(error, is_match) {
    if (error) {
      return done(error);
    } else {
      done(null, is_match);
    }
  });
}

module.exports = model('user', user_schema);