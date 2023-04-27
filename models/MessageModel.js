const mongoose = require('mongoose');
const User = require('../models/userModel');
const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
    required: true,
  }, // <-- Add the missing closing brace here
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  attachment: {
    type: String, // Assuming you store the attachment URL as a string
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
