const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ensureAuth= require('../middleware/ensureAuth');
const ensureGuest = require('../middleware/ensureGuest');
const Message = require('../models/MessageModel');
const Story = require('../models/StoryModel');
const User = require('../models/userModel');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

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


// GET viestit
router.get('/viestit', ensureAuth, async (req, res) => {
  try {
    console.log('req.user._id:', req.User._id);
    const messages = await Message.find({ recipient: req.User._id})
      .populate('sender', 'displayName email')
      .populate('recipient', 'displayName email')
      .sort({ createdAt: 'desc' });
    console.log('messages:', messages);

    res.render('message', {
      user: req.user,
      messages,
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

// @desc    Send a message
// @route   POST /viestit
router.post('/viestit', upload.single('attachment'), ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const sender = await User.findById(decoded._id).lean();
    const recipient = await User.findOne({ email: req.body.recipient }).lean();

    if (!recipient) {
      throw Error('Recipient not found');
    }

    const newMessage = new Message({
      subject: req.body.subject,
      message: req.body.message,
      sender: sender._id, 
      recipient: recipient._id, 
      ...(req.file && { attachment: req.file.path.replace(/\\/g, '/') }),
    });

    await newMessage.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ success: false, errorMessage: err.message });
  }
});


//GET profiili
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
//hrv
router.get('/hrv-data', async (req, res) => {
  try {
    const data = await HRVData.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
