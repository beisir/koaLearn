const mysql = require('mysql');

let pool = mysql.createPool({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: '5211314',
    database: 'hc360'
});

class MySql {
    constructor () {};
    async query (sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, data) => {
                !err ? resolve(data) : reject(err);;
            });
        })

    }
}




module.exports = new MySql();
