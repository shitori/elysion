let connection = require('../bin/bdd');

/*function addSa(item,index,arr){
    connection.query("select nom from famille_spec fs join specificationsAlimentaires sA on fs.id_spec = sA.id where id_famille = ?",[arr[index].id],(err,rows)=> {
        if (err) throw err
        arr[index].sa = []
        for (var row in rows) {
            arr[index].sa.push(rows[row].nom)
        }
        console.log(arr[index].sa)
    })
}*/

class Model {
    static test(cb) {
        connection.query("select now", (err, rows) => {
            if (err) throw err
            cb(rows)
        })
    }
}

module.exports = Model