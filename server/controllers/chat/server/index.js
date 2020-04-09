/*
 * In this wrapper, a "server" is in fact a service resource on the Twilio side. We're calling it a server for the sake of our project.
 */

const { client } = require('../../../helpers/twilio');

function createServer(req, res) {
    if (!req.body.friendlyName) {
        return res.sendStatus(406).send({ "result": "expected friendlyName" });
    }
    const friendlyName = req.body.friendlyName;
    client.chat.services.create({
        friendlyName: friendlyName,
    }).then(service => res.send({ "result": "success", service }));
}

function getServers(req, res) {
    client.chat.services.list()
        .then(services => res.send({ "result": "success", services }));
}

function getServer(req, res) {
    if (!req.params.serverSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid" });
    }
    const serverSid = req.params.serverSid;
    client.chat.service(serverSid)
        .fetch()
        .then(service => res.send({ "result": "success", service }));
}

function deleteServer(req, res) {
    if (!req.params.serverSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid" });
    }
    const serverSid = req.params.serverSid;
    client.chat.services(serverSid).remove()
        .then(res.send({ "result": "success" }));
}

module.exports = {
    createServer,
    getServers,
    getServer,
    deleteServer
}