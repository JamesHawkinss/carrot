const bcrypt = require('bcrypt');
const db = require('../../../helpers/db');

function auth(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    db.query({
        sql: 'SELECT passwordHash FROM users WHERE username = (?)',
        values: [username]
    }, function (err, results) {
        if (err) throw err;
        console.log(results.passwordHash);
        bcrypt.compare(password, results.passwordHash, function(err, result) {
            if (err) throw err;
            if (result) {
                res.send('auth successful!');
            } else {
                res.send('auth unsuccessful');
            }
        });
    })
}

module.exports = { auth }