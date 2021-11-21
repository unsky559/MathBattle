const {Schema, model} = require('mongoose')

const game_mode_schema = new Schema({
  name: String,
  min_difficulty: Number,
  max_difficulty: Number
});

module.exports = model('game_mode', game_mode_schema)