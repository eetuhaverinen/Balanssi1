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
    // isLoginPage: true // set isLoginPage to true when rendering the login page
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
    res.redirect('/etusivu');
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
  res.redirect('/auth/login'); // Redirect to the login page
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
  const {email, password, nimi, syntymaAika, pituus, paino, sukupuoli, leposyke, maksimisyke, BHbA1c} = req.body;

  try {
    const user = await User.signup(email, password, nimi, syntymaAika, pituus, paino, sukupuoli, leposyke, maksimisyke, BHbA1c);

    // create a token
    const token = createToken(user._id);
    res.cookie('cookieToken', token, { httpOnly: true });
    res.redirect('/etusivu');
  } catch (error) {
    res.send(
      `<p>${error.message}</p><p>Error. <a href="/">Go back home.</a></p>`
    );
  }
});

//Hoitajan kirjautuminen

// @desc    Login page
// @route   GET /auth/login
router.get('/loginH', ensureGuest, (req, res) => {
  res.render('auth/loginH', {
    layout: 'homeH',
    // isLoginPage: false // set isLoginPage to false when rendering the loginH page
  });
});

// @desc    Login page
// @route   POST /auth/loginH

// @desc    Login page
// @route   POST /auth/loginH

router.post('/loginH', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw Error('Invalid email');
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      throw Error('Invalid password');
    }
    const token = createToken(user._id);
    res.cookie('cookieToken', token, { httpOnly: true });
    res.redirect('/etusivuH');
  } catch (error) {
    res.send(`<p>${error.message}</p><p>Error. <a href="/">Go back home.</a></p>`);
  }
});


// @desc    Hoitaja dashboard
// @route   GET /etusivuH
router.get('/etusivuH', (req, res) => {
  res.render('etusivuH', {
    layout: 'homeH',
  });
});




// @desc    logout user
// @route   GET /



module.exports = router;


