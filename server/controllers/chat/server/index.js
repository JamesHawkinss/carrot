/*
 * In this wrapper, a "server" is in fact a service resource on the Twilio side. We're calling it a server for the sake of our project.
 */

const { client } = require('../../../helpers/twilio');

function createServer(req, res) {
    const friendlyName = req.body.friendlyName;
    client.chat.services.create({
        friendlyName: friendlyName,
    }).then(service => res.send({ "result": "success", service }));
}

module.exports = {
    createServer
}