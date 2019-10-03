window.addEventListener('DOMContentLoaded', function () {
    let imgCapture = document.getElementById("imageCapture");
    imgCapture.onchange = function(){
        let file = imgCapture.files;
        for( var i = 0; i < file.length; i++){
            console.log(file[i]);
        }
    }
});
