var express = require('express');
var router = express.Router();
var models = require('../models/model')

router.get('/', function (req, res, next) {
    models.test(function (date) {
        console.log(date);
        res.render('index', {title: 'Accueil'});

    })
});

router.get('/creategame', function (req, res, next) {
    models.test(function (date) {
        console.log(date);
        res.render('createGame', {title: 'Nouvelle partie'});

    })

});

router.post('/creategame', function (req, res, next) {
    console.log(req.body)
    var joueur = []
    var nom = ""
    for (data in req.body) {

        console.log(data)
        console.log(req.body[data])

        if (data == "nom") {
            nom = req.body[data]
        } else {
            joueur.push(req.body[data])
        }
    }
    models.create_game(joueur, nom, function (status) {
        console.log(status)
        res.redirect("/")
    })


});

module.exports = router;
