const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ensureAuth = (req, res, next) => {
  const token = req.cookies.cookieToken;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const user = await User.findById(decodedToken._id); // <-- Change this line
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
};



module.exports = ensureAuth;