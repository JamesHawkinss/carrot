const express = require('express');
const router = express.Router();

const roomController = require('./controllers/video/room');
const participantController = require('./controllers/video/room/participants');

router.get('/rooms', roomController.getCompletedRooms);
router.post('/rooms', roomController.getRoomsByName);
router.post('/room/create/:room', roomController.createRoom);
router.delete('/room/:room/close', roomController.closeRoom);

router.get('/room/:room/participant/:participant', participantController.getParticipant);
router.get('/room/:room/connected', participantController.getConnectedParticipants);
router.patch('/room/:room/participant/:participant', participantController.disconnectParticipant);

router.get('/', function(req, res) {
    return res.status(204);
})

module.exports = router;