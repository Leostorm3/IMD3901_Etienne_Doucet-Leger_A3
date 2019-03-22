let socket = io();

var sessionid;


const scene = document.querySelector('a-scene');
//here is a premade function to generate a player on the terrain
const GeneratePlayer = function(player) {

    
        //here we check if its the player the joined in if yes we are makibg a cam to follow
   
        let Char = document.createElement('a-entity');//create new element
            Char.setAttribute('geometry',  "primitive: box" );
            Char.setAttribute('position',player.x + " " + player.y + " " + player.z);
            Char.setAttribute('scale',1 + " " + 1 + " " + 1);
            Char.setAttribute('material',"color"+ colorgen());
            Char.setAttribute('id',player.name);
            scene.appendChild(Char);
                      

};

const MoveUser = function(player){
    let User = document.getElementById(player.name);
    User.setAttribute('position',player.x + " " + player.y + " " + player.z);

}
const deleteUser = function(id){
    let User = document.getElementById(id);
    User.parentNode.removeChild(User);

}


var PlayerMove = {
    up: false,
    down: false,
    left: false,
    right: false
  }

  function generationNumber255() {
    return (Math.floor(Math.random() * 255));
}

  function colorgen(){
    return (generationNumber255() + " " + generationNumber255() + " " + generationNumber255());


  }

  function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};


  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
      PlayerMove.left = true;
        break;
      case 87: // W
      PlayerMove.up = true;
        break;
      case 68: // D
      PlayerMove.right = true;
        break;
      case 83: // S
      PlayerMove.down = true;
        break;
    }
  });
  document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 65: // A
      PlayerMove.left = false;
        break;
      case 87: // W
      PlayerMove.up = false;
        break;
      case 68: // D
      PlayerMove.right = false;
        break;
      case 83: // S
      PlayerMove.down = false;
        break;
    }
  });

socket.emit('PlayerJoining');
setInterval(function(){
    socket.emit('move', PlayerMove);
  }, 1000 / 60);

socket.on('state', function(gameState){
    //console.log(gameState.players);
    console.log(sessionid);
   
        for (var id in gameState.players) {
        var element = document.getElementById(gameState.players[id].name);
        if(element == null ){
        var player = gameState.players[id];
        GeneratePlayer(player);
        }
    }
    
        for (var id in gameState.players) {
            var player = gameState.players[id];
            MoveUser(player);
    
    }
  });


  socket.on('delete_user', function(data){
    deleteUser(data);
  });

  
socket.on('connect', function() {
   sessionid = socket.id; 
   console.log(sessionid);
});