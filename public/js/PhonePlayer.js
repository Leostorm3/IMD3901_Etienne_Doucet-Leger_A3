let socket = io();


 document.querySelector('#submit').addEventListener('click',function(){
        console.log("test");
 
         socket.emit('text',{textdata:document.querySelector("#text").value});
         document.querySelector("#text").value = " ";
 });

 
 



