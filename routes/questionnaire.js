// const express = require('express');
// const router = express.Router();

// /* GET home page. */
// router.get('/', (req, res) => {
//   res.render('questionnaire', { title: 'Questionnaire' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/questionnaire');

/* GET home page. */
router.get('/', (req, res) => {

  const show = !req.session.vote;

  Questionnaire.find({}, (err, data) => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.vote;
    });

    res.render('questionnaire', { title: 'Ankieta', data, show, sum });
  });
});

router.post('/', (req, res) => {
  const id = req.body.quiz;

  Questionnaire.findOne({ _id: id }, (err, data) => {
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.vote = 1;

      res.redirect('/questionnaire');
    });
  });
});

module.exports = router;