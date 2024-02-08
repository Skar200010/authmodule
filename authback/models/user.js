const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  tokens: [
    {
      token: { type: String, required: true },
      status: { type: Boolean, default: true },
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
