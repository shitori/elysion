let connection = require('../bin/bdd');


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
                    connection.query("insert into game values (?, ? , default )", [r, name], (err) => {
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
}

module.exports = Model