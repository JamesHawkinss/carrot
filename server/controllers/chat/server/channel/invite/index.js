const { client } = require('../../../../../helpers/twilio');

function createInvite(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.body.username) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and username" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const identity = req.body.username;
    client.chat.services(serverSid)
        .channels(channelSid)
        .invites
        .create({ identity: identity })
        .then(invite => res.send({ "result": "success", invite }));
}

function getInvite(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.body.inviteSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and inviteSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const inviteSid = req.body.inviteSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .invites(inviteSid)
        .fetch()
        .then(invite => res.send({ "result": "success", invite }));
}

function getInvites(req, res) {
    if (!req.params.serverSid || !req.params.channelSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .invites
        .list()
        .then(invites => res.send({ "result": "success", invites }));
}

function deleteInvite(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.body.inviteSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and inviteSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const inviteSid = req.body.inviteSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .invites(inviteSid)
        .remove()
        .then(res.send({ "result": "success" }));
}

module.exports = {
    createInvite,
    getInvite,
    getInvites,
    deleteInvite
}