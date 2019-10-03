window.addEventListener('DOMContentLoaded', function() {
  let imgCapture = document.getElementById('imageCapture');
  let canvas = document.getElementById('canvas');

  let versionContainer = document.getElementById('version');
  let version = '1.0.2';
  injectVersion();

// init QRCode Web Worker
    const qrcodeWorker = new Worker("assets/qrcode_worker.js");
    qrcodeWorker.postMessage({cmd: 'init'});
    qrcodeWorker.addEventListener('message', showResult);

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
        scanQrCode(ctx, img)
      };

      img.src = dataURL;
    };

    reader.readAsDataURL(file);
  }

  function injectVersion() {
    versionContainer.innerHTML = version;
  }

  function scanQrCode(snapshotContext, img) {
    const imageData = snapshotContext.getImageData(
      0,
      0,
      img.size,
      img.size,
    );

    // scan for QRCode
    qrcodeWorker.postMessage({
      cmd: 'process',
      width: img.size,
      height: img.size,
      imageData: imageData,
    });
  }
});
