const config = require('./config');

const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

module.exports = { client };
