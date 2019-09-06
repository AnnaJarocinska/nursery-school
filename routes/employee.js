const express = require('express');
const News = require('../models/news')
const router = express.Router();

router.all('*', (req, res, next) => {
  if(!req.session.employee){
    res.redirect('login');
    return;
  };
  next();
});


/* GET home page. */
router.get('/', (req, res) => {
  News.find({}, (err, data) => {
  console.log(data);
    res.render('employee/index', { title: 'Panel pracownika', data});
  });
});

router.get('/news/add', (req, res) => {
  res.render('employee/newsForm', {title:'Dodaj news', body: {}, errors:{}});
});

//przechwytywanie danych z formularza i dodanie ich do bazy danych
router.post('/news/add', (req, res) => {
  const body = req.body;  
  const newsData = new News(body);

  //walidacja
  const errors = newsData.validateSync();
  
  newsData.save((err) => {
    if(err){
      res.render('employee/newsForm', {title:'Dodaj news', errors, body});
      return;
    }
    res.redirect('/employee')
  });
});

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect('/emploee')

  });
});

module.exports = router;