const express = require('express');
const router = express.Router();

const roomController = require('./controllers/video/room');
const participantController = require('./controllers/video/room/participants');
const channelController = require('./controllers/chat/channel');
const userController = require('./controllers/chat/user');

router.get('/rooms', roomController.getRooms);
router.get('/rooms/completed', roomController.getCompletedRooms);
router.get('/rooms/:room', roomController.getRoomByName);
router.post('/room/create/:room', roomController.createRoom);
router.patch('/room/:room/close', roomController.closeRoom);

router.get('/room/:room/participant/:participant', participantController.getParticipant);
router.get('/room/:room/connected', participantController.getConnectedParticipants);
router.patch('/room/:room/participant/:participant', participantController.disconnectParticipant);

router.get('/channels', channelController.getChannels);
router.get('/channel/:sid', channelController.getChannel);
router.post('/channel/create/:name', channelController.createChannel);
router.delete('/channel/:sid/delete', channelController.deleteChannel);

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/user/create', userController.createUser);
router.delete('/user/:id/delete', userController.deleteUser);

router.get('/', function(req, res) {
    return res.sendStatus(204);
})

module.exports = router;