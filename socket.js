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

  socket.on('page login qrcode ready', (data) => {
    console.log(`page login qrcode ready: ${data}`);

    socket.join(data)
  })

  socket.on('scanned something', (data) => {
    console.log(`scanned something: ${data}`);

    socket.join(data)
    socket.broadcast.to(data).emit('gotcha', socket_connect_sid)
  })

}

module.exports = onConnection;
