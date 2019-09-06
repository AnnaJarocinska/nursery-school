const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
  if(!req.session.employee){
    res.redirect('login2');
    return;
  };
  next();
});


/* GET home page. */
router.get('/', (req, res) => {
  
    res.render('parents/index', { title: 'Panel Rodzica'});
  });




module.exports = router;