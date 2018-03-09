var express = require('express');
var router = express.Router();
const QRCode = require('qrcode')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QRLogin' });
});

router.get('/scanner', (req, res, next) => {
  res.render('scanner')
})

router.get('/loginID', (req, res, next) => {
  let qrcode_url;
  let loginID = 654321
  const targetUrl = req.protocol + '://' + req.headers.host + '?' + loginID
  QRCode.toDataURL(targetUrl, { errorCorrectionLevel: 'H', width: 300 }, function (err, url) {
    qrcode_url = url
    res.render('loginID', { qrcode_url, loginID })
  })
})

router.get('/userPage', (req, res, next) => {
  res.render('userPage')
})

module.exports = router;
