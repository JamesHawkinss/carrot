const { client } = require('../../../../../helpers/twilio');

function createMessage(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.body.username || !req.body.content) {
        return res.status(406).json({ "result": "expected serverSid and channelSid and username and content" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const username = req.body.username;
    const body = req.body.content;
    client.chat.services(serverSid)
        .channels(channelSid)
        .messages
        .create({
            from: username,
            body: body
        })
        .then(message => res.send({ "result": "success", message }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getMessage(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.params.messageSid) {
        return res.status(406).json({ "result": "expected serverSid and channelSid and messageSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const messageSid = req.params.messageSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .messages(messageSid)
        .fetch()
        .then(message => res.send({ "result": "success", message }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getMessages(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.body.limit) {
        return res.status(406).json({ "result": "expected serverSid and channelSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const limit = req.body.limit;
    client.chat.services(serverSid)
        .channels(channelSid)
        .messages
        .list({ limit: limit })
        .then(messages => res.send({ "result": "success", messages }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function updateMessage(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.params.messageSid || !req.body.content) {
        return res.status(406).json({ "result": "expected serverSid and channelSid and messageSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const messageSid = req.params.messageSid;
    const content = req.body.content;
    client.chat.services(serverSid)
        .channels(channelSid)
        .messages(messageSid)
        .update({ body: content })
        .then(message => res.send({ "result": "success", message }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function deleteMessage(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.params.messageSid) {
        return res.status(406).json({ "result": "expected serverSid and channelSid and messageSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const messageSid = req.params.messageSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .messages(messageSid)
        .remove()
        .then(res.send({ "result": "succes" }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

module.exports = {
    createMessage,
    getMessage,
    getMessages,
    updateMessage,
    deleteMessage
}