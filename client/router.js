const express = require('express');
const router = express.Router();

const Video = require('twilio-video');

router.get('/stream', function (req, res) { // TODO move these methods to handler
    console.log("Stream");
    res.send("WIP <script src='/js/electron.js'></script>");
});

router.get('/view', function (req, res) {

});

module.exports = router;