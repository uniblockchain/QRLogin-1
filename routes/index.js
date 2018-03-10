var express = require('express');
var router = express.Router();
const QRCode = require('qrcode')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('browser/index', { cookies: JSON.stringify(req.cookies) });
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
  const loginId = req.query.loginId;
  res.render('browser/dashboard', { loginId })
})

module.exports = router;
