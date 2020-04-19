const db = require('../../helpers/db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

function createUser(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(406);
    }

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) return res.status(500).send({
            "result": "ERROR",
            "error": {
                "cause": "CRYPT",
                "trace": err
            }
        });
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
                sql: 'INSERT INTO users (username, passwordHash, token) VALUES (?, ?, ?)',
                values: [username, hash, token]
            }, function (err, results) {
                if (err) return res.status(500).send({
                    "result": "ERROR",
                    "error": {
                        "cause": "DATABASE",
                        "trace": err
                    }
                });
                return res.send({
                    "result": "OK",
                    "auth": {
                        "id": results.insertId,
                        "token": token
                    }
                });
            });
        });
    });
}

function getUsers(req, res) {
    db.query('SELECT * FROM users', function (err, results) {
        if (err) return res.status(500).send({"result": "database error", err});
        res.send(results);
    });
}

function getUser(req, res) {
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(406).send({"result": "expected numeric id"});
    }
    const id = req.params.id;
    db.query({
        sql: 'SELECT * FROM users WHERE id=(?)',
        values: [id],
    }, function (err, results) {
        if (err || results.length <= 0) {
            res.sendStatus(404);
        } else {
            return res.send({"result": "success", results});
        }
    });
}

function deleteUser(req, res) {
    if (!id || NaN(id)) {
        return res.status(406).send({"result": "expected numeric id"});
    }
    const id = req.params.id;
    db.query({
        sql: 'DELETE * FROM users WHERE id=(?)',
        values: [id],
    }, function (err, results) {
        if (err || results.length <= 0) {
            res.sendStatus(404);
        } else {
            res.send(results);
        }
    });
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser
}