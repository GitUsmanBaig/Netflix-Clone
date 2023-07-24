const mysql = require('mysql2');
const Conn = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Usm@n2003',
    database: 'netflixdata'
});

Conn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
}
);

module.exports = Conn;