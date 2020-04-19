const express = require('express');
const router = express.Router();
const handleAuth = require('helpers/auth');

const roomController = require('./controllers/video/room');
const participantController = require('./controllers/video/room/participants');
const userController = require('./controllers/user');
const authController = require('./controllers/user/auth');
const serverController = require('./controllers/chat/server');
const channelController = require('./controllers/chat/server/channel');
const inviteController = require('./controllers/chat/server/channel/invite');
const memberController = require('./controllers/chat/server/channel/member');
const messageController = require('./controllers/chat/server/channel/message');
const roleController = require('./controllers/chat/server/role');

router.get('/rooms', handleAuth, roomController.getRooms);
router.get('/rooms/completed', handleAuth, roomController.getCompletedRooms);
router.get('/rooms/in-progress', handleAuth, roomController.getIPRooms);
router.get('/room/:roomSid', handleAuth, roomController.getRoom);
router.post('/room/create/:name', handleAuth, roomController.createRoom);
router.delete('/room/:roomSid/close', handleAuth, roomController.closeRoom);

router.get('/room/:roomSid/participant/:participantSid', handleAuth, participantController.getParticipant);
router.get('/room/:roomSid/connected', handleAuth, participantController.getConnectedParticipants);
router.post('/room/:roomName/token/create/:identifier', handleAuth, participantController.createAccessToken);
router.patch('/room/:roomSid/participant/:participantSid', handleAuth, participantController.disconnectParticipant);

router.get('/users', handleAuth, userController.getUsers);
router.get('/user/:id', handleAuth, userController.getUser);
router.post('/user/create', userController.createUser);
router.delete('/user/:id/delete', handleAuth, userController.deleteUser);

router.post('/user/auth', authController.auth);

router.get('/chat/servers', handleAuth, serverController.getServers);
router.get('/chat/server/:serverSid', handleAuth, serverController.getServer);
router.post('/chat/server/create', handleAuth, serverController.createServer);
router.delete('/chat/server/:serverSid/delete', handleAuth, serverController.deleteServer);

router.get('/chat/server/:serverSid/channels', handleAuth, channelController.getChannels);
router.get('/chat/server/:serverSid/channel/:channelSid', handleAuth, channelController.getChannel);
router.post('/chat/server/:serverSid/channel/create', handleAuth, channelController.createChannel);
router.delete('/chat/server/:serverSid/channel/:channelSid/delete', handleAuth, channelController.deleteChannel);

router.get('/chat/server/:serverSid/channel/:channelSid/invites', handleAuth, inviteController.getInvites);
router.get('/chat/server/:serverSid/channel/:channelSid/invite/:inviteSid', handleAuth, inviteController.getInvite);
router.post('/chat/server/:serverSid/channel/:channelSid/invite/create', handleAuth, inviteController.createInvite);
router.delete('/chat/server/:serverSid/channel/:channelSid/invite/:inviteSid/delete', handleAuth, inviteController.deleteInvite);

router.get('/chat/server/:serverSid/channel/:channelSid/members', handleAuth, memberController.getMembers);
router.get('/chat/server/:serverSid/channel/:channelSid/member/:memberSid', handleAuth, memberController.getMember);
router.post('/chat/server/:serverSid/channel/:channelSid/member/create/:userId', handleAuth, memberController.createMember);
router.delete('/chat/server/:serverSid/channel/:channelSid/member/:memberSid/delete', handleAuth, memberController.deleteMember);

router.get('/chat/server/:serverSid/channel/:channelSid/messages', handleAuth, messageController.getMessages);
router.get('/chat/server/:serverSid/channel/:channelSid/message/:messageSid', handleAuth, messageController.getMessage);
router.post('/chat/server/:serverSid/channel/:channelSid/message/create', handleAuth, messageController.createMessage);
router.patch('/chat/server/:serverSid/channel/:channelSid/message/:messageSid/update', handleAuth, messageController.updateMessage);
router.delete('/chat/server/:serverSid/channel/:channelSid/message/:messageSid/delete', handleAuth, messageController.deleteMessage);

router.get('/chat/server/:serverSid/roles', handleAuth, roleController.getRoles);
router.get('/chat/server/:serverSid/role/:roleSid', handleAuth, roleController.getRole);
router.post('/chat/server/:serverSid/role/create', handleAuth, roleController.createRole);
router.patch('/chat/server/:serverSid/role/:roleSid/update', handleAuth, roleController.updateRole);
router.delete('/chat/server/:serverSid/role/:roleSid/delete', handleAuth, roleController.deleteRole);

router.get('/', function(req, res) {
    return res.sendStatus(204);
})

module.exports = router;