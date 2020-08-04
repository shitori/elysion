var express = require('express');
var router = express.Router();
var models = require('../models/model')

router.get('/', function(req, res, next) {
  models.test(function (date){
    console.log(date);
    res.render('index', { title: 'Accueil' });

  })
});

router.get('/creategame', function(req, res, next) {
  models.test(function (date){
    console.log(date);
    res.render('createGame', { title: 'Nouvelle partie' });

  })

});

router.post('/creategame', function(req, res, next) {
  console.log(req.body)
  for (data in req.body){
    console.log(data)
    console.log(req.body[data])
  }
  res.redirect("/")

});

module.exports = router;
