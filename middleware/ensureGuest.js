const jwt = require('jsonwebtoken');

const ensureGuest = (req, res, next) => {
  console.log('ensureGuest middleware executed'); // Add this line
  jwt.verify(req.cookies.cookieToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      next();
    } else {
      res.redirect('/etusivu');
    }
  });
};

module.exports = ensureGuest;
