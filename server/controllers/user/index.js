const db = require('../../helpers/db');
const crypto = require('crypto');

function createUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');
}