const { client } = require('../../../../helpers/twilio');
const config = require('../../../../config/config');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

function getParticipant(req, res) { // get a specific participant of a specific room
    if (!req.params.roomSid || !req.params.participantSid) {
        return res.status(406).send({ "result": "expected roomSid and participantSid" });
    }
    const roomSid = req.params.roomSid;
    const participantSid = req.params.participantSid;
    client.video.rooms(roomSid)
        .participants.get(participantSid)
        .fetch()
        .then(participant => res.send({ "result": "success", participant }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getConnectedParticipants(req, res) { // get all participants connected to a room
    if (!req.params.roomSid) {
        return res.status(406).send({ "result": "expected roomSid" })
    }
    const roomSid = req.params.roomSid;
    var connected = [];
    client.video.rooms(roomSid).participants
        .each({ status: 'connected' }, (participant) => {
            connected.push(participant.sid);
        });
    return res.send({ "result": "success", connected});
}

function disconnectParticipant(req, res) { // disconnect a participant from a room
    if (!req.params.roomSid || !req.params.participantSid) {
        return res.status(406).send({ "result": "expected roomSid and participantSid" });
    }
    const roomSid = req.params.roomSid;
    const participantSid = req.params.participantSid;
    client.video.rooms(roomSid)
        .participants(participantSid)
        .update({ status: 'disconnected' })
        .then(participant => res.send({ "result": "success", participant }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function createAccessToken(req, res) {
    if (!req.params.identifier || !req.params.roomName) {
        return res.status(406).send({ "result": "expected identifier and roomName" }); // review
    }
    const identifier = req.params.identifier;
    const room = req.params.roomName;
    const token = new AccessToken(config.twilio.accountSid, config.twilio.api.key, config.twilio.api.secret);
    token.identity = identifier;
    const videoGrant = new VideoGrant({
        room: room
    });
    token.addGrant(videoGrant);
    console.log(token);
    const jwtToken = token.toJwt();
    res.send({
        "result": "success",
        "roomName": room,
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