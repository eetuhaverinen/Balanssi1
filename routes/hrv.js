const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensureAuth');
const ensureGuest  = require('../middleware/ensureGuest');
const Message = require('../models/MessageModel');
const Story = require('../models/StoryModel');
const User = require('../models/userModel');
const { gethrvData } = require('./api/hrv_functions.js');
console.log(gethrvData);
const multer = require('multer');


//ei käytössä
router.get('/joku', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const stories = await Story.find({ user: decoded._id }).lean();
    const user = await User.findById(decoded._id).lean();

    res.render('etusivu', {
      user,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
