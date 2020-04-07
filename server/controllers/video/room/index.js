const { client } = require('../../../twilio');

function createRoom(req, res) { // create a room
    const room = req.query.room;
    client.video.rooms.create({ uniqueName: room })
        .then(room => res.send(room));
}

function closeRoom(req, res) { // complete (close) a room
    const room = req.query.room;
    client.video.rooms(room)
        .update({ status: 'completed' })
        .then(room => res.send(room));
}

function getCompletedRooms(req, res) { // retrieve all completed rooms (which should be all rooms)
    client.video.rooms.list({ status: 'completed' })
        .then(rooms => res.send(rooms));
}

function getRoomsByName(req, res) { // get rooms by name
    client.video.rooms.list({ uniqueName: req.body.name })
        .then(rooms => res.send(rooms));
}

module.exports = {
    createRoom,
    closeRoom,
    getCompletedRooms,
    getRoomsByName
}