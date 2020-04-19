const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../../../helpers/db');

function auth(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(406).send({"result": "expected username and password"});
    }
    const username = req.body.username;
    const password = req.body.password;

    db.query({
        sql: 'SELECT id, passwordHash FROM users WHERE username = (?)',
        values: [username]
    }, function (err, results) {
        if (err) return res.status(500).send({
            "result": "ERROR",
            "error": {
                "cause": "DATABASE",
                "trace": err
            }
        });
        var id = results.id;
        bcrypt.compare(password, results.passwordHash, function (err, result) {
            if (err) return res.status(500).send({
                "result": "ERROR",
                "error": {
                    "cause": "CRYPT",
                    "trace": err
                }
            });
            if (result) {
                crypto.randomBytes(128, function (err, buf) {
                    if (err) return res.status(500).send({
                        "result": "ERROR",
                        "error": {
                            "cause": "CRYPT",
                            "trace": err
                        }
                    });
                    var token = buf.toString('hex');
                    db.query({
                        sql: 'UPDATE users SET token = ? WHERE id = ?',
                        values: [token, id]
                    }, function (err, results) {
                        if (err) return res.status(500).send({
                            "result": "ERROR",
                            "error": {
                                "cause": "DATABASE",
                                "trace": err
                            }
                        });
                        res.send({
                            "result": "OK",
                            "auth": {
                                "id": id,
                                "token": token
                            }
                        });
                    });
                });
            } else {
                res.status(403).send({"result": "FAILED"});
            }
        });
    });
}

module.exports = {auth}