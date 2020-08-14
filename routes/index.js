var express = require('express');
var router = express.Router();
var models = require('../models/model')


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Accueil'});
});

router.post('/', function (req, res, next) {
    res.redirect("/game/" + req.body.id + "/show")
});

router.get('/allcurrentgame', function (req, res, next) {
    models.allCurrentGame(function (games, players) {
        res.render('allCurrentGame', {title: 'Toutes les parties en cours', games: games, players: players});
    })
});

router.get('/allfinishgame', function (req, res, next) {
    models.allFinishGame(function (games, players) {
        res.render('allFinishGame', {title: 'Toutes les parties finies', games: games, players: players});
    })
});


router.get('/game', function (req, res, next) {
    res.render('game', {title: 'Rejoindre une partie'});
});

router.get('/game/:id', function (req, res, next) {
    if (req.session.nom == req.params.id) {
        models.setGame(req.session.nom, function (mot, j1, j2) {
            models.getGame(req.session.nom, function (game, players, history) {
                if (game["isOver"] == 1) {
                    res.redirect("/game/" + req.params.id + "/finish")
                } else {
                    var p1, p2;
                    for (var i = 0; i < players.length; i++) {
                        if (j1 == players[i]["id"]) {
                            p1 = players[i]["name"]
                        }
                        if (j2 == players[i]["id"]) {
                            p2 = players[i]["name"]
                        }
                    }
                    res.render('playGame', {
                        title: 'Jouer la partie',
                        mot: mot,
                        j1: p1,
                        j2: p2,
                        players: players,
                        game: game,
                        history: history
                    });
                }
            })
        })
    } else {
        res.redirect("/game")
    }
});

router.post('/game/:id', function (req, res, next) {
    if (req.body.finish == undefined) {
        if (req.body.success == undefined) {
            models.addLoose(req.params.id, function (status) {
                res.redirect("/game/" + req.params.id)
            })
        } else {
            models.addScore(req.params.id, function (status) {
                res.redirect("/game/" + req.params.id)
            })
        }
    } else {
        models.endGame(req.params.id, function (status) {
            res.redirect("/game/" + req.params.id)
        })
    }


});

router.get('/game/:id/show', function (req, res, next) {
    models.getGame(req.params.id, function (game, players, history) {
        if (game == -1) {
            res.redirect("/game")
        } else if (game["isOver"] == 1) {
            res.redirect("/game/" + req.params.id + "/finish")
        } else {
            var p1, p2;
            for (var i = 0; i < players.length; i++) {
                if (game["p1"] == players[i]["id"]) {
                    p1 = players[i]["name"]
                }
                if (game["p2"] == players[i]["id"]) {
                    p2 = players[i]["name"]
                }
            }
            res.render('showGame', {
                title: 'Voir la partie',
                mot: game["actualword"],
                j1: p1,
                j2: p2,
                players: players,
                game: game,
                history: history
            });

        }
    })

});

router.post('/game', function (req, res, next) {
    models.join_game(req.body.nom, function (id) {
        if (id != undefined) {
            req.session.nom = id
            res.redirect("/game/" + id)
        } else {
            res.redirect("/game")
        }
    })
});

router.get('/game/:id/finish', function (req, res, next) {
    models.getGame(req.params.id, function (game, players, history) {
        if (game == -1) {
            res.redirect("/game")
        } else if (game["isOver"] == 0) {
            res.redirect("/game/" + req.params.id + "/show")
        } else {
            res.render('finishGame', {
                title: 'Partie Fini',
                players: players,
                game: game,
                history: history
            });

        }
    })
});

router.get('/game/:id/data', function (req, res, next) {
    models.getGame(req.params.id, function (game, players, history) {
        if (game == -1) {
            res.redirect("/game")
        } else {
            res.json({game: game, players: players, history: history});
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
