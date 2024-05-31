const mysql = require('mysql');

var con = mysql.createConnection({
    host: "drpdatabase.cdaay248o977.eu-west-2.rds.amazonaws.com",
    user: "admin",
    password: "drp12345",
    database: "drpdb",
    port: 3306
});

function connect() {
    return new Promise((resolve, reject) => {
        con.connect(function(err) {
            if (err) return reject(err);
            console.log("Connected!");
            resolve();
        });
    });
}

function disconnect() {
    con.end();
}

function query(sql, params) {
    return new Promise((resolve, reject) => {

        con.query(sql, params, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });    
}

module.exports = {
    connect,
    disconnect,
    query
}