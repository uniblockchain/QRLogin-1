var express = require('express');
var router = express.Router();
const QRCode = require('qrcode')


/* GET home page. */
router.get('/', function(req, res, next) {
  let roomId = req.session.roomId
  if (!roomId) {
    generateRoomId(0, 9, 6).then((roomId) => {
      req.session.roomId = roomId
      res.render('browser/registerBrowser', { roomId: req.session.roomId, session: JSON.stringify(req.session) });
    })
  } else {
    res.render('browser/registerBrowser', { roomId: req.session.roomId, session: JSON.stringify(req.session) });
  }
});

router.get('/loginId', (req, res, next) => {
  let loginId = 654321
  res.render('loginId', { loginId })
})

router.get('/scanBrowser', (req, res, next) => {
  const loginId = req.query.loginId
  res.render('device/scanner', { loginId })
})

router.get('/dashboard', (req, res, next) => {
  const { roomId, loginId } = req.session
  res.render('browser/dashboard', { roomId, loginId })
})

router.post('/updateSess', (req, res, next) => {
  const { roomId, loginId } = req.body
  req.session.roomId = roomId
  req.session.loginId = loginId
  res.status(200).send('updateSess ok')
})

module.exports = router;


// utils
function generateRoomId(min, max, roomIdLength) {
  if(!min) min = 0
  if(!max) max = 9
  if(!roomIdLength) roomIdLength = 4
  min = Math.ceil(min);
  max = Math.floor(max);
  var tmpArr = []
  for (var i = 0; i < roomIdLength; i++) {
    tmpArr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Promise.resolve(tmpArr.join(''))
}
