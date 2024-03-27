import numpy as np

from player import create_player
from table import create_table

suits = ['♠', '♡', '♢', '♣']
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
smallBlind = 10
player1 = create_player("Player 1")
player2 = create_player("Player 2")
runGame = True

while runGame:
    table = create_table()
    turnIsPlayer1 = np.random.choice([True, False])
    playerFolded = False
    roundOver = False

    for i in range(2):
        player1.draw(table.deal())
        player2.draw(table.deal())
    
    table.pot = smallBlind * 3
    if turnIsPlayer1:
        player1.bet(smallBlind)
        player2.bet(smallBlind * 2)
    else: 
        player2.bet(smallBlind)
        player1.bet(smallBlind * 2)
    
    print(f"Player {1 if turnIsPlayer1 else 2} is the small blind, Player {2 if turnIsPlayer1 else 1} is the big blind.")
 
    print(f"Player 1: {ranks[player1.hand[0][0]]}{suits[player1.hand[0][1]]} {ranks[player1.hand[1][0]]}{suits[player1.hand[1][1]]}")
    print(f"Player 2: {ranks[player2.hand[0][0]]}{suits[player2.hand[0][1]]} {ranks[player2.hand[1][0]]}{suits[player2.hand[1][1]]}")

    
    for round in ["pre-flop", "flop", "turn", "river"]:
        if playerFolded:
            break

        print("====================================")
        print(f"Start of {round}.")
        
        if round == "pre-flop":
            pass
        elif round == "flop":
            for i in range(3):
                table.dealTable()
        elif round == "turn":
            table.dealTable()
        elif round == "river":
            table.dealTable()

        display = "no cards on table"
        if round != "pre-flop":
            display = "cards are "
            for card in table.cards:
                display += f"{ranks[card[0]]}{suits[card[1]]} "
        
        while not roundOver:
            print("====================================")
            print(f"Player{1 if turnIsPlayer1 else 2}'s turn.")

            print(f"Pot is {table.pot}, {display}.")

            call = np.abs(player1.chipsBet - player2.chipsBet)
            try:
                bet = int(input(f"{call} chips to call, otherwise fold: "))
            except ValueError:
                print("Invalid input. Please enter a valid bet.")
                continue

            if bet < call:
                print(f"Player{1 if turnIsPlayer1 else 2} folded.")
                playerFolded = True
            else:
                table.pot += player1.bet(bet) if turnIsPlayer1 else player2.bet(bet)
                if bet == call: roundOver = True
            
            turnIsPlayer1 = not turnIsPlayer1

        player1.chipsBet = 0
        player2.chipsBet = 0
        roundOver = False
    
    if playerFolded:
        print(f"Player {1 if turnIsPlayer1 else 2} wins {table.pot}.")
        if turnIsPlayer1:
            player1.chips += table.pot
        else:
            player2.chips += table.pot
    else:
        if player1.scoreHand() > player2.scoreHand():
            print(f"Player 1 wins {table.pot}.")
            player1.chips += table.pot
        else:
            print(f"Player 2 wins {table.pot}.")
            player2.chips += table.pot