import mysql from 'mysql';

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "drp",
    database: "drpDB"
});

export function connect() {
    return new Promise((resolve, reject) => {
        con.connect(function(err) {
            if (err) return reject(err);
            console.log("Connected!");
            resolve();
        });
    });
}

export function disconnect() {
    con.end();
}

export function query(sql, params) {
    return new Promise((resolve, reject) => {

        con.query(sql, params, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });    
}