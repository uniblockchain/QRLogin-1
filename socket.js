// io.on('connection', ...our function goes here)
const cookieLib = require('cookie');

function onConnection(socket) {
  let cookie = cookieLib.parse(socket.handshake.headers.cookie)
  const io = socket.server
  const socket_connect_sid = cookie['connect.sid']

  console.log(`Connection made: ${JSON.stringify({
    isMobile: socket.handshake.headers['user-agent'].toLowerCase().search('mobile') !== -1,
    'connect.sid': socket_connect_sid,
    socketid: socket.id
  })}`);

  socket.on('browser login qrcode ready', (qrcode_str) => {
    socket.join(qrcode_str)
  })

  socket.on('device scanning done', (qrcode_str) => {
    socket.join(qrcode_str)
    socket.broadcast.to(qrcode_str).emit('browser-device connected', '')
  })

}

module.exports = onConnection;
