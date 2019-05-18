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
  xhr.open("POST", "https://visitors-81f7.restdb.io/rest/pictures");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", "5ce02e8d780a473c8df5c93c");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.send(payload);
};

getAllImages = () => {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  xhr.open("GET", "https://visitors-81f7.restdb.io/rest/pictures");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", "5ce02e8d780a473c8df5c93c");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.send(null);
};

getAllImages();
