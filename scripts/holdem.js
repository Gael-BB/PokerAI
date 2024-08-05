function holdemGame(canvas, context) {
    const betButtonImg = new Image();
    const checkButtonImg = new Image();
    const playerCardImg = new Image();
    const botCardImg = new Image();
    const playerScoreImg = new Image();
    const botScoreImg = new Image();
    const potImg = new Image();

    const assets = [
        { img: betButtonImg, src: 'assets/buttons/bet-hover.png', x: canvas.width / 2 - 252, y: 470, width: 204, height: 68 },
        { img: checkButtonImg, src: 'assets/buttons/check-hover.png', x: canvas.width / 2 + 48, y: 470, width: 204, height: 68 },
        { img: playerCardImg, src: 'assets/cards/card_back.png', x: canvas.width / 2 - 75, y: 320, width: 150, height: 150 },
        { img: botCardImg, src: 'assets/cards/card_back.png', x: canvas.width / 2 - 75, y: 10, width: 150, height: 150 },
        { img: playerScoreImg, src: 'assets/text/10.png', x: canvas.width / 2 - 100, y: 330, width: 50, height: 50 },
        { img: botScoreImg, src: 'assets/text/10.png', x: canvas.width / 2 - 100, y: 20, width: 50, height: 50 },
        { img: potImg, src: 'assets/text/blank.png', x: canvas.width / 2 - 100, y: 200, width: 50, height: 50 }
    ];

    assets.forEach(({ img, src, x, y, width, height }) => {
        img.src = src;
        img.onload = () => context.drawImage(img, x, y, width, height);
    });

    // Game Variables
    
    
    // Game Logic Functions
    function startGame()
    {

    }

    // Start Game
    startGame();
}