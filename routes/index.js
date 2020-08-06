var express = require('express');
var router = express.Router();
var models = require('../models/model')

router.get('/', function (req, res, next) {
    models.test(function (date) {
        console.log(date);
        res.render('index', {title: 'Accueil'});

    })
});

router.get('/game', function (req, res, next) {
    models.test(function (date) {
        console.log(date);
        res.render('game', {title: 'Rejoindre une partie'});
    })
});


router.post('/game', function (req, res, next) {
    req.session.name = req.body.nom;
    models.join_game(req.body.nom, function (exist) {
        console.log(exist)
        if (exist) {
            res.render('playGame', {title: 'Rejoindre une partie', name: req.session.name});
        } else {
            console.log("la partie n'existe pas")
            res.redirect("/game")
        }
    })
});




router.get('/creategame', function (req, res, next) {
    models.test(function (date) {
        console.log(date);
        res.render('createGame', {title: 'Nouvelle partie', error: ""});
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
        if (status == "ko") {
            res.render('createGame', {
                title: 'Nouvelle partie',
                error: "La partie n'a pas pu être crée. Veuillez essayer un autre nom."
            });
        } else {
            req.session.name = nom
            res.redirect("/game")
        }

    })


});

module.exports = router;
