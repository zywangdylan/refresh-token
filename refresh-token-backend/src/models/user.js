const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  phone: {
    type: String
  },
  bio: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  refreshTokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
