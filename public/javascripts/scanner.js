(function() {
  var int = setInterval(function () {
    if (window.QRLogin) {
      clearInterval(int)
      var QRLogin = window.QRLogin


      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return ('mediaDevices / getUserMedia not available in your browser')
      }

      var socket = window.QRLogin.socket

      var width = window.innerWidth * 2/3;    // We will scale the photo width to this
      var height = 0;     // This will be computed based on the input stream

      var streaming = false;

      var video = null;
      var canvas = null;
      var photo = null;
      var startbutton = null;

      var deviceId = null;

      function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
          .then(function (stream) {
            video.srcObject = stream;

            function sleep(ms = 0) {
              return new Promise(r => setTimeout(r, ms));
            }

            sleep(1000).then(function () {
              const rangeInput = document.querySelector('input[type="range"]');
              const track = stream.getVideoTracks()[0];
              const capabilities = track.getCapabilities();
              if ('zoom' in capabilities) {
                track.applyConstraints({advanced: [ {zoom: capabilities.zoom.max *0.75 } ]});
              }
              if ('focusMode' in capabilities) {
                track.applyConstraints({advanced: [ {focusMode: 'continuous'} ]});
              }
            });
          })
          .catch(function(err) {
              alert(err);
          });

        // sizing the video and canvas tag once according to stream
        video.addEventListener('canplay', function(ev){
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth/width);

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;

            searchQRcode();
          }
        }, false);
      } // startup end


      function searchQRcode() {
        var context = canvas.getContext('2d');
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);
          var data = canvas.toDataURL('image/png');

          qrcode.callback = function (res) {
            if (res instanceof Error) {
              // alert('failed');
              return searchQRcode()
            } else {
              $("#status").text("Scan Success")
              socket.emit('device scanning done', res, parseQueryString(location).loginId)
            }
          }

          qrcode.decode(data);
        }
      } // searchQRcode end


      startup()

    }
  });

  // utils
  function parseQueryString( location ) {
    var queryString = location.search.substring(1);
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
  };
})()
