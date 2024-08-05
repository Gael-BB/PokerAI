function kuhnGame(canvas, context) {
    class kuhnPoker {
        constructor() {
            this.player1Score = 10;
            this.player2Score = 10;
            this.player1IsAI = true;
            this.reset();
        }
        reset() {
            this.player1IsAI = !this.player1IsAI;
            this.player1 = Math.floor(Math.random() * 3);
            // console.log('Player 1 gets ' + String(this.player1))
            this.player2 = Math.floor(Math.random() * 2);
            if (this.player1 === this.player2) {
                this.player2 += 1;
            }
            // console.log('Player 2 gets ' + String(this.player2))
            this.history = 'rr';
            this.pot = 2;
            this.player1Score -= 1;
            this.player2Score -= 1;
            this.player1Turn = true;

            if (this.player1IsAI){
                this.play(this.getP1Action())
            }
        }
        play(betAction){
            if (this.player1Turn){
                if (betAction){
                    this.player1Bet();
                } else {
                    this.player1Check();
                }
            }
            else {
                if (betAction){
                    this.player2Bet();
                } else {
                    this.player2Check();
                }
            }
            switch (this.history){
                case 'rrbb':
                case 'rrcc':
                case 'rrcbb':
                    this.showdown();
                    break;
                case 'rrbc':
                    this.player1Win();
                    break;
                case 'rrcbc':
                    this.player2Win();
                    break;
                default:
                    this.player1Turn = !this.player1Turn;
                    if (this.player1Turn && this.player1IsAI){
                        this.play(this.getP1Action());
                    }
                    else if (!this.player1Turn && !this.player1IsAI){
                        this.play(this.getP2Action());
                    }
                    break;
            
            }
        }
        getP1Action() {
            var random = Math.random();
            switch (String(this.player1) + this.history) {
                case '0rr':
                    if (random > 0.7922) {
                        return true;
                    }
                case '0rrcb':
                    if (random > 1.0000) {
                        return true;
                    }
                case '1rr':
                    if (random > 1.0000) {
                        return true;
                    }
                case '1rrcb':
                    if (random > 0.4992) {
                        return true;
                    }
                case '2rr':
                    if (random > 0.3874) {
                        return true;
                    }
                case '2rrcb':
                    if (random > 0) {
                        return true;
                    }
            }
            return false;
        }
        getP2Action(){
            var random = Math.random();
            switch (String(this.player2) + this.history) {
                case '0rrb':
                    if (random > 1.0000) {
                        return true;
                    }
                case '0rrc':
                    if (random > 0.6655) {
                        return true;
                    }
                case '1rrb':
                    if (random > 0.6607) {
                        return true;
                    }
                case '1rrc':
                    if (random > 1.0000) {
                        return true;
                    }
                case '2rrb':
                    if (random > 0) {
                        return true;
                    }
                case '2rrc':
                    if (random > 0) {
                        return true;
                    }
                }
                return false;
        }
        player1Bet(){
            console.log('Player 1 bets');
            this.history += 'b'
            this.player1Score -= 1;
            this.pot += 1;
        }
        player2Bet(){
            console.log('Player 2 bets');
            this.history += 'b'
            this.player2Score -= 1;
            this.pot += 1;
        }
        player1Check(){
            console.log('Player 1 checks');
            this.history += 'c'
        }
        player2Check(){
            console.log('Player 2 checks');
            this.history += 'c'
        }
        player1Win(){
            console.log('Player 1 wins');
            this.player1Score += this.pot;
            this.pot = 0;
            this.greyButtons();
        }
        player2Win(){
            console.log('Player 2 wins');
            this.player2Score += this.pot;
            this.pot = 0;
            this.greyButtons();
        }
        showdown(){
            if (this.player1 > this.player2){
                this.player1Win();
            }
            else{
                this.player2Win();
            }
        }
        greyButtons(){
            removeAllEventListeners();
            betButtonImg.src = 'assets/buttons/bet-hover.png';
            checkButtonImg.src = 'assets/buttons/check-hover.png';
            
            setTimeout(() => {
                this.clearButtons();
                this.reset();
            }, 2000);
        }
        clearButtons(){
            addAllEventListeners();
            betButtonImg.src = 'assets/buttons/bet.png';
            checkButtonImg.src = 'assets/buttons/check.png';
        }
    }

    var scaleFactor = 1;
    function calculateScaleFactor() {
        scaleFactor = 1024 / Math.min(1024,window.innerWidth);
    }
    calculateScaleFactor();
    window.addEventListener('resize', calculateScaleFactor);

    var checkButtonImg = new Image();
    checkButtonImg.src = 'assets/buttons/check.png';
    var checkButton = {
        x: canvas.width / 2 - 102 + 150, // Center the button on the canvas
        y: 450,
        width: 204,
        height: 68
    };
    checkButtonImg.onload = function() {
        context.drawImage(checkButtonImg, checkButton.x, checkButton.y, checkButton.width, checkButton.height);
    }
    function handleMouseMoveForCheckButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > checkButton.x && mouseX < checkButton.x + checkButton.width && mouseY > checkButton.y && mouseY < checkButton.y + checkButton.height) {
            canvas.style.cursor = 'pointer';
            checkButtonImg.src = 'assets/buttons/check-hover.png';
        } else {
            canvas.style.cursor = 'default';
            checkButtonImg.src = 'assets/buttons/check.png';
        }
    }
    function handleClickForCheckButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > checkButton.x && mouseX < checkButton.x + checkButton.width && mouseY > checkButton.y && mouseY < checkButton.y + checkButton.height) {
            game.play(false);
        }
    }

    var betButtonImg = new Image();
    betButtonImg.src = 'assets/buttons/bet.png';
    var betButton = {
        x: canvas.width / 2 - 102 - 150,
        y: 450,
        width: 204,
        height: 68
    };
    betButtonImg.onload = function() {
        context.drawImage(betButtonImg, betButton.x, betButton.y, betButton.width, betButton.height);
    }
    function handleMouseMoveForBetButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > betButton.x && mouseX < betButton.x + betButton.width && mouseY > betButton.y && mouseY < betButton.y + betButton.height) {
            canvas.style.cursor = 'pointer';
            betButtonImg.src = 'assets/buttons/bet-hover.png';
        } else {
            canvas.style.cursor = 'default';
            betButtonImg.src = 'assets/buttons/bet.png';
        }
    }
    function handleClickForBetButton(e) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = (e.clientX - rect.left) * scaleFactor;
        var mouseY = (e.clientY - rect.top) * scaleFactor;

        if (mouseX > betButton.x && mouseX < betButton.x + betButton.width && mouseY > betButton.y && mouseY < betButton.y + betButton.height) {
            game.play(true);
        }
    }
    function addAllEventListeners(){
        canvas.addEventListener('mousemove', handleMouseMoveForCheckButton);
        canvas.addEventListener('click', handleClickForCheckButton);
        canvas.addEventListener('mousemove', handleMouseMoveForBetButton);
        canvas.addEventListener('click', handleClickForBetButton);
    }
    function removeAllEventListeners(){
        canvas.removeEventListener('mousemove', handleMouseMoveForCheckButton);
        canvas.removeEventListener('click', handleClickForCheckButton);
        canvas.removeEventListener('mousemove', handleMouseMoveForBetButton);
        canvas.removeEventListener('click', handleClickForBetButton);
    }
    addAllEventListeners();

    var playerCardImg = new Image();
    playerCardImg.src = 'assets/cards/card_back.png';
    var playerCard = {
        x: canvas.width / 2 - 96,
        y: 250,
        width: 192,
        height: 192
    };
    playerCardImg.onload = function() {
        context.drawImage(playerCardImg, playerCard.x, playerCard.y, playerCard.width, playerCard.height);
    }

    var aiCardImg = new Image();
    aiCardImg.src = 'assets/cards/card_back.png';
    var aiCard = {
        x: canvas.width / 2 - 96,
        y: 10,
        width: 192,
        height: 192
    };
    aiCardImg.onload = function() {
        context.drawImage(aiCardImg, aiCard.x, aiCard.y, aiCard.width, aiCard.height);
    }

    var game = new kuhnPoker();
}
