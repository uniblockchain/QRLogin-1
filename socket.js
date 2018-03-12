// io.on('connection', ...our function goes here)
const cookieLib = require('cookie');

function onConnection(socket) {
  
  // Event receivers
  socket.on('browser qrcode ready', (roomId) => {
    console.log('browser qrcode ready');
    socket.join(roomId)
  })

  socket.on('device scanning done', (roomId, loginId) => {
    console.log('device scanning done');
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('browser-device connected', roomId, loginId)
  })

}

module.exports = onConnection;
