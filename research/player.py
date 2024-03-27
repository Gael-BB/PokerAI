import numpy as np

class create_player:
    def __init__(self, name):
        self.hand = []
        self.score = [0, 0]
        self.chips = 1000
        self.chipsBet = 0

    def draw(self, card):
        self.hand.append(card)

    def bet(self, amount):
        self.chips -= amount
        self.chipsBet += amount
        return amount

    def scoreHand(self):
        for card in self.hand:
            if card[0] > self.score[0]:
                self.score[0] = card[0]
                self.score[1] = card[1]
        return self.score[0]