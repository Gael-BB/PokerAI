import numpy as np

class create_table:
    def __init__(self):
        self.deck = [[rank, suit] for suit in range(4) for rank in range(13)]
        self.cards = []
        self.pot = 0
        np.random.shuffle(self.deck)

    def deal(self):
        return self.deck.pop()
    
    def dealTable(self):
        self.cards.append(self.deck.pop())