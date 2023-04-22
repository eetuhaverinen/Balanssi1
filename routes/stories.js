const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { ensureAuth } = require('../middleware/auth');

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
    res.render('error/500');
  }
});

// @desc    Show all stories
// @route   GET /stories
// @desc    Show all stories
// @route   GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    let verensokerit;

    // If the logged-in user is a nurse, show all stories
    if (req.user.role === 'nurse') {
      verensokerit = await Story.find().sort({ createdAt: 'asc' }).lean();
    } else {
      // Show only the current user's stories
      verensokerit = await Story.find({ user: req.user.id }).sort({ createdAt: 'asc' }).lean();
    }

    const labels = verensokerit.map(sokeri => moment(sokeri.createdAt).format('MMM D, YYYY, h:mm:ss a'));
    const data = verensokerit.map(sokeri => sokeri.mmolPerL);

    res.render('stories/index', {
      labels,
      data,
      stories: verensokerit
    });
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

router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render('error/404');
    }

    if (story.user != req.user.id) {
      res.redirect('/mittaustulokset');
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect('/mittaustulokset');
    }
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

//@desc Search stories by title
//@route GET /stories/search/:query
router.get('/search/:query', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      title: new RegExp(req.query.query, 'i'),
      status: 'public',
    })
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('stories/index', { stories });
  } catch (err) {
    console.log(err);
    res.render('error/404');
  }
});


// @desc    Show patient list
// @route   GET /potilaslista
// @desc    Show patient list
// @route   GET /potilaslista
router.get('/potilaslista', ensureAuth, async (req, res) => {
  try {
    if (req.user.role !== 'nurse') {
      return res.redirect('/stories');
    }

    const patients = await User.find({ role: 'patient' }).lean();
    const stories = await Story.find().populate('user').lean();

    router.get('/potilaslista', ensureAuth, async (req, res) => {
      try {
        if (req.user.role !== 'nurse') {
          return res.redirect('/stories');
        }
        
        const patients = await User.find({ role: 'patient' }).lean(); // Fetch patients
        const stories = await Story.find().populate('user').lean(); // Fetch stories
    
        res.render('patients/index', {
          patients,
          stories,
        });
      } catch (err) {
        console.error(err);
        res.render('error/500');
      }
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});
const hbs = require('handlebars');
module.exports = {
  // ... other helpers

  json: function (context) {
    return JSON.stringify(context);
  },
};


module.exports = router;
