const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login a nurse
const loginNurse = async (req, res) => {
  const { username, password } = req.body;

  // for testing purposes only
  if (username === 'test@example.com' && password === 'password') {
    const user = { _id: 'testnurseid' };
    const token = createToken(user._id);
    return res.status(200).json({ username, token });
  }

  try {
    const user = await User.login(username, password);

    // check if user role is nurse
    //if (user.role !== 'nurse') {
      //throw Error('Invalid credentials');
    //}

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, loginNurse };
