function kuhnGame(canvas, context) {
    class kuhnPoker {
        constructor() {
            var checkButtonImg = new Image();
            var betButtonImg = new Image();
            checkButtonImg.src = 'assets/buttons/check-hover.png';
            betButtonImg.src = 'assets/buttons/bet-hover.png';
            var checkButton = {
                x: canvas.width / 2 - 102 + 400, // Center the button on the canvas
                y: 450,
                width: 204,
                height: 68
            };
            var betButton = {
                x: canvas.width / 2 - 102 + 180, // Center the button on the canvas
                y: 450,
                width: 204,
                height: 68
            };

            checkButtonImg.onload = function() {
                context.drawImage(checkButtonImg, checkButton.x, checkButton.y, checkButton.width, checkButton.height);
            };
            betButtonImg.onload = function() {
                context.drawImage(betButtonImg, betButton.x, betButton.y, betButton.width, betButton.height);
            }
            
            this.player1Score = 10
            this.player2Score = 10
            this.player1IsAI = true;
            this.reset();
        }
        reset() {
            this.player1IsAI = !player1IsAI;
            this.player1 = Math.floor(Math.random() * 3);
            this.player2 = Math.floor(Math.random() * 2);
            if (this.player1 === this.player2) {
                this.player2 += 1;
            }
            this.history = 'rr';
            this.pot = 2;
            this.player1Score -= 1;
            this.player2Score -= 1;
        }
        play(){
            if (this.getP1Action()) {
                this.player1Bet();
                if (this.getP2Action()){
                    this.player2Bet();
                    this.showdown();
                }
                else {
                    this.player1Win();
                }
            }
            else{
                if (this.getP2Action()) {
                    this.player2Bet();
                    if (this.getP1Action()){
                        this.player1Bet();
                        this.showdown();
                    }
                    else {
                        this.player2Win();
                    }
                }
                else{
                    this.showdown()
                }
            }
        }
        getP1Action() {
            if (this.player1IsAI){
                random = Math.random();
                var betAction = false;
                switch (String(this.player1) + this.history) {
                    case '0rr':
                        if (random > 0.7922) {
                            betAction = true;
                        }
                    case '0rrcb':
                        if (random > 1.0000) {
                            betAction = true;
                        }
                    case '1rr':
                        if (random > 1.0000) {
                            betAction = true;
                        }
                    case '1rrcb':
                        if (random > 0.4992) {
                            betAction = true;
                        }
                    case '2rr':
                        if (random > 0.3874) {
                            betAction = true;
                        }
                    case '2rrcb':
                        if (random > 0) {
                            betAction = true;
                        }
                }
                return betAction;
            }
            else{
                // get user input
            }
        }
        getP2Action(){
            if (!this.player1IsAI){
                random = Math.random();
                var betAction = false;
                switch (String(this.player2) + this.history) {
                    case '0rrb':
                        if (random > 1.0000) {
                            betAction = true;
                        }
                    case '0rrc':
                        if (random > 0.6655) {
                            betAction = true;
                        }
                    case '1rrb':
                        if (random > 0.6607) {
                            betAction = true;
                        }
                    case '1rrc':
                        if (random > 1.0000) {
                            betAction = true;
                        }
                    case '2rrb':
                        if (random > 0) {
                            betAction = true;
                        }
                    case '2rrc':
                        if (random > 0) {
                            betAction = true;
                        }
                }
                return betAction;
            }
            else{
                // get user input
            }
        }
        player1Bet(){
            this.player1Score -= 1
            this.pot += 1
        }
        player2Bet(){
            this.player2Score -= 1
            this.pot += 1
        }
        player1Win(){
            this.player1Score += this.pot;
            this.pot = 0;
        }
        player2Win(){
            this.player1Score += this.pot;
            this.pot = 0;
        }
        showdown(){
            if (this.player1 > this.player2){
                this.player1Win();
            }
            this.player2Win();
        }
    }

    var scaleFactor = 1;
    function calculateScaleFactor() {
        scaleFactor = 1024 / Math.min(1024,window.innerWidth);
    }
    calculateScaleFactor();
    window.addEventListener('resize', calculateScaleFactor);

    var game = new kuhnPoker();



}
