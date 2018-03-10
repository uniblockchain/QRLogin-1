// io.on('connection', ...our function goes here)
const cookieLib = require('cookie');

function onConnection(socket) {
  let cookie = cookieLib.parse(socket.handshake.headers.cookie)
  const io = socket.server
  const connectSid = cookie['connect.sid']

  // info for debugging
  console.log(`Connection made: ${JSON.stringify({
    isMobile: socket.handshake.headers['user-agent'].toLowerCase().search('mobile') !== -1,
    'connect.sid': connectSid,
    socketid: socket.id
  })}`);


  // Event receivers
  socket.on('browser qrcode ready', (qrcode_str) => {
    socket.join(qrcode_str) // connect.sid
  })

  socket.on('device scanning done', (qrcode_str, loginId) => {
    socket.join(qrcode_str)
    socket.broadcast.to(qrcode_str).emit('browser-device connected', qrcode_str, loginId)
  })

}

module.exports = onConnection;
