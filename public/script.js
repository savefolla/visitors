const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const uploadYoursButton = document.getElementById('upload-yours');
const background = document.getElementById('random-image');
const yourImage = document.getElementById('your-image');

uploadYoursButton.addEventListener('click', () => {
  background.style.display = 'none';
  yourImage.style.display = 'block';
  navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
    player.srcObject = stream;
  });
});

captureButton.addEventListener('click', () => {
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  context.drawImage(player, 0, 0, player.videoWidth, player.videoHeight);
  postImage(canvas.toDataURL());
  getImage();
});

postImage = (data) => {
  const payload = JSON.stringify({data});
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("POST", `${window.location.href}images`);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(payload);
};

getImage = () => {
  function reqListener() {
    background.style.backgroundImage = `url(${JSON.parse(this.responseText).data})`;
    background.style.display = 'block';
    yourImage.style.display = 'none';
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = reqListener;
  xhr.open("GET", `${window.location.href}images`);
  xhr.send();
};

getImage();
