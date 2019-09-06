const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', (req, res) => {
  //||"" zeby moc zastosowac trim
  const search = req.query.search || '';

  const findNews = News
  //RegExp- wyrażenie regularne, 'i'-case insensitive search
    .find({ title: new RegExp(search.trim(), 'i') })
    //sortowanie malejąco --> -1
    .sort({ created: -1 });

  findNews.exec((err, data) => {
    res.render('news', { title: 'News', data, search });
  });
});

module.exports = router;