const { client } = require('../../../../../helpers/twilio');
const db = require('../../../../../helpers/db');

function createMember(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.params.userId) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and userId" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const userId = req.params.userId;
    db.query({
        sql: 'SELECT * FROM users WHERE id=(?)',
        values: [userId]
    }, function (err, results) {
        if (err) return res.send({ "result": "database error", err });
        if (results.length == 0) {
            return res.send({ "result": "error" })
        }
        const identity = results[0].username;
        client.chat.services(serverSid)
            .channels(channelSid)
            .members
            .create({ identity: identity })
            .then(member => res.send({ "result": "success", member }))
            .catch(err => res.send({ "result": "error", "error": err }));
    });
}

function getMember(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.params.memberSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and memberSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const memberSid = req.params.memberSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .members(memberSid)
        .fetch()
        .then(member => res.send({ "result": "success", member }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function getMembers(req, res) {
    if (!req.params.serverSid || !req.params.channelSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and memberSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .list()
        .then(members => res.send({ "result": "success", members }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

function deleteMember(req, res) {
    if (!req.params.serverSid || !req.params.channelSid || !req.params.memberSid) {
        return res.sendStatus(406).send({ "result": "expected serverSid and channelSid and memberSid" });
    }
    const serverSid = req.params.serverSid;
    const channelSid = req.params.channelSid;
    const memberSid = req.params.memberSid;
    client.chat.services(serverSid)
        .channels(channelSid)
        .members(memberSid)
        .remove()
        .then(res.send({ "result": "success" }))
        .catch(err => res.send({ "result": "error", "error": err }));
}

module.exports = {
    createMember,
    getMember,
    getMembers,
    deleteMember
}