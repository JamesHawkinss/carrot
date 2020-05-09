const express = require('express');
const router = express.Router();

const Video = require('twilio-video');

router.get('/', function (req, res) {
    res.render('index', { title: 'Index' });
});

module.exports = router;