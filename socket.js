// io.on('connection', ...our function goes here)
const cookieLib = require('cookie');

function onConnection(socket) {
  let cookie = cookieLib.parse(socket.handshake.headers.cookie)
  const io = socket.server
  console.log(socket.server);

  // console.log(`Connection made: ${JSON.stringify({
  //   isMobile: socket.handshake.headers['user-agent'].toLowerCase().search('mobile') !== -1,
  //   sid: cookie['connect.sid'],
  //   socketid: socket.id
  // })}`);

  io.sockets.emit('test io', 'test io')
}

module.exports = onConnection;
