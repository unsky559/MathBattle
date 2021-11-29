const {Schema, model} = require('mongoose');
const user_schema = require('./user_model.js');
const setting_subschema = require('./setting_subschema.js');

const lobby_schema = new Schema({
  create_date: Date,
  players: [user_schema],
  settings: setting_subschema
});

module.exports = model('lobby', lobby_schema);
