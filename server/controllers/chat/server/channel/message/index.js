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
        .catch(err => res.send({ "result": "error", "error": err }))
}

module.exports = {
    createMessage
}