const db = require('./db');

function handleAuth(req, res, next) {
    var headers = req.headers;
    if (!headers.hasOwnProperty('Authorization') || !headers.hasOwnProperty('UserID')) {
        res.status(401).send({
            "result": "failed"
        });
        return;
    }
    var token = headers.Authorization;
    var id = headers.UserID;

    db.query({
        sql: 'SELECT username, token FROM users WHERE id = ?',
        values: [id]
    }, function (err, results) {
        if (err) {
            res.status(500).send({
                "result": "error",
                "error": {
                    "cause": "database",
                    "trace": err
                }
            });
            return;
        }

        if (results.length === 0) {
            res.status(401).send({
                "result": "failed"
            });
            return;
        }

        var dbToken = results[0].token;
        if (dbToken !== token) {
            res.status(401).send({
                "result": "failed"
            });
            return;
        }
        next({
            "id": id,
            "username": results[0].username
        });
    });
}

module.exports = handleAuth;