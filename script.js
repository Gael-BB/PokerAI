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

    // START BUTTON
    context.imageSmoothingEnabled = false; // Pixel Art Scaling
    var startButtonImg = new Image();
    startButtonImg.src = 'assets/buttons/start.png';
    var startButton = {
        x: canvas.width / 2 - 102, // Center the button on the canvas
        y: 200,
        width: 204,
        height: 68
    };
    
    startButtonImg.onload = function() {context.drawImage(startButtonImg, startButton.x, startButton.y, startButton.width, startButton.height);};
    
    function handleMouseMoveForStartButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > startButton.x && mouseX < startButton.x + startButton.width && mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
            canvas.style.cursor = 'pointer';
            startButtonImg.src = 'assets/buttons/start-hover.png';
        } else {
            canvas.style.cursor = 'default';
            startButtonImg.src = 'assets/buttons/start.png';
        }
    }
    canvas.addEventListener('mousemove', handleMouseMoveForStartButton);

    function handleClickForStartButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;
    
        if (mouseX > startButton.x && mouseX < startButton.x + startButton.width && mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
            startGame();
        }
    }
    canvas.addEventListener('click', handleClickForStartButton);
    // END START BUTTON

    // START GAME
    function startGame() {
        context.clearRect(startButton.x, startButton.y, startButton.width, startButton.height);
        canvas.removeEventListener('mousemove', handleMouseMoveForStartButton);
        canvas.removeEventListener('click', handleClickForStartButton);
        console.log('Start Button Pressed');
    }
};
