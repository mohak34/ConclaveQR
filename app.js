let scanner = new Instascan.Scanner({
  video: document.getElementById("video"),
});

let qrdetail = "";

scanner.addListener("scan", function (content) {
  qrdetail = content;
  document.getElementById("qr-detail").innerHTML = content;
});

Instascan.Camera.getCameras()
  .then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error("No cameras found.");
    }
  })
  .catch(function (e) {
    console.error(e);
  });

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("captureButton");

let count = 0;

captureButton.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/png");

  if (qrdetail !== "") {
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    if (count === 0) {
      downloadLink.download = `${qrdetail}_id`;
    } else if (count === 1) {
      downloadLink.download = `${qrdetail}_image`;
      count = -1;
      qrdetail = "";
      document.getElementById("qr-detail").innerHTML = "";
    }
    downloadLink.click();
    count += 1;
  }
});

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing the camera: ", error);
  });
