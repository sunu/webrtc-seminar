// Let's get vendor prefixes out of our way first.
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

// Get the video element
var video = document.getElementById("video");

// Request video stream from webcam
// We are mainly interested in this part.
window.navigator.getUserMedia({
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    }
  },
  function(stream) {
    video.src = window.URL.createObjectURL(stream);
  }, function(error) {
    console.log("navigator.getUserMedia error: ", error);
  }
);

// start video on clicking start button
var start = document.getElementById("start");
start.onclick = function() {
  video.play()
};

// Pause video on clicking stop button
var stop = document.getElementById("stop");
stop.onclick = function() {
  video.pause();
};

// Save a photo
var takephoto = document.getElementById("takephoto");
takephoto.onclick = function() {
  var img = canvas.toDataURL("image/png");
  window.open(img);
};

// Create the canvas element and set attrs
var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 360;
var candiv = document.getElementById('canvas');
candiv.appendChild(canvas);
var ctx = canvas.getContext('2d');
ctx.fillStyle = "#010101";
ctx.font = "bold 20px monospace";
ctx.textAlign = "center";
ctx.fillText("Please allow the page to use your webcam.", canvas.width / 2, canvas.height / 2);

var rafId;

function drawVideoFrame(time) {
  rafId = requestAnimationFrame(drawVideoFrame);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
};

rafId = requestAnimationFrame(drawVideoFrame); // Note: not using vendor prefixes!