const electron = require('electron');
const video = require('twilio-video');
const http = require('http');

electron.desktopCapturer.getSources({types: ['screen']}).then(function (sources) {
    let using = null;
    for (let source of sources) {
        console.log(source);
        using = source;
    }

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: using.id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
            }
        }
    }).then(function (stream) {
        console.log(stream);

        // Create room
        var createOptions = {
            hostname: '127.0.0.1',
            port: 3000,
            method: 'POST',
            path: '/room/create/test',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var req = http.request(createOptions, function (res) {
            var combined = '';
            res.on('data', function (data) {
                combined += data;
            });

            res.on('end', function () {
                combined = JSON.parse(combined);
                console.log(combined);
                var sid = combined.room.sid;
                var userOptions = {
                    hostname: '127.0.0.1',
                    port: 3000,
                    method: 'POST',
                    path: '/room/' + sid + '/token/create/test-user',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                var userReq = http.request(userOptions, function (userRes) {
                    var combined = '';
                    userRes.on('data', function (data) {
                        combined += data;
                    });

                    userRes.on('end', function () {
                        combined = JSON.parse(combined);
                        console.log(combined);

                        var token = combined.token;
                        var track = new video.LocalVideoTrack(stream.getVideoTracks()[0]);
                        console.log(token);
                        video.connect(token, {
                            name: 'test',
                            tracks: [track]
                        }).then(function (room) {
                            console.log(room);
                        }, function (error) {
                            console.log(error);
                        });

                        document.getElementById('video-div').appendChild(track.attach());
                    });
                });

                userReq.end();
            });
        });

        req.end();
    });
});