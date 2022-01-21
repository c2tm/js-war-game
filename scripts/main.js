(function(){

("use strict");

const possNumbers = [`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`11`,`12`,`13` ,`14`];
const newGameButton = document.querySelector(".newgame");
const drawCardsButton = document.querySelector(".drawcard");
const titleText = document.querySelector(".title");
const player1StatusText = document.querySelector(".text1");
const player2StatusText = document.querySelector(".text2");

let game;
let pot = [];
let newGameCounter = 0;
let warCounter = 0;
let player1Card = [];
let player2Card = [];
let winningCard = [];
let winningPlayer = 0;
let endCounter = 0;

function Card ({name, suit}) {
    this.name = name;
    this.suit = suit;
}

function Player ({name, hand}) {
    this.name = name;
    this.hand = hand;
}

function Deck ({}) {
    this.cards = [];
}
function Game ({game, deck, player1, player2}) {
    this.deck = deck;
    this.player1 = player1;
    this.player2 = player2;
    this.setup(possNumbers);
    this.shuffle();
}

Game.prototype.setup = (arr) => {

    this.deck = new Deck ({cards: []});

    this.player1 = new Player ({name: prompt("Please enter player 1's name"), hand: []});
    this.player2 = new Player ({name: prompt("Please enter player 2's name"), hand: []});

    for(let i = 0; i < arr.length; i++) {
        let newSpadesCard = new Card ({name: arr[i], suit: `Spades`});
        this.deck.cards.push(newSpadesCard);
    }

    for(let i = 0; i < arr.length; i++) {
        let newHeartsCard = new Card ({name: arr[i], suit: `Hearts`});
        this.deck.cards.push(newHeartsCard);
    }

    for(let i = 0; i < arr.length; i++) {
        let newClubsCard = new Card ({name: arr[i], suit: `Clubs`});
        this.deck.cards.push(newClubsCard);
    }

    for(let i = 0; i < arr.length; i++) {
        let newDiamondsCard = new Card ({name: arr[i], suit: `Diamonds`});
        this.deck.cards.push(newDiamondsCard);
    }

    // console.log(this.deck);
    
}

Game.prototype.shuffle = () => {
    
    let shuffledDeck = [];

    for(let i = 52; i >= 0; i--){
        let randomIndex = Math.floor(Math.random() * i);
        if(this.deck.cards.indexOf(this.deck.cards[randomIndex]) !== -1){
            shuffledDeck.push(this.deck.cards[randomIndex])
            this.deck.cards.splice(randomIndex, 1); 
        }
        
    }


    //////////////////////TEST DECK//////////////////////


    // for(let i = 0; i < 52; i++) {
    //     shuffledDeck.push(this.deck.cards[i]);
    // }

    
    // for(let i = 0; i <= 25; i++) {
    //     this.player1.hand.push(shuffledDeck[i]);
    //     this.player2.hand.push(shuffledDeck[i]);
    // }


    // this.player1.hand[4] = this.player1.hand[5];        //War case
    // this.player2.hand[8] = this.player1.hand[9];     //Double war case


    //////////////////////TEST DECK///////////////////


    for(let i = 0; i <= 25; i++) {
        this.player1.hand.push(shuffledDeck[i]);
        this.player2.hand.push(shuffledDeck[i + 1]);
    }
    
}

Game.prototype.compareCards = () => {

    game.endGame();

    if(endCounter > 0) {
        return;
    }

    player1Card.push(this.player1.hand[0]);
    player2Card.push(this.player2.hand[0]);
    
    for(let i = 0; i < 1; i++) {

        game.endGame();

        if(endCounter > 0) {
        return;
        }
        
        if(this.player1.hand[0].name > this.player2.hand[0].name) {

            winningCard.push(this.player1.hand[0]);
            winningPlayer = 1;
            
            for(let i = 0; i < pot.length; i++) {
                this.player1.hand.push(pot[i]);
            }

            this.player1.hand.push(this.player2.hand[0]);
            this.player1.hand.push(this.player1.hand[0]);
            this.player1.hand.splice(0,1);
            this.player2.hand.splice(0,1);
            pot = [];

        } else if (this.player2.hand[0].name > this.player1.hand[0].name) {

            winningCard.push(this.player2.hand[0]);
            winningPlayer = 2;

            for(let i = 0; i < pot.length; i++) {
                this.player2.hand.push(pot[i]);
            }

            this.player2.hand.push(this.player2.hand[0]);
            this.player2.hand.push(this.player1.hand[0]);
            this.player1.hand.splice(0,1);
            this.player2.hand.splice(0,1);
            pot = [];

        } else {

            // console.log('war');
            
            warCounter += 1;

                game.endGame();

                if(endCounter > 0) {
                return;
                }

                pot.push(this.player1.hand[0]);
                pot.push(this.player2.hand[0]);
                this.player1.hand.splice(0,1);
                this.player2.hand.splice(0,1);

            game.endGame();

            if(endCounter > 0) {
            return;
            }
        
                pot.push(this.player1.hand[0]);
                pot.push(this.player1.hand[1]);
                pot.push(this.player1.hand[2]);

                game.endGame();

                if(endCounter > 0) {
                return;
                }

                this.player1.hand.splice(0,3);
    
                pot.push(this.player2.hand[0]);
                pot.push(this.player2.hand[1]);
                pot.push(this.player2.hand[2]);

                game.endGame();
                
                if(endCounter > 0) {
                return;
                }

                this.player2.hand.splice(0,3);

                // console.log(pot);
                // console.log(this.player1);
                // console.log(this.player2);
                i--;
        }
    }

    // console.log(player1Card[0].name);
    // console.log(player2Card[0].name);

    // console.log(this.player1);
    // console.log(this.player2);
}

Game.prototype.display = () => {
    
    if(endCounter > 0) {
        return;
    }

    if(warCounter > 0) {
        if(winningPlayer === 1) {
            titleText.textContent = `After ${warCounter} war(s), ${this.player1.name} wins the round!`;
        } else if(winningPlayer === 2) {
            titleText.textContent = `After ${warCounter} war(s), ${this.player2.name} wins the round!`;
        }
    } else {
        if(winningPlayer === 1) {
            titleText.textContent = `${this.player1.name} wins the round!`;
        } else if (winningPlayer === 2) {
            titleText.textContent = `${this.player2.name} wins the round!`;
        }
    }

        switch (player1Card[0].name) {
            case `11`:
                player1Card[0].name = `Jack`;
                break;
            case `12`:
                player1Card[0].name = 'Queen';
                break;
            case `13`:
                player1Card[0].name = `King`;
                break;
            case `14`:
                player1Card[0].name = `Ace`;
            default:
                break;
        }

        switch (player2Card[0].name) {
            case `11`:
                player2Card[0].name = `Jack`;
                break;
            case `12`:
                player2Card[0].name = 'Queen';
                break;
            case `13`:
                player2Card[0].name = `King`;
                break;
            case `14`:
                player2Card[0].name = `Ace`;
            default:
                break;
        }

        player1StatusText.textContent = `${this.player1.name} has drawn a(n) ${player1Card[0].name} of ${player1Card[0].suit}!`;
        player2StatusText.textContent = `${this.player2.name} has drawn a(n) ${player2Card[0].name} of ${player2Card[0].suit}!`;

        player1Card = [];
        player2Card = [];
        winningCard = [];
        winningPlayer = 0;
        warCounter = 0;

}

Game.prototype.endGame = () => {

    // if(warCounter > 0) {
    //     if(this.player1.hand.length < 3) {
    //         endCounter += 1;
    //         player1StatusText.textContent = `GAME OVER!`;
    //         player2StatusText.textContent = `GAME OVER!`;
    //         titleText.textContent = `${this.player2.name} has won the game!`;
    //     } else if (this.player2.hand.length < 3) {
    //         endCounter += 1;
    //         player1StatusText.textContent = `GAME OVER!`;
    //         player2StatusText.textContent = `GAME OVER!`;
    //         titleText.textContent = `${this.player2.name} has won the game!`;
    //     }
    // }else {
        if(this.player1.hand.length <= 0) {
        endCounter += 1;
        player1StatusText.textContent = `GAME OVER!`;
        player2StatusText.textContent = `GAME OVER!`;
        titleText.textContent = `${this.player2.name} has won the game!`;
    } else if (this.player2.hand.length <= 0) {
        endCounter += 1;
        player1StatusText.textContent = `GAME OVER!`;
        player2StatusText.textContent = `GAME OVER!`;
        titleText.textContent = `${this.player2.name} has won the game!`;
    }
    // }
}


newGameButton.addEventListener("click", () => {
    newGameCounter += 1;
    endCounter = 0;
    game = new Game({});
})


drawCardsButton.addEventListener("click", () => {
    game.compareCards();
    game.endGame();
    game.display();
});
  

})();

