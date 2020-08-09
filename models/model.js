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
                    connection.query("insert into game values (?, ? , default,default,null,null )", [r, name], (err) => {
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
            var rj1 = Math.floor(Math.random() * rows.length);
            do {
                var rj2 = Math.floor(Math.random() * rows.length);
            } while (rj1 == rj2)
            var r = Math.floor(Math.random() * mots.length);
            /*console.log(rows)
            console.log(rj1)
            console.log(rj2)
            console.log(rows[rj1])
            console.log(rows[rj2])*/
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
                    cb(row[0], rows)
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
                connection.query("update player set score = score + 1 where id = ? or id = ? ", [j1, j2], (err) => {
                    if (err) throw err
                    cb("ok")
                })
            }
        })
    }

    static endGame(id,cb){
        connection.query("update game set isOver = 1 where id = ?",[id],(err)=>{
            if (err) throw err
            cb("ok")
        })
    }
}

module.exports = Model