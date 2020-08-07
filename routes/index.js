var express = require('express');
var router = express.Router();
var models = require('../models/model')


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Accueil'});
});

router.get('/game', function (req, res, next) {
    res.render('game', {title: 'Rejoindre une partie'});
});

router.get('/game/:id', function (req, res, next) {
    if (req.session.nom == req.params.id) {
        models.getMot(req.session.nom, function (mot) {
            res.render('playGame', {title: 'Jouer la partie', mot: mot});
        })
    } else {
        res.redirect("/game")
    }

});

router.get('/game/:id/show', function (req, res, next) {
    models.getGame(req.params.id, function (word) {
        if (word == -1) {
            res.redirect("/game")
        } else {
            res.render('showGame', {title: 'Voir la partie', mot: word});
        }
    })

});
router.post('/game', function (req, res, next) {
    models.join_game(req.body.nom, function (id) {
        console.log(id)
        if (id != undefined) {
            req.session.nom = id
            res.redirect("/game/" + id)
        } else {
            res.redirect("/game")
        }
    })
});


router.get('/creategame', function (req, res, next) {
    res.render('createGame', {title: 'Nouvelle partie', error: ""});
});

router.post('/creategame', function (req, res, next) {
    var joueur = []
    var nom = ""
    for (data in req.body) {
        if (data == "nom") {
            nom = req.body[data]
        } else {
            joueur.push(req.body[data])
        }
    }
    models.create_game(joueur, nom, function (status) {
        if (status == "ko") {
            res.render('createGame', {
                title: 'Nouvelle partie',
                error: "La partie n'a pas pu être crée. Veuillez essayer un autre nom."
            });
        } else {
            req.session.nom = status
            res.redirect("/game/" + status)
        }
    })
});

module.exports = router;
