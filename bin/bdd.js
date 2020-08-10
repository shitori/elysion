let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'mysql-sunland.alwaysdata.net',
    user: 'sunland',
    password: 'Metallica7793290',
    database: 'sunland_elysion',
    insecureAuth : true,
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQl");
});
module.exports = connection;