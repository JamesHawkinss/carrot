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
            sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
            values: [username, hash]
        }, function (err) {
            if (err) return res.send(err);
        });

        return res.sendStatus(200); // no error, we presume the user has been created. review this.
    });
}

function getUsers(req, res) {
    db.query('SELECT * FROM users', function (err, results) {
        if (err) return res.send(err);
        res.send(results);
    });
}

function getUser(req, res) {
    const id = req.params.id;
    db.query({
        sql: 'SELECT * FROM users WHERE id=(?)',
        values: [id],
    }, function (err, results) {
        if (error || results.length <= 0) {
            res.sendStatus(404);
        } else {
            res.send(results);
        }
    });
}

function deleteUser(req, res) {
    const id = req.params.id;
    db.query({
        sql: 'DELETE * FROM users WHERE id=(?)',
        values: [id],
    }, function (err, results) {
        if (error || results.length <= 0) {
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