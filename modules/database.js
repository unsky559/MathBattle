const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const url_database = "mongodb://localhost:27017/mydb";


var db_connection = null;
var game_mode_model = null;
var game_preset_model = null;
var pool_model = null;
var user_model = null;
var lobby_model = null;


const game_mode_schema = new mongoose.Schema({
  name: String,
  min_difficulty: Number,
  max_difficulty: Number
});


const setting_subschema = new mongoose.Schema({
  is_rating: Boolean,
  is_sync: Boolean,
  max_players: Number,
  win_condition: {
    type: String, //"time" || "score"
    value: Number
  },
  game_mode: [{
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'game_mode'
    },
    difficulty: Number
  }]
}, { _id : false });


const game_preset_schema = new mongoose.Schema({
  name: String,
  settings: setting_subschema
});


const pool_schema = new mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  game_preset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'game_preset'
  }
});


const user_schema = new mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  authkeys: {
    password: String
  },
  userpic: String,
  date: Date,
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
  last_online: Date,
  current_lobbies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lobby'
  }
});


const lobby_schema = new mongoose.Schema({
  create_date: Date,
  players: [user_schema],
  settings: setting_subschema
});


user_schema.pre("save", function (next) {
  const user = this;

  if (this.isModified("authkeys.password") || this.isNew) {
    bcrypt.genSalt(10, function (salt_error, salt) {
      if (salt_error) {
        return next(salt_error);
      } else {
        bcrypt.hash(user.authkeys.password, salt, function(hash_error, hash) {
          if (hash_error) {
            return next(hash_error);
          }
          user.authkeys.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});


user_schema.methods.compareUserPassword = function(password, callback) {
  bcrypt.compare(password, this.authkeys.password, function(error, is_match) {
    if (error) {
      return callback(error);
    } else {
      callback(null, is_match);
    }
  });
}

module.exports = {
  /**
  * Initialization of the connection of the database and database models.
  */
  init: function(){
    mongoose.connect(url_database);
    db_connection = mongoose.connection;
    db_connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    game_mode_model = db_connection.model('game_mode', game_mode_schema);
    game_preset_model = db_connection.model('game_preset', game_preset_schema);
    pool_model = db_connection.model('pool', pool_schema);
    user_model = db_connection.model('user', user_schema);
    lobby_model = db_connection.model('lobby', lobby_schema);
  },

  /**
  * Closes the connection with the database.
  */
  closeConnection: function(){
    mongoose.connection.close();
  },

  /**
  * @returns {Object} Connection with the database
  */
  getDatabaseConnection: function(){
    return db_connection;
  },

  /**
  * @returns {Model} The compiled model of the user
  */
  getUserModel: function(){
    return user_model;
  }
}
