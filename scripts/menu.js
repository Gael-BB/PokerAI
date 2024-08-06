function initMenu(canvas, context) {
    context.imageSmoothingEnabled = false; // Pixel Art Scaling
    const kuhnButtonImg = new Image();
    const holdemButtonImg = new Image();
    const assets = [
        { img: kuhnButtonImg, src: 'assets/buttons/kuhn.png', hoverSrc: 'assets/buttons/kuhn-hover.png', x: canvas.width / 2 - 102, y: 200, width: 204, height: 68 },
        { img: holdemButtonImg, src: 'assets/buttons/holdem.png', hoverSrc: 'assets/buttons/holdem-hover.png', x: canvas.width / 2 - 102, y: 300, width: 204, height: 68 }
    ];
    
    assets.forEach(({ img, src, x, y, width, height }) => {
        img.src = src;
        img.onload = () => context.drawImage(img, x, y, width, height);
    });

    var scaleFactor = 1;
    function calculateScaleFactor() {
        scaleFactor = 1024 / Math.min(1024, window.innerWidth);
    }
    calculateScaleFactor();
    window.addEventListener('resize', calculateScaleFactor);

    function handleMouseMove(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        let cursorChanged = false;

        assets.forEach((button) => {
            if (mouseX > button.x && mouseX < button.x + button.width && mouseY > button.y && mouseY < button.y + button.height) {
                canvas.style.cursor = 'pointer';
                button.img.src = button.hoverSrc;
                cursorChanged = true;
            } else {
                button.img.src = button.src;
            }
        });

        if (!cursorChanged) {
            canvas.style.cursor = 'default';
        }
    }
    canvas.addEventListener('mousemove', handleMouseMove);

    function handleClick(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        assets.forEach((button) => {
            if (mouseX > button.x && mouseX < button.x + button.width && mouseY > button.y && mouseY < button.y + button.height) {
                removeAll();
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.cursor = 'default';

                if (button.img === kuhnButtonImg) {
                    kuhnGame(canvas, context);
                } else if (button.img === holdemButtonImg) {
                    holdemGame(canvas, context);
                }
            }
        });
    }
    canvas.addEventListener('click', handleClick);

    function removeAll() {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
        window.removeEventListener('resize', calculateScaleFactor);
    }
}
