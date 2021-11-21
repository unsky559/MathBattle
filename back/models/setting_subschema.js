const {Schema} = require('mongoose')

const setting_subschema = new Schema({
  is_rating: Boolean,
  is_sync: Boolean,
  max_players: Number,
  win_condition: {
    type: String, //"time" || "score"
    value: Number
  },
  game_mode: [{
    type: {
      type: Schema.Types.ObjectId,
      ref: 'game_mode'
    },
    difficulty: Number
  }]
}, { _id : false });

module.exports.setting_subschema = setting_subschema;
