const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

const LISTEN_PORT = 8080; 

app.use((express.static(__dirname + '/public')));

app.get('/color', function(req,res) {
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


    socket.on('red' , function(data){
        console.log('red event');
        socketIO.sockets.emit('color_change', {r:255,g:0,b:0});
    });

    socket.on('blue' , function(data){
        console.log('blue event');
        socketIO.sockets.emit('color_change', {r:0,g:0,b:255});
    });

    socket.on('green' , function(data){
        console.log('green event');
        socketIO.sockets.emit('color_change', {r:0,g:255,b:0});
    });
    socket.on('text' , function(data){
        console.log('text event');
        socketIO.sockets.emit('text_change',data);
    });


});

server.listen(LISTEN_PORT);
console.log('listening to port' + LISTEN_PORT);