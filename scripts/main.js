window.onload = function() {
    var canvas = document.getElementById('gameCanvas');
    var context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 576;

    initMenu(canvas, context);
};
