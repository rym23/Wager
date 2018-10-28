'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('join', (room) => {
    console.log('join', room);
    // joining 
    socket.join(room, function() {
        console.log(socket.rooms); 
    });
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('send-names', (id,names) => {
    socket.to(id).emit('names', names);  
  });

  socket.on('send-command', (id,command) => {
    socket.to(id).emit('command', command);
  });

});

http.listen(5000, () => {
  console.log('started on port 5000');
});
