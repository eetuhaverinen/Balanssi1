const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/StoryModel');

// @desc    Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('home', {
    layout: 'home',
  });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const stories = await Story.find({ user: decoded._id }).lean();
    // const stories = await Story.find({}).lean();
    res.render('dashboard', {
      // username: decoded.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
