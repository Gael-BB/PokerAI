window.onload = function() {
    var canvas = document.getElementById('gameCanvas');
    var context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 576;

    var scaleFactor = 1;
    function calculateScaleFactor() {
        scaleFactor = 1024 / Math.min(1024,window.innerWidth);
    }
    calculateScaleFactor();
    window.addEventListener('resize', calculateScaleFactor);

    initMenu(canvas, context, scaleFactor);
};
