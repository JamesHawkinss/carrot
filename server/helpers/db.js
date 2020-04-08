const mysql = require('mysql');
const config = require('../config/config');

const db = mysql.createConnection(
    config.database.host,
    config.database.user,
    config.database.pass,
    config.database.database
);

db.connect();

module.exports = db;