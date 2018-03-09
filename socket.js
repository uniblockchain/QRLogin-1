// io.on('connection', ...our function goes here)
const app = require('./app');
const cookieLib = require('cookie');

const callback = (socket) => {
  let cookie = cookieLib.parse(socket.handshake.headers.cookie)

  // console.log(`Connection made: ${JSON.stringify(socket.handshake.headers)}`);
  console.log(`Connection made: ${JSON.stringify({
    isMobile: socket.handshake.headers['user-agent'].toLowerCase().search('mobile') !== -1,
    sid: cookie['connect.sid'],
    socketid: socket.id
  })}`);
};

module.exports = callback;
