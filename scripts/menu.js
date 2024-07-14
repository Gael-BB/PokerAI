function initMenu(canvas, context, scaleFactor) {
    context.imageSmoothingEnabled = false; // Pixel Art Scaling
    
    var kuhnButtonImg = new Image();
    kuhnButtonImg.src = 'assets/buttons/kuhn.png';
    var kuhnButton = {
        x: canvas.width / 2 - 102, // Center the button on the canvas
        y: 200,
        width: 204,
        height: 68
    };

    kuhnButtonImg.onload = function() {
        context.drawImage(kuhnButtonImg, kuhnButton.x, kuhnButton.y, kuhnButton.width, kuhnButton.height);
    };

    function handleMouseMoveForKuhnButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > kuhnButton.x && mouseX < kuhnButton.x + kuhnButton.width && mouseY > kuhnButton.y && mouseY < kuhnButton.y + kuhnButton.height) {
            canvas.style.cursor = 'pointer';
            kuhnButtonImg.src = 'assets/buttons/kuhn-hover.png';
        } else {
            canvas.style.cursor = 'default';
            kuhnButtonImg.src = 'assets/buttons/kuhn.png';
        }
    }
    canvas.addEventListener('mousemove', handleMouseMoveForKuhnButton);

    function handleClickForkuhnButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > kuhnButton.x && mouseX < kuhnButton.x + kuhnButton.width && mouseY > kuhnButton.y && mouseY < kuhnButton.y + kuhnButton.height) {
            canvas.removeEventListener('mousemove', handleMouseMoveForKuhnButton);
            canvas.removeEventListener('click', handleClickForkuhnButton);
            context.clearRect(kuhnButton.x, kuhnButton.y, kuhnButton.width, kuhnButton.height);
            
            kuhnGame();
        }
    }
    canvas.addEventListener('click', handleClickForkuhnButton);
}
