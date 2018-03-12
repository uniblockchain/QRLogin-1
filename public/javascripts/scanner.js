(function() {
  var int = setInterval(function () {
    if (window.QRLogin) {
      clearInterval(int)
      var QRLogin = window.QRLogin
      var socket = window.QRLogin.socket

      var video = document.getElementById('video');
      startup(video, function (video) {
        searchQRcode(video, function (res) {
          $("#status").text("Scan Success")
          socket.emit('device scanning done', res, parseQueryString(location).loginId)
        });
      })
    }
  }); // interval end

  // utils
  function startup(video, onVideoReady) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return ('mediaDevices / getUserMedia not available in your browser')
    }

    var width = window.innerWidth * 2/3;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream
    var streaming = false;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play()

        // zooming
        setTimeout(function () {
          const rangeInput = document.querySelector('input[type="range"]');
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities();
          if ('zoom' in capabilities) {
            track.applyConstraints({advanced: [ {zoom: capabilities.zoom.max *0.75 } ]});
          }
          if ('focusMode' in capabilities) {
            track.applyConstraints({advanced: [ {focusMode: 'continuous'} ]});
          }
        }, 1000)
      })
      .catch(function(err) {
          alert(err);
      });

    // dimensioning the video and run callback
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        streaming = true;

        onVideoReady(video)
      }
    }, false);
  } // startup end

  function searchQRcode(video, successCb) {
    var canvas = document.createElement("canvas")
    var context = canvas.getContext('2d');
    var width = video.videoWidth
    var height = video.videoHeight

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');

    qrcode.callback = function (res) {
      if (res instanceof Error) {
        // alert('failed');
        $(canvas).remove()
        return searchQRcode(video, successCb)
      } else {
        $(canvas).remove()
        return successCb(res)
      }
    }

    qrcode.decode(data);
  }

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
