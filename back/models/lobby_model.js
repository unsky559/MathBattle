const {Schema, model} = require('mongoose');
const user_schema = require('./user_model.js');
const {setting_subschema} = require('./setting_subschema.js');

const lobby_schema = new Schema({
  room_id: {type: String, unique: true},
  create_date: Date,
  players: [{
    socket_id: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'user' }
  }], //[user_schema],
  ready: { type: Number, default: 0},
  settings: setting_subschema
}/*, {timestamps: true}*/);

//lobby_schema.index({createdAt: 1},{expireAfterSeconds: 60, partialFilterExpression : {users_ready: { $ne: { settings: {max_players} } } } }); 

module.exports = model('lobby', lobby_schema);

