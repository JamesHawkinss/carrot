const { client } = require('../../../twilio');
const config = require('../../../config/config');

const serviceId = config.twilio.services.dev;

function createUser(req, res) {
    const id = req.body.id; // our user id
    const friendlyName = req.body.friendlyName;
    const email = req.body.email; // stored as an attribute
    client.chat.services(serviceId)
        .users
        .create({
            identity: id,
            friendlyName: friendlyName,
            attributes: {
                email: email
            }
        })
        .then(user => res.send(user));
}

function getUsers(req, res) {
    client.chat.services(serviceId)
        .users
        .list()
        .then(users => res.send(users));
}

function getUser(req, res) {
    const id = req.params.id;
    client.chat.services(serviceId)
        .users(id)
        .fetch()
        .then(user => res.send(user));
}

// handle update user

function deleteUser(req, res) {
    const id = req.params.id;
    client.chat.services(serviceId)
        .users(id)
        .remove()
        .then(res.send('deleted'));
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser
}