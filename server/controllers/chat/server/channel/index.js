const { client } = require('../../../../helpers/twilio');

function createChannel(req, res) {
    if (!req.params.serverSid || !req.body.friendlyName) {
        return res.sendStatus(406).send({ "result": "expected serverSid and friendlyName" });
    }
    const serverSid = req.params.serverSid;
    const friendlyName = req.body.friendlyName;
    client.chat.services(serverSid)
        .channels
        .create({ friendlyName: friendlyName })
        .then(channel => res.send({ "result": "success", channel }), res.send({ "result": "error" }));
}

function getChannels(req, res) {
    if (!req.params.serverSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid" });
    }
    const serverSid = req.params.serverSid;
    client.chat.services(serverSid)
        .channels.list()
        .then(channels => res.send({ "result": "success", channels }), res.send({ "result": "error" }));
}

function getChannel(req, res) {
    if (!req.params.serverSid || !req.params.channelSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid" });
    }
    const serverSid = req.parmas.serverSid;
    const channelSid = req.params.channelSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .fetch()
        .then(channel => res.send({ "result": "success", channel }), res.send({ "result": "error" }));
}

function deleteChannel(req, res) {
    if (!req.params.serverSid || !req.params.channelSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .remove()
        .then(res.send({ "result": "success" }), res.send({ "result": "error" }))
}

module.exports = {
    createChannel,
    getChannel,
    getChannels,
    deleteChannel
}