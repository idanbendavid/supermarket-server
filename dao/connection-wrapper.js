const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bdedc4a8a91d16",
    password: "10464076",
    database: "heroku_e061c990dc2b0d1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 
})


function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};