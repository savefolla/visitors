const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
  // Draw the video frame to the canvas.
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  postImage(canvas.toDataURL());
});

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  player.srcObject = stream;
});

postImage = (data) => {
    const payload = JSON.stringify({data});
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", `${window.location.href}images`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(payload);
};

getAllImages = () => {
  function reqListener() {
    console.log(this.responseText);
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = reqListener;
  xhr.open("GET", `${window.location.href}images`);
  xhr.send();
};

getAllImages();
