const twilio = require('twilio');
const config = require('./config.json');

const client = new twilio(config.accountSid, config.authToken);

module.exports = { client };
