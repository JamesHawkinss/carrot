const { client } = require('../../../../helpers/twilio');
const config = require('../../../../config/config');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

function getParticipant(req, res) { // get a specific participant of a specific room
    const room = req.params.room;
    const participant = req.params.participant;
    client.video.rooms(room)
        .participants.get(participant)
        .fetch()
        .then(participant => res.send(participant));
}

function getConnectedParticipants(req, res) { // get all participants connected to a room
    const room = req.params.name;
    var connected = [];
    client.video.rooms(room).participants
        .each({ status: 'connected' }, (participant) => {
            connected.push(participant.identity);
        });
    return res.send(connected);
}

function disconnectParticipant(req, res) { // disconnect a participant from a room
    const room = req.params.room;
    const participant = req.params.participant;
    client.video.rooms(room)
        .participants(participant)
        .update({ status: 'disconnected' })
        .then(participant => res.send(participant));
}

function createAccessToken(req, res) {
    const id = req.params.id;
    const room = req.params.room;
    const token = new AccessToken(config.twilio.accountSid, config.twilio.api.key, config.twilio.api.secret);
    token.identity = id;
    const videoGrant = new VideoGrant({
        room: room
    });
    token.addGrant(videoGrant);
    res.send(token.toJwt());
}

module.exports = {
    getParticipant,
    getConnectedParticipants,
    disconnectParticipant,
    createAccessToken
}