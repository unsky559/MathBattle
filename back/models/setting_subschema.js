const {Schema} = require('mongoose');

const setting_subschema = new Schema({
  is_rating: Boolean,
  is_sync: Boolean,
  max_players: Number,
  win_condition: {
    mode: String, //"time" || "score"
    value: Number
  },
  modes: [{
    name: String,
    difficulty: Number
  }]
}, { _id : false });

module.exports.setting_subschema = setting_subschema;
