const QRCode = require('qrcode')

let urlToCanvas;
urlToCanvas = location.protocol + '//' + location.host + '?token=1234'
console.log(urlToCanvas);

QRCode.toCanvas($('#qrcode_canvas')[0], urlToCanvas, { errorCorrectionLevel: 'H' }, function (err, canvas) {
  if (err) return console.log(err);
  console.log(canvas);
})
