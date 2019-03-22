const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

const LISTEN_PORT = 8080; 

app.use((express.static(__dirname + '/public')));

app.get('/Player', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');

});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');

});

socketIO.on('connection',function(socket) {
    console.log( socket.id + ' has connected to port' );

    socket.on('disconnect', function(data){
        console.log( socket.id + ' has disconnect to port' );
    });

    socket.on('text' , function(data){
        console.log('text event');
        socketIO.sockets.emit('text_change',data);
    });


});


const gameState = {
    players: {}
  }


server.listen(LISTEN_PORT);
console.log('listening to port' + LISTEN_PORT);