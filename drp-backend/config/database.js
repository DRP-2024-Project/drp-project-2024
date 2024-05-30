const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "drp",
    database: "drpDB"
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