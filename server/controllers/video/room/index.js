const { client } = require('../../../helpers/twilio');

function createRoom(req, res) { // create a room
    if (!req.params.room) {
        return res.sendStatus(406).send({ "result": "expected room" });
    }
    const room = req.params.room;
    client.video.rooms.create({ uniqueName: room })
        .then(room => res.send(room), res.send({ "result": "error" }));
}

function closeRoom(req, res) { // complete (close) a room
    if (!req.params.room) {
        return res.sendStatus(406).send({ "result": "expected room" });
    }
    const room = req.params.room;
    client.video.rooms(room)
        .update({ status: 'completed' })
        .then(room => res.send(room), res.send({ "result": "error" }));
}

function getRooms(req, res) {
    client.video.rooms.list()
        .then(rooms => res.send(rooms));
}

function getCompletedRooms(req, res) { // retrieve all completed rooms
    client.video.rooms.list({ status: 'completed' })
        .then(rooms => res.send(rooms), res.send({ "result": "error" }));
}

function getIPRooms(req, res) {
    client.video.rooms.list({ status: 'in-progress' })
        .then(rooms => res.send(rooms), res.send({ "result": "error" }));
}

function getRoomByName(req, res) { // get room by name
    if (!req.params.room) {
        return res.sendStatus(406).send({ "result": "expected name" });
    }
    const room = req.params.room;
    client.video.rooms.list({ uniqueName: room })
        .then(rooms => res.send(rooms), res.send({ "result": "error" }));
}

module.exports = {
    createRoom,
    closeRoom,
    getRooms,
    getCompletedRooms,
    getIPRooms,
    getRoomByName
}