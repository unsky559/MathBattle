const {Schema, model} = require('mongoose')

const pool_schema = new Schema({
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  game_preset: {
    type: Schema.Types.ObjectId,
    ref: 'game_preset'
  }
});

module.exports = model('pool', pool_schema)
