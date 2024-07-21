import QrScanner from "./qr-scanner/qr-scanner.min.js";

const video = document.getElementById('qr-video');
const loadingScreen = document.getElementById('loading-screen');
const cycleButton = document.getElementById('cycle-icon');

function checkResult(result) {
    console.log(result.data);
    if(isValidHttpUrl(result.data))
    {
        scanner.stop();
        loadingScreen.style.visibility = "visible";
        window.location.replace(result.data);
    }
}

const scanner = new QrScanner(video, result => checkResult(result), {
    onDecodeError: error => {
        // Log Error
        //console.log("error scanning: " + error);
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
});

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  if(!url.hostname.endsWith("e4473.com")) { return false; }

  return url.protocol === "http:" || url.protocol === "https:";
}


scanner.start().then(() => {
  QrScanner.listCameras(false).then(cameras => {
    var cameraIndex = 0;
    if(cameras.length > 0) {
      cameraIndex++;
      cycleButton.style.visibility = "visible";
      scanner.setCamera(cameras[cameraIndex]);
    }
    
    cameras.forEach(camera => { console.log("camera.id: " + camera.id); })
    console.log("cameras.length: " + cameras.length);

    cycleButton.addEventListener('click', () => {
      cameraIndex++;
      if(cameraIndex == cameras.length) { cameraIndex = 0; }
      scanner.setCamera(cameras[cameraIndex]);
    });
  })
});

