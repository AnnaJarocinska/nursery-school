const express = require('express');
const router = express.Router();
const password = "123";
const login = "login";

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Strona główna' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie do Panelu Pracownika' });
});

router.post('/login', (req, res) => {
  const body = req.body;
  if (body.login === login && body.password === password) {

    req.session.employee = 1;
    res.redirect('/employee');
  } else {

    res.redirect('/login');
  }
});

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Strona główna' });
});

router.get('/login2', (req, res) => {
  res.render('login2', { title: 'Logowanie do Panelu Rodzica' });
});

router.post('/login2', (req, res) => {
  const body = req.body;
  if (body.login === login && body.password === password) {

    req.session.parents = 1;
    res.redirect('/parents');
  } else {

    res.redirect('/login2');
  }
});

module.exports = router;
