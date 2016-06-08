var _serverMsg = function(msg, depth) {
    var tab = 4;
    var spacer = '';
    for (var i = 0; i < tab * depth; i++) {
        spacer += ' ';
    }
    console.log('[SERVER] ' + spacer +  msg);
}


_serverMsg('node.js is initializing');
/*****************************************************
 ************* DEPENDENCY INITIALIZATION *************
 *****************************************************/

var express = require('express');
_serverMsg(' Loaded express.', 1);

var app = express();
var http = require('http').Server(app);

var io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })(http);
_serverMsg('Loaded socket.io.', 1);

var Firebase = require('firebase');
var firebaseConfig = {
    serviceAccount: "data/key.json",
    databaseURL: "https://nwmun-shirt.firebaseio.com",
};
Firebase.initializeApp(firebaseConfig);
var db = Firebase.database();
var rawShirts = db.ref('rawShirts')
_serverMsg('Loaded Firebase', 1);

_serverMsg('Server loading complete.');
/*****************************************************
 **************** FIREBASE  DATABASES ****************
 *****************************************************/
http.listen(3000, function () {
    _serverMsg('Server is now listening on *:3000');
});

/*****************************************************
 **************** SOCKET  CONNECTIONS ****************
 *****************************************************/
io.sockets.on('connection', function (socket) {
    // Log when user connects
    _serverMsg('[SOCKET] User has connected: ' + socket.id, 0);

    socket.on('submitShirts', function (shirtsObj) {
        rawShirts.push().set(shirtsObj).then(function success() {
            console.log('promise');
            socket.emit('submitSuccess');
        });
    });

    socket.on('getData', function() {
        var rawData = {};
        /*rawShirts.on('value', function(response) {
            rawData = response.val();
        }).then(function success() {
            console.log(Object.keys(rawData));
        });*/

        rawShirts.once('value').then(function success(response) {
            _serverMsg('[SOCKET] Received request for raw data.', 0)
            var rawData = response.val();
            _serverMsg('[SOCKET] Received data.', 1)
            var keys = Object.keys(rawData);
            var colorKeys = Object.keys(rawData[keys[0]]);

            // Removes User
            var userPos = colorKeys.indexOf('user');
            colorKeys.splice(userPos, 1);

            var jsonData = {};
            _serverMsg('[SOCKET] Parsing data.', 1)

            keys.map(function(key) {
                var user = rawData[key].user;
                jsonData[user] = {};
                colorKeys.map(function(color) {
                    var fullColor = rawData[key][color].color;
                    jsonData[user][fullColor] = rawData[key][color].rating;
                })
            })

            socket.emit('returnData', JSON.stringify(jsonData));
            _serverMsg('[SOCKET] Returning to client.', 0)
        });
    });

    // Log when user disconnects
    socket.on('disconnect', function () {
        _serverMsg('[SOCKET] User has disconnected: ' + socket.id, 0);
    });


});

