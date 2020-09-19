const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lieja@1997',
    database: 'myProject',

});
module.exports = pool;