const { client } = require('../../../../../helpers/twilio');

function createMessage(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || req.params.username || req.body.content) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and username" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const username = req.params.username;
    const body = req.body.content;
    client.chat.services(serverSid)
        .channels(channelSid)
        .messages
        .create({
            from: username,
            body: body
        })
        .then(message => res.send({ "result": "success", message }), res.send({ "result": "error" }));
}