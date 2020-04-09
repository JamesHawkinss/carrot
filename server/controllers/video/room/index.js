const { client } = require('../../../helpers/twilio');

function createRoom(req, res) { // create a room
    if (!req.params.name) {
        return res.status(406).send({ "result": "expected name" });
    }
    const name = req.params.name;
    client.video.rooms.create({ uniqueName: name })
        .then(room => res.send({ "result": "success", room }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function closeRoom(req, res) { // complete (close) a room
    if (!req.params.roomSid) {
        return res.status(406).send({ "result": "expected roomSid" });
    }
    const roomSid = req.params.roomSid;
    client.video.rooms(roomSid)
        .update({ status: 'completed' })
        .then(room => res.send({ "result": "success", room }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getRooms(req, res) {
    client.video.rooms.list()
        .then(rooms => res.send({ "result": "success", rooms }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getCompletedRooms(req, res) { // retrieve all completed rooms
    client.video.rooms.list({ status: 'completed' })
        .then(rooms => res.send({ "result": "success" , rooms }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getIPRooms(req, res) {
    client.video.rooms.list({ status: 'in-progress' })
        .then(rooms => res.send({ "result": "success", rooms }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getRoom(req, res) {
    if (!req.params.roomSid) {
        return res.status(406).send({ "result": "expected roomSid" });
    }
    const roomSid = req.params.roomSid;
    client.video.rooms(roomSid)
        .fetch()
        .then(room => res.send({ "result": "success", room }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

module.exports = {
    createRoom,
    closeRoom,
    getRooms,
    getCompletedRooms,
    getIPRooms,
    getRoom
}