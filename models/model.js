let connection = require('../bin/bdd');


class Model {
    static test(cb) {
        connection.query("SELECT NOW();", (err, rows) => {
            if (err) throw err
            cb(rows)
        })
    }
}

module.exports = Model