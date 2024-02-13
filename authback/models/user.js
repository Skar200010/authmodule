const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  token: { type: String, default: null }, 
  status: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('User', userSchema);
