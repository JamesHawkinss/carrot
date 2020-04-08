const mysql = require('mysql');
const config = require('../config/config');

const db = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    pass: config.database.pass,
    database: config.database.database
});

db.connect();

module.exports = db;