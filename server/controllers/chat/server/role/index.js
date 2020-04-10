const { client } = require('../../../../helpers/twilio');

function createRole(req, res) {
    if (!req.params.serverSid || !req.body.friendlyName || !req.body.type || !req.body.permissionArray) {
        return res.status(406).send({ "result": "expected serverSid and friendlyName and type and permissionArray" });
    }
    const serverSid = req.params.serverSid;
    const friendlyName = req.body.friendlyName;
    const type = req.body.type;
    const permissionArray = req.body.permissionArray;
    if (!permissionArray.isArray()) {
        return res.status(406).send({ "result": "expected permissionArray as an array " });
    }
    client.chat.services(serverSid)
        .roles
        .create({
            friendlyName: friendlyName,
            type: type,
            permission: permissionArray
        })
        .then(role => res.send({ "result": "success", role }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getRole(req, res) {
    if (!req.params.serverSid || !req.params.roleSid) {
        return res.status(406).send({ "result": "expected serverSid and roleSid" });
    }
    const serverSid = req.params.serverSid;
    const roleSid = req.params.roleSid;
    client.chat.services(serverSid)
        .roles(roleSid)
        .fetch()
        .then(role => res.send({ "result": "success", role }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getRoles(req, res) {
    if (!req.params.serverSid) {
        return res.status(406).send({ "result": "expected serverSid" });
    }
    const serverSid = req.params.serverSid;
    client.chat.services(serverSid)
        .roles
        .list()
        .then(roles => res.send({ "result": "success", roles }))
        .catch(err => res.send({ "result": "error", "error": err }))
}

function updateRole(req, res) {
    if (!req.params.serverSid || !req.params.roleSid || !req.body.permissionArray) {
        return res.status(406).send({ "result": "expected serverSid and roleSid and permissionArray" });
    }
    const serverSid = req.params.serverSid;
    const roleSid = req.params.roleSid;
    const permissionArray = req.body.permissionArray;
    if (!permissionArray.isArray()) {
        return res.status(406).send({ "result": "expected permissionArray as an array " });
    }
    client.chat.services(serverSid)
        .roles(roleSid)
        .update({ permission: permissionArray })
        .then(role => res.send({ "result": "success", role }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function deleteRole(req, res) {
    if (!req.params.serverSid || !req.params.roleSid) {
        return res.status(406).send({ "result": "expected serverSid and roleSid" });
    }
    const serverSid = req.params.serverSid;
    const roleSid = req.params.roleSid;
    client.chat.services(serverSid)
        .roles(roleSid)
        .remove()
        .then(res.send({ "result": "success" }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getPermissionValues(req, res) {
    res.send({
        "result": "success",
        "serverScope": {
            "addMember": "Add other users as members of a channel",
            "createChannel": "Create new channels",
            "deleteAnyMessage": "Delete any message in the server",
            "destroyChannel": "Delete channels",
            "editAnyMessage": "Edit any message in the server",
            "editAnyMessageAttributes": "Edit any message attributes in the server",
            "editAnyUserInfo": "Edit other user's User Info properties",
            "editChannelAttributes": "Update the optional attributes metadata field on a channel",
            "editChannelName": "Change the name of a channel",
            "editOwnMessage": "Edit their own messages in the server",
            "editOwnMessageAttributes": "Edit the own message attributes in the server",
            "editOwnUserInfo": "Edit their own User Info properties",
            "inviteMember": "Invite other users to be members of a channel",
            "joinChannel": "Join channels",
            "removeMember": "Remove members from a channel",
        },
        "channelScope": {
            "addMember": "Add other users as members of a channel",
            "deleteAnyMessage": "Delete any message in the server",
            "deleteOwnMessage": "Delete their own messages in the server",
            "destroyChannel": "Delete channels",
            "editAnyMessage": "Edit any message in the server",
            "editAnyMessageAttributes": "Edit any message attributes in the server",
            "editAnyUserInfo": "Edit other user's User Info properties",
            "editChannelAttributes": "Update the optional attributes metadata field on a channel",
            "editChannelName": "Change the name of a channel",
            "editOwnMessage": "Edit their own messages in the server",
            "editOwnMessageAttributes": "Edit their own message attributes in a server",
            "editOwnUserInfo": "Edit their own User Info properties",
            "inviteMember": "Invite other users to be members of a channel",
            "leaveChannel": "Leave a channel",
            "removeMember": "Remove members from a channel",
            "sendMediaMessage": "Send media messages to channels",
            "sendMessage": "Send messages to channels"
        }
    })
}

module.exports = {
    createRole,
    getRole,
    getRoles,
    updateRole,
    deleteRole,
    getPermissionValues
}