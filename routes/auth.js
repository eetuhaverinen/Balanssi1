const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const express = require('express');

const router = express.Router();
const { ensureGuest } = require('../middleware/auth');
const User = require('../models/userModel');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// @desc    Login page
// @route   GET /auth/login
router.get('/login', ensureGuest, (req, res) => {
  res.render('auth/login', {
    layout: 'home',
  });
});

// @desc    Login page
// @route   POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    res.cookie('cookieToken', token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (error) {
    res.send(
      `<p>${error.message}</p><p>Error. <a href="/">Go back home.</a></p>`
    );
  }
});

// @desc    logout user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  res.clearCookie('cookieToken');
  res.redirect('/');
});

// @desc    Register page
// @route   GET /auth/register
router.get('/register', ensureGuest, (req, res) => {
  res.render('auth/register', {
    layout: 'home',
  });
});

// @desc    Register page
// @route   POST /auth/register
router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);
    res.cookie('cookieToken', token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (error) {
    res.send(
      `<p>${error.message}</p><p>Error. <a href="/">Go back home.</a></p>`
    );
  }
});

module.exports = router;
