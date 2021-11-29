const {Schema, model} = require('mongoose');
const {setting_subschema} = require('./setting_subschema.js');

const game_preset_schema = new Schema({
  name: String,
  settings: setting_subschema
});

module.exports = model('game_presets', game_preset_schema);