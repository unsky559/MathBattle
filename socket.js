
module.exports.listen = (server) => {
  const io = require('socket.io')(server);
  
  io.on('connection', socket => {
    console.log('new connection, socket.id: ', socket.id);

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    socket.on('Hi', () => {
      console.log('hello world');
    });
  });
  return io;
}