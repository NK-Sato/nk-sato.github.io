window.addEventListener('DOMContentLoaded', function () {

    let imgCapture = document.getElementById("imageCapture");
    let canvas = document.getElementById("canvas");

    imgCapture.onchange = function(){
        let file = imgCapture.files;
        drawOnCanvas(file);
    }

    function drawOnCanvas(file) {
        var reader = new FileReader();

        reader.onload = function (e) {
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
});
