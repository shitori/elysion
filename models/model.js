let connection = require('../bin/bdd');

let mots = require('../models/mots');

class Model {
    static test(cb) {
        connection.query("SELECT NOW();", (err, rows) => {
            if (err) throw err
            cb(rows)
        })
    }

    static create_game(players, name, cb) {
        if (name == "ko") {
            cb("ko")
        } else {
            connection.query("select * from game where name = ?", [name], (err, row) => {
                if (err) throw err
                if (row.length > 0) {
                    cb("ko")
                } else {
                    var r = Math.floor(Math.random() * 1000000) + 1;
                    connection.query("insert into game values (?, ? , default, default, default, default )", [r, name], (err) => {
                        if (err) throw err
                        var sql = "insert into player values "
                        for (var i = 0; i < players.length; i++) {
                            if (i == players.length - 1) {
                                sql += "(default,?,default," + r + ");"
                            } else {
                                sql += "(default,?,default," + r + "),"
                            }
                            console.log(sql)
                        }
                        connection.query(sql, players, (err) => {
                            if (err) throw err
                            connection.query("select * from game where name = ?", [name], (err, row) => {
                                if (err) throw err
                                cb(row[0]["id"])
                            })

                        })
                    })
                }
            })
        }
    }

    static join_game(name, cb) {
        connection.query("select * from game where name = ? ", [name], (err, row) => {
            if (err) throw err
            if (row.length > 0) {
                cb(row[0]["id"])
            } else {
                cb(undefined)
            }
        })
    }

    static setGame(id, cb) {

        connection.query("select * from player where id_game = ?", [id], (err, rows) => {
            if (err) throw err
            var luck = 1.5;
            do {
                var rj1 = Math.floor(Math.random() * rows.length);
                var rj2 = Math.floor(Math.random() * rows.length);
            } while (rj1 == rj2 && rows[rj1]["score"] < rows[rows.length - 1]["score"] * luck && rows[rj2]["score"] < rows[rows.length - 1]["score"] * luck)
            var r = Math.floor(Math.random() * mots.length);
            connection.query("update game set actualword = ? , p1 = ? , p2 = ? where id = ?", [mots[r], rows[rj1]["id"], rows[rj2]["id"], id], (err) => {
                if (err) throw err
                cb(mots[r], rows[rj1]["id"], rows[rj2]["id"])
            })
        })
    }

    static getGame(id, cb) {
        connection.query("select * from game where id = ? ", [id], (err, row) => {
            if (err) throw err
            if (row.length == 0) {
                cb(-1)
            } else {
                connection.query("select * from player where id_game = ? order by score desc ", [id], (err, rows) => {
                    if (err) throw err
                    connection.query("select * from history where id_game = ? order by date desc ", [id], (err, rows2) => {
                        if (err) throw err
                        cb(row[0], rows, rows2)
                    })
                })

            }
        })
    }


    static addScore(id, cb) {
        connection.query("select * from game where id = ?", [id], (err, row) => {
            if (err) throw err
            if (row.length == 0) {
                cb("ko")
            } else {
                var j1 = row[0]["p1"]
                var j2 = row[0]["p2"]
                var mot = row[0]["actualword"]
                connection.query("update player set score = score + 1 where id = ? or id = ? ", [j1, j2], (err) => {
                    if (err) throw err
                    connection.query("insert into history values (default , ?,?, default , ?,?,?)", [j1, j2, 1, mot, id], (err) => {
                        if (err) throw err
                        cb("ok")
                    })
                })
            }
        })
    }

    static addLoose(id, cb) {
        connection.query("select * from game where id = ?", [id], (err, row) => {
            if (err) throw err
            if (row.length == 0) {
                cb("ko")
            } else {
                var j1 = row[0]["p1"]
                var j2 = row[0]["p2"]
                var mot = row[0]["actualword"]
                connection.query("insert into history values (default , ?,?, default , ?,?,?)", [j1, j2, 0, mot, id], (err) => {
                    if (err) throw err
                    cb("ok")
                })

            }
        })
    }


    static endGame(id, cb) {
        connection.query("update game set isOver = 1 where id = ?", [id], (err) => {
            if (err) throw err
            cb("ok")
        })
    }
}

module.exports = Model