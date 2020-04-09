const db = require('../../helpers/db');
const bcrypt = require('bcrypt');

function createUser(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(406);
    }

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash) {
        if (err) throw err;
        db.query({
            sql: 'INSERT INTO users (username, passwordHash) VALUES (?, ?)',
            values: [username, hash]
        }, function (err, results) {
            if (err) return res.sendStatus(500).send({ "result": "database error" });
            console.log(results); // remove in production
            res.send(results);
        });
    });
}

function getUsers(req, res) {
    db.query('SELECT * FROM users', function (err, results) {
        if (err) return res.sendStatus(500).send({ "result": "database error" });
        res.send(results);
    });
}

function getUser(req, res) {
    if (!id || NaN(id)) {
        return res.sendStatus(406).send({ "result": "expected numeric id" });
    }
    const id = req.params.id;
    db.query({
        sql: 'SELECT * FROM users WHERE id=(?)',
        values: [id],
    }, function (err, results) {
        if (err || results.length <= 0) {
            res.sendStatus(404);
        } else {
            res.send(results);
        }
    });
}

function deleteUser(req, res) {
    if (!id || NaN(id)) {
        return res.sendStatus(406).send({ "result": "expected numeric id" });
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