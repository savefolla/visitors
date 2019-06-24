const onWindowResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

onWindowResize();

window.addEventListener('resize', onWindowResize);

const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const uploadYoursButton = document.getElementById('upload-yours');
const background = document.getElementById('random-image');
const homeMessage = document.querySelector('.message--home');
const thanksMessage = document.querySelector('.message--thanks');
const yourImage = document.getElementById('your-image');
const count = document.getElementById('count');

let total;
let cameraEnabled = false;

uploadYoursButton.addEventListener('click', (e) => {
  e.stopPropagation();
  background.style.display = 'none';
  yourImage.style.display = 'block';
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
    facingMode: 'user'
  }).then((stream) => {
    cameraEnabled = true;
    player.srcObject = stream;
  });
});

captureButton.addEventListener('click', () => {
  if (!cameraEnabled) return;
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  context.drawImage(player, 0, 0, player.videoWidth, player.videoHeight);
  canvas.toBlob(blob => {
    background.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
    background.style.display = 'block';
    thanksMessage.style.display = 'block';
    homeMessage.style.display = 'none';
    yourImage.style.display = 'none';
    setCount(++total);
    postImage(blob);
  });
});

setCount = (value) => {
  count.innerHTML = `${value} shots collected`;
};

postImage = (data) => {
  var formData = new FormData();
  formData.append("image", data);
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("POST", `${window.location.href}image`);
  xhr.send(formData);
};

getImage = () => {
  function reqListener() {
    const res = JSON.parse(this.responseText);
    total = res.total;
    setCount(res.total);
    background.style.backgroundImage = `url(images/${res.url})`;
    background.style.display = 'block';
    homeMessage.style.display = 'block';
    yourImage.style.display = 'none';
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = reqListener;
  xhr.open("GET", `${window.location.href}image`);
  xhr.send();
};

background.addEventListener('click', getImage);

getImage();
