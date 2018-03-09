var express = require('express');
var router = express.Router();
const QRCode = require('qrcode')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('browser/index');
});

router.get('/loginID', (req, res, next) => {
  let loginID = 654321
  res.render('loginID', { loginID })
})

router.get('/scanBrowser', (req, res, next) => {
  const loginid = req.query.loginid
  res.render('device/scanner', { loginid })
})



router.get('/userPage', (req, res, next) => {
  res.render('browser/userPage')
})

module.exports = router;
