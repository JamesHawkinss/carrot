const config = require('./config/config');
const express = require('express');
const app = express();

const { client } = require('./twilio');

app.listen(config.port, () => console.log("live"));