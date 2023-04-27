const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  mmolPerL: {
    type: Number,
    required: true,
  },
  feeling: {
    type: String,
    required: true,
  },
  GHH: {
    type: Number,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  sportDuration: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Story', StorySchema);

