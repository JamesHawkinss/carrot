const { client } = require('../../../../helpers/twilio');
const config = require('../../../../config/config');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

function getParticipant(req, res) { // get a specific participant of a specific room
    if (!req.params.room || !req.params.participant) {
        return res.sendStatus(406).send({ "result": "expected room and participant" });
    }
    const room = req.params.room;
    const participant = req.params.participant;
    client.video.rooms(room)
        .participants.get(participant)
        .fetch()
        .then(participant => res.send(participant));
}

function getConnectedParticipants(req, res) { // get all participants connected to a room
    if (!req.params.room) {
        return res.sendStatus(406).send({ "result": "expected room" })
    }
    const room = req.params.room;
    var connected = [];
    client.video.rooms(room).participants
        .each({ status: 'connected' }, (participant) => {
            connected.push(participant.identity);
        });
    return res.send(connected);
}

function disconnectParticipant(req, res) { // disconnect a participant from a room
    if (!req.params.room || !req.params.participant) {
        return res.sendStatus(406).send({ "result": "expected room and participant" });
    }
    const room = req.params.room;
    const participant = req.params.participant;
    client.video.rooms(room)
        .participants(participant)
        .update({ status: 'disconnected' })
        .then(participant => res.send(participant));
}

function createAccessToken(req, res) {
    if (!req.params.identifier || !req.params.room) {
        return res.sendStatus(406).send({ "result": "expected identifier and room" }); // review
    }
    const identifier = req.params.identifier;
    const room = req.params.room;
    const token = new AccessToken(config.twilio.accountSid, config.twilio.api.key, config.twilio.api.secret);
    token.identity = identifier;
    const videoGrant = new VideoGrant({
        room: room
    });
    token.addGrant(videoGrant);
    const jwtToken = token.toJwt();
    res.send({
        "room": room,
        "identifier": identifier,
        "token": jwtToken
    });
}

module.exports = {
    getParticipant,
    getConnectedParticipants,
    disconnectParticipant,
    createAccessToken
}