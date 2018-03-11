// io.on('connection', ...our function goes here)
const cookieLib = require('cookie');

function onConnection(socket) {


  const io = socket.server
  let cookie = cookieLib.parse(socket.handshake.headers.cookie)
  const connectSid = cookie['connect.sid']

  // info for debugging
  console.log(`Connection made: ${JSON.stringify({
    isMobile: socket.handshake.headers['user-agent'].toLowerCase().search('mobile') !== -1,
    'connect.sid': connectSid,
    socketid: socket.id
  })}`);


  // Event receivers
  socket.on('browser qrcode ready', (qrcode_str) => {
    console.log('browser qrcode ready');
    socket.join(qrcode_str)
    io.in(qrcode_str).clients((error, clients) => {
      if (error) throw error
      console.log(clients);
    })
  })

  socket.on('device scanning done', (qrcode_str, loginId) => {
    console.log('device scanning done');
    socket.join(qrcode_str)
    socket.broadcast.to(qrcode_str).emit('browser-device connected', qrcode_str, loginId)

    console.log('after connected update session');
    socket.request.session.roomId = qrcode_str
    socket.request.session.loginId = loginId
    console.log(socket.request.session);
  })

}

module.exports = onConnection;
