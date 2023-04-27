const User = require('./models/userModel');
const Story = require('./models/StoryModel');
const mongoose = require('mongoose');

// Set strictQuery to true to suppress deprecation warning
mongoose.set('strictQuery', true);

// Connect to the database
mongoose.connect('mongodb+srv://eetuhaverinen:1oJxEBEtU2mqFMc3@cluster0.y9phssa.mongodb.net/starterWeek2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Delete all users
User.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('All users deleted successfully');
  }
});

// Delete all stories
Story.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('All stories deleted successfully');
  }
});
