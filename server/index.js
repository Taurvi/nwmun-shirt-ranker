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

var io = require('socket.io')(http);
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
    _serverMsg('[SOCKET] User has connected: ' + socket.id);

    socket.on('submitShirts', function (shirtsObj) {
        rawShirts.push().set(shirtsObj);
    });

    // Log when user disconnects
    socket.on('disconnect', function () {
        _serverMsg('[SOCKET] User has disconnected: ' + socket.id);
    });
});

