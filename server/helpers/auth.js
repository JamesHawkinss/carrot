const db = require('db');

function handleAuth(req, res, next) {
    var headers = req.headers;
    if (!headers.hasOwnProperty('Authorization') || !headers.hasOwnProperty('UserID')) {
        res.status(401).send({
            "result": "FAILED"
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
                "result": "ERROR",
                "error": {
                    "cause": "DATABASE",
                    "trace": err
                }
            });
            return;
        }

        if (results.length === 0) {
            res.status(401).send({
                "result": "FAILED"
            });
            return;
        }

        var dbToken = results[0].token;
        if (dbToken !== token) {
            res.status(401).send({
                "result": "FAILED"
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