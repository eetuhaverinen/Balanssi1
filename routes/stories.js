const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const  ensureAuth  = require('../middleware/ensureAuth');

const User = require('../models/userModel');
const Story = require('../models/StoryModel');



// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    req.body.user = decoded._id;
    req.body.mmolPerL = parseFloat(req.body.mmolPerL);
    req.body.GHH = parseFloat(req.body.GHH);
    req.body.sportDuration = parseFloat(req.body.sportDuration);

    await Story.create(req.body);
    res.redirect('/mittaustulokset');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the story.' });
  }
});



// @route   GET /mittaustulokset
router.get('/mittaustulokset', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user._id }).populate('user', 'nimi').lean();
    res.render('mittaustulokset', { stories });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});




// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    console.log(req.params.id);
    if (!story) {
      return res.render('error/404');
    }

    res.render('stories/show', {
      story,
    });
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();

    if (!story) {
      return res.render('error/404');
    }

    res.render('stories/edit', {
      story,
    });
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
});


// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    // console.log("Story's ID: ", req.params.id);
    // res.redirect('/dashboard');
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render('error/404');
    }

    story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect('/mittaustulokset');
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
});

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render('error/404');
    }
    await Story.remove({ _id: req.params.id });
    res.redirect('/mittaustulokset');
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
});



// @desc    Show patient list
// @route   GET /potilaslista

router.get('/potilaslista', ensureAuth, async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).populate('stories').lean();
    console.log(patients);
    res.render('potilaslista', { patients });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});










// @route   GET /api/stories
router.get('/stories', ensureAuth, async (req, res) => {
  try {
    const patientId = req.query.patientId;
    const stories = await Story.find({ user: patientId }).sort({ createdAt: 'asc' }).lean();
    
    console.log('Fetched stories for patient:', patientId, stories);

    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching stories.' });
  }
});




module.exports = router;
