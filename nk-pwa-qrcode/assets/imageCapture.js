window.addEventListener('DOMContentLoaded', function() {
  let imgCapture = document.getElementById('imageCapture');
  let canvas = document.getElementById('canvas');

  let versionContainer = document.getElementById('version');
  let version = '1.0.0';
  injectVersion();

  imgCapture.onchange = function() {
    let files = imgCapture.files;
    if (files.length > 1) {
      files.forEach(c => {
        drawOnCanvas(c);
      });
    }else{
        drawOnCanvas(files);
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
      };

      img.src = dataURL;
    };

    reader.readAsDataURL(file);
  }

  function injectVersion() {
    versionContainer.innerHTML = version;
  }
});
