window.addEventListener('DOMContentLoaded', function() {
  let imgCapture = document.getElementById('imageCapture');
  let canvas = document.getElementById('canvas');

  let versionContainer = document.getElementById('version');
  let version = '1.0.4';
  injectVersion();

  // init QRCode Web Worker
  const qrcodeWorker = new Worker('assets/qrcode_worker.js');
  qrcodeWorker.postMessage({cmd: 'init'});
  qrcodeWorker.addEventListener('message', qrcodeResult);

  imgCapture.onchange = function() {
    let files = imgCapture.files;
    if (files.length > 1) {
      files.forEach(c => {
        drawOnCanvas(c);
      });
    } else {
      drawOnCanvas(files[0]);
    }
  };

  function drawOnCanvas(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var dataURL = e.target.result,
        ctx = canvas.getContext('2d'),
        img = new Image();

      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        scanQrCode(ctx, img);
      };

      img.src = dataURL;
    };

    reader.readAsDataURL(file);
  }

  function injectVersion() {
    versionContainer.innerHTML = version;
  }

  function scanQrCode(snapshotContext, img) {
    const imageData = snapshotContext.getImageData(0, 0, img.width, img.height);

    // scan for QRCode
    qrcodeWorker.postMessage({
      cmd: 'process',
      width: img.width,
      height: img.height,
      imageData: imageData,
    });
  }

  function qrcodeResult(e) {
    const resultData = e.data;

    // open a dialog with the result if found
    if (resultData !== false) {
      alert(resultData);
    } else {
    }
  }
});
