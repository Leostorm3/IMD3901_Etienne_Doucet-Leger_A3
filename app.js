const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);

const LISTEN_PORT = 8080; 
//we are gonna make a basic class of info for our plauyer
const gameState = {
    players: {}
  }

  

app.use((express.static(__dirname + '/public')));

app.get('/PlayerDesktop', function(req,res) {
    res.sendFile(__dirname + '/public/desktop.html');

});

app.get('/Phone', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');

});

socketIO.on('connection',function(socket) {
    console.log( socket.id + ' has connected to port' );
    

    socket.on('PlayerJoining', function(data){
        gameState.players[socket.id] = {
          x: 0,
          y: 0.5,
          z: -5,
          width: 25,
          height: 25,
          energy:100,
          name:socket.id
          
        };
      });


      socket.on('move', function(data) {
        var player = gameState.players[socket.id] || {};
        if (data.left) {
          player.x -= 0.1;
        }
        if (data.up) {
          player.z -= 0.1;
        }
        if (data.right) {
          player.x += 0.1;
        }
        if (data.down) {
          player.z += 0.1;
        }
      });
    

    socket.on('disconnect', function(data){
        socketIO.sockets.emit('delete_user', gameState.players[socket.id].name);
        delete gameState.players[socket.id];
        console.log( socket.id + ' has disconnect to port' );
    });

        
});
//we send to all server the updates of the game to make sure all players are created in the world
setInterval(function(){
    socketIO.sockets.emit('state', gameState);
  }, 1000 / 60);





server.listen(LISTEN_PORT);
console.log('listening to port' + LISTEN_PORT);