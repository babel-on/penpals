
const socket = io => {
  io.on('connection', client => {
    console.log('New Connection');
 
    // socket event for client subscription
    client.on('subscribeToDateEvent', interval => {
      console.log('Client is subscribing with interval: ', interval);
 
      // emit message to the client side
      setInterval(() => {
        client.emit('getDate', new Date().toUTCString());
      }, interval);
    });
  });
}
/*
const users = {};

socket.on('new-user', name => {
  users[socket.id] = name;
  socket.broadcast.emit('user-connected', name);
})
socket.on('send-chat-message', message => {
  socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
})
socket.on('disconnect', () => {
  socket.broadcast.emit('user-disconnected', users[socket.id])
  delete users[socket.id]
})
  */
module.exports = socket;