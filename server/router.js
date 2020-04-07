const express = require('express');
const router = express.Router();

const roomController = require('./controllers/video/room');
const participantController = require('./controllers/video/room/participants');
const channelController = require('./controllers/chat/channel');

router.get('/rooms', roomController.getRooms);
router.get('/rooms/completed', roomController.getCompletedRooms);
router.get('/rooms/:room', roomController.getRoomByName);
router.post('/room/create/:room', roomController.createRoom);
router.patch('/room/close/:room', roomController.closeRoom);

router.get('/room/:room/participant/:participant', participantController.getParticipant);
router.get('/room/:room/connected', participantController.getConnectedParticipants);
router.patch('/room/:room/participant/:participant', participantController.disconnectParticipant);

router.get('/channels', chatController.getChannels);
router.get('/channel/:sid', chatController.getChannel);
router.post('/channel/create/:name', chatController.createChannel);
router.delete('/channel/:sid/delete', chatController.deleteChannel);

router.get('/', function(req, res) {
    return res.sendStatus(204);
})

module.exports = router;