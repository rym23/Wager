'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('send-names', (names) => {
    io.emit('names', names);    
  });

  socket.on('send-command', (command) => {
    io.emit('command', command);    
  });

});

http.listen(5000, () => {
  console.log('started on port 5000');
});
