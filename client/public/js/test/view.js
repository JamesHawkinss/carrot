const http = require('http');
const video = require('twilio-video');

var roomInfo = {};
var interval = window.setInterval(function () {
    var getOptions = {
        hostname: '127.0.0.1',
        port: 3000,
        method: 'GET',
        path: '/rooms/in-progress'
    };

    var infoReq = http.request(getOptions, function (res) {
        var combined = '';
        res.on('data', function (data) {
            combined += data;
        });

        res.on('end', function () {
            combined = JSON.parse(combined);
            if (combined.rooms.length > 0) {
                window.clearInterval(interval);
                roomInfo = combined.rooms[0];
                console.log("found in-progress room")

                var sid = roomInfo.sid;
                var userOptions = {
                    hostname: '127.0.0.1',
                    port: 3000,
                    method: 'POST',
                    path: '/room/' + sid + '/token/create/test-user2',
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

                        var token = combined.token;
                        console.log(token);

                        video.connect(token, {
                            name: 'test',
                            audio: false,
                            video: false
                        }).then(function (room) {
                            console.log(room);
                            room.participants.forEach(function (participant) {
                                handleParticipant(participant);
                            });

                            room.once('participantConnected', function (participant) {
                                handleParticipant(participant)
                            });

                        }, function (error) {
                            console.log(error);
                        });
                    });
                });

                userReq.end();
            }
        });
    });

    infoReq.end();
}, 1000);

function handleParticipant(participant) {
    console.log('participant');
    participant.tracks.forEach(function (publication) {
        if (publication.isSubscribed) {
            const track = publication.track;
            handleSubscribed(track);
        }
    });

    participant.on('trackSubscribed', function (track) {
        handleSubscribed(track);
    });
}

function handleSubscribed(track) {
    console.log('subscribed');
    document.getElementById('video-div').appendChild(track.attach());
}