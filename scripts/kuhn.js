function kuhnGame(canvas, context) {
    // Adjust Scale Factor
    var scaleFactor = 1;
    function calculateScaleFactor() {
        scaleFactor = 1024 / Math.min(1024, window.innerWidth);
    }
    calculateScaleFactor();
    window.addEventListener('resize', calculateScaleFactor);
    
    // Render Images
    const betButtonImg = new Image();
    const checkButtonImg = new Image();
    const playerCardImg = new Image();
    const botCardImg = new Image();
    const playerScoreImg = new Image();
    const botScoreImg = new Image();
    const potImg = new Image();
    const textImg = new Image();

    const assets = [
        { img: betButtonImg, src: 'assets/buttons/bet-hover.png', x: canvas.width / 2 - 252, y: 470, width: 204, height: 68 },
        { img: checkButtonImg, src: 'assets/buttons/check-hover.png', x: canvas.width / 2 + 48, y: 470, width: 204, height: 68 },
        { img: playerCardImg, src: 'assets/cards/card_back.png', x: canvas.width / 2 - 75, y: 320, width: 150, height: 150 },
        { img: botCardImg, src: 'assets/cards/card_back.png', x: canvas.width / 2 - 75, y: 10, width: 150, height: 150 },
        { img: playerScoreImg, src: 'assets/text/10.png', x: canvas.width / 2 - 100, y: 330, width: 50, height: 50 },
        { img: botScoreImg, src: 'assets/text/10.png', x: canvas.width / 2 - 100, y: 20, width: 50, height: 50 },
        { img: potImg, src: 'assets/text/-1.png', x: canvas.width / 2 - 100, y: 200, width: 50, height: 50 },
        { img: textImg, src: 'assets/text/transparent.png', x: 100, y: 205, width: 432, height: 36 },
    ];

    assets.forEach(({ img, src, x, y, width, height }) => {
        img.src = src;
        img.onload = () => context.drawImage(img, x, y, width, height);
    });

    // Game Variables
    var playerScore = 10;
    var botScore = 10;
    var pot;
    var text = 'turn';
    var p1IsPlayer = true;
    var history;
    var p1Turn;
    var playerCard;
    var botCard;
    var foldAvailable = false;
    
    // Game Functions
    function updateVisuals()
    {
        potImg.src = 'assets/text/' + pot + '.png';
        playerScoreImg.src = 'assets/text/' + playerScore + '.png';
        botScoreImg.src = 'assets/text/' + botScore + '.png';
        playerCardImg.src = 'assets/cards/' + String(playerCard+50) + '.png';
        textImg.src = 'assets/text/' + text + '.png';
    }

    function startGame()
    {
        history = 'rr';
        p1Turn = true;
        playerScore -= 1;
        botScore -= 1;
        pot = 2;
        playerCard = Math.floor(Math.random() * 3);
        botCard = Math.floor(Math.random() * 2);
        if (playerCard === botCard) {
            botCard += 1;
        }
        updateVisuals();
        if (p1IsPlayer)
        {
            activateButtons();
        }
        else
        {
            botMove();
        }
    }

    function activateButtons()
    {
        buttonsAssets = [{ img: betButtonImg, src: 'assets/buttons/bet.png', hoverSrc: 'assets/buttons/bet-hover.png', x: canvas.width / 2 - 252, y: 470, width: 204, height: 68 }]
        if (foldAvailable)
        {
            buttonsAssets.push({ img: checkButtonImg, src: 'assets/buttons/fold.png', hoverSrc: 'assets/buttons/fold-hover.png', x: canvas.width / 2 + 48, y: 470, width: 204, height: 68 });
        }
        else
        {
            buttonsAssets.push({ img: checkButtonImg, src: 'assets/buttons/check.png', hoverSrc: 'assets/buttons/check-hover.png', x: canvas.width / 2 + 48, y: 470, width: 204, height: 68 });
        }

        function handleMouseMove(e) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = (e.clientX - rect.left) * scaleFactor;
            var mouseY = (e.clientY - rect.top) * scaleFactor;
    
            let cursorChanged = false;
    
            buttonsAssets.forEach((button) => {
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
        handleMouseMove({ clientX: 0, clientY: 0 });

        function handleClick(e) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = (e.clientX - rect.left) * scaleFactor;
            var mouseY = (e.clientY - rect.top) * scaleFactor;
    
            buttonsAssets.forEach((button) => {
                if (mouseX > button.x && mouseX < button.x + button.width && mouseY > button.y && mouseY < button.y + button.height) {
                    canvas.removeEventListener('mousemove', handleMouseMove);
                    canvas.removeEventListener('click', handleClick);
                    buttonsAssets.forEach((button) => {button.img.src = button.hoverSrc;});
                    canvas.style.cursor = 'default';

                    if (button.img === betButtonImg) {
                        playerMove(true);
                    } else if (button.img === checkButtonImg) {
                        playerMove(false);
                    }
                }
            });
        }
        canvas.addEventListener('click', handleClick);
    }

    function playerMove(bet)
    {
        
    }

    function botMove()
    {
        actionProbabilities = {
            '0rr': 0.8,
            '0rrcb': 1.0,
            '1rr': 1.0,
            '1rrcb': 0.5,
            '2rr': 0.4,
            '2rrcb': 0.0,

            '0rrb': 1.0,
            '0rrc': 2/3,
            '1rrb': 2/3,
            '1rrc': 1.0,
            '2rrb': 0.0,
            '2rrc': 0.0,
        };

        random = Math.random();
        probability = actionProbabilities[String(botCard) + history];
        if (random > probability)
        {
            botMove = 'bet';
        }
        else
        {
            botMove = 'check';
        }

    }

    function isTerminal(){}

    // Start Game
    setTimeout(startGame, 1000);
}
