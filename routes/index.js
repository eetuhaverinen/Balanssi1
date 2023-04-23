const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/StoryModel');
const User = require('../models/userModel');

// @desc    Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('auth/login', {
    layout: 'home',
  });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/etusivu', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const stories = await Story.find({ user: decoded._id }).lean();
    const user = await User.findById(decoded._id).lean();
    // const stories = await Story.find({}).lean();
    res.render('etusivu', {
      // username: decoded.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/mittaustulokset', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const stories = await Story.find({ user: decoded._id }).lean();
    // const stories = await Story.find({}).lean();
    res.render('mittaustulokset', {
      // username: decoded.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});


//GET viestit
router.get('/viestit', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const stories = await Story.find({ user: decoded._id }).lean();
    // const stories = await Story.find({}).lean();
    res.render('message', {
      // username: decoded.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

router.get('/viestitH', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const stories = await Story.find({ user: decoded._id }).lean();
    // const stories = await Story.find({}).lean();
    res.render('messageH', {
      layout: 'mainH',
      // username: decoded.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

router.get('/profiili', ensureAuth, async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const user = await User.findById(decoded._id).lean();
    // const stories = await Story.find({}).lean();
    res.render('profile', {
      // username: decoded.username,
      user,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

router.post('/profiili', ensureAuth, async (req, res) => {
  const {nimi, syntymaAika, pituus, paino, sukupuoli, leposyke, maksimisyke, BHbA1c} = req.body;

  try {
    // Validointi?
    if ( !pituus || !paino || !leposyke || !maksimisyke ) {
      throw Error('Täytä pakolliset tiedot');
    }
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const user = await User.findByIdAndUpdate(decoded._id, {
      nimi,
      syntymaAika,
      pituus,
      paino,
      sukupuoli,
      leposyke,
      maksimisyke,
      BHbA1c
    }, {new: true});
    await user.save();

    res.redirect('/profiili');

  } catch (err) {
    console.error(err);
    res.json({success: false, errorMessage: err.message});
  }
});

// @desc    FAQ
// @route   GET /faq
// GET FAQ page
router.get('/faq', (req, res) => {
  try {
    res.render('partials/faq');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc    Hoitaja dashboard
// @route   GET /etusivuH
router.get('/etusivuH', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    // Fetch data specific to the Hoitaja dashboard (if necessary)
    // const hoitajaData = await SomeModel.find({ user: decoded._id }).lean();

    res.render('etusivuH', {
      layout: 'mainH',
      // hoitajaData,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});
router.get('/potilaslista', ensureAuth, async (req, res) => {
  try {
    // Fetch all patients from the database
    const patients = await User.find({}).lean();

    // Render the potilaslista view with the patients data
    res.render('potilaslista', {
      layout: 'mainH',
      patients, // Pass the patients data to the view
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});



router.get('/kayttoehdot', (req, res) => {
  res.render('kayttoehdot');
});
router.get('/tietosuojakaytanto', (req, res) => {
  res.render('tietosuojakaytanto');
});
router.get('/evasteidenkaytto', (req, res) => {
  res.render('evasteidenkaytto');
});

// router.get('/main', ensureAuth, async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
//     const stories = await Story.find({ user: decoded._id }).lean();
//     // const stories = await Story.find({}).lean();
//     res.render('loader', {
//       // username: decoded.username,
//       stories,
//     });
//   } catch (err) {
//     console.error(err);
//     res.render('error/500');
//   }
// });

module.exports = router;
