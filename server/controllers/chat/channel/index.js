const { client } = require('../../../twilio');
const config = require('../../../config/config');

const serviceId = config.twilio.services.dev; // change for production

function createChannel(req, res) { // create channel with defined name
    const name = req.body.name;
    client.chat.services(serviceId)
        .channels
        .create({ friendlyName: name })
        .then(channel => res.send(channel));
}

function getChannels(req, res) {
    client.chat.services(serviceId)
        .channels()
        .list()
        .then(channels => res.send(channels));
}

function getChannel(req, res) {
    const sid = req.params.sid;
    client.chat.services(serviceId)
        .channels(sid)
        .fetch()
        .then(channel => res.send(channel));
}

// TODO: handle updating channels

function deleteChannel(req, res) {
    const sid = req.params.sid;
    client.chat.services(serviceId)
        .channels(sid)
        .remove()
        .then(res.send('deleted'));
}

module.exports = {
    createChannel,
    getChannels,
    getChannel,
    deleteChannel
}