const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const electronApp = require('./app');

const router = require('./router');

server_url = '';

if (process.env.server !== undefined) {
    server_url = app.env.server;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/', router);

app.listen(5555, () => console.log("live"));