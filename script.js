window.onload = function() {
    var canvas = document.getElementById('gameCanvas');
    var context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 576;

    var img = new Image();
    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = 'assets/table.png';
};
