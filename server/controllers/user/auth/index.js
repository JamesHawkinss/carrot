const bcrypt = require('bcrypt');
const db = require('../../../helpers/db');

function auth(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(406).send({ "result": "expected username and password" });
    }
    const username = req.body.username;
    const password = req.body.password;
    
    db.query({
        sql: 'SELECT passwordHash FROM users WHERE username = (?)',
        values: [username]
    }, function (err, results) {
        if (err) return res.sendStatus(500).send({ "result": "database error" });
        bcrypt.compare(password, results.passwordHash, function(err, result) {
            if (err) return res.sendStatus(500).send({ "result": "database error" });
            if (result) {
                res.send({ "result": "auth OK" });
            } else {
                res.send({ "result": "auth FAILED" });
            }
        });
    });
}

module.exports = { auth }