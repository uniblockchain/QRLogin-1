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
  let loginID = 654321
  res.render('loginID', { loginID })
})

router.get('/userPage', (req, res, next) => {
  res.render('userPage')
})

module.exports = router;
