const db = require('../../helpers/db');
const crypto = require('crypto');

function createUser(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(406);
    }

    const username = req.body.username;
    const password = req.body.password;
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');
    
    db.query({
        sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
        values: [username, passwordHash]
    }, function (err) {
        if (err) return res.send(err);
    });

    return res.sendStatus(200); // no error, we presume the user has been created. review this.
}

function getUsers(req, res) {
    db.query('SELECT * FROM users', function (err, results) {
        if (err) return res.send(err);
        res.send(results);
    });
}