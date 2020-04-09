const config = require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(config.server.port, () => console.log("live"));