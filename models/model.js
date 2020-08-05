let connection = require('../bin/bdd');


class Model {
    static test(cb) {
        connection.query("SELECT NOW();", (err, rows) => {
            if (err) throw err
            cb(rows)
        })
    }

    static create_game(player,name,cb){
        connection.query("insert into game values (default, name , default )", (err)=>{
            if (err) throw err
            cb("ok")
        })
    }
}

module.exports = Model