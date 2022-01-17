(function(){

("use strict");

//card combinations

const possSuits = [`Hearts`, `Clubs`, `Spades`, `Diamonds`]
const Jack = 11;
const Queen = 12;
const King = 13;
const Ace = 14;
const possNumbers = [`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`, `Jack`, `King`, `Queen` , `Ace`]
const cardNames = [];
const shuffledDeck = [];
const players = [];
const player1Cards = [];
const player2Cards = [];
const newGameButton = document.querySelector(".newgame");
const drawCardsButton = document.querySelector(".drawcard");
const player1Text = document.querySelector(".input1");
const player2Text = document.querySelector(".input2");
const player1StatusText = document.querySelector(".text1");
const player2StatusText = document.querySelector(".text2");
const titleText = document.querySelector(".title");

let player1Deck = [];
let player2Deck = [];
let regCurrentCard1 = [];
let regCurrentCard2 = [];
let warCard1 = 0;
let warCard2 = 0;
let warCounter = 1;
let newGame;
let allWarCards = [];
let warCardCopy1 = ``;
let warCardCopy2 = ``;
let newGameCounter = 0;

drawCardsButton.disabled = true; //disables draw cards button before game starts

//card constructor

function Card({name, suit}){
    this.name = name;
    this.suit = suit
}

//player constructor

function Player({name}) {
    this.name = name;
}


//Deck constructor

function Deck({player, cardAmt, contents}) {
    this.player = player;
    this.cardAmt = cardAmt;
    this.contents = contents;
}

//Game constructor

function Game({game = `War`, player1Score, player2Score}) {
    this.game = game;
    this.player1Score = player1Score;
    this.player2Score = player2Score;

}

//Creates card names from possible card combos

Game.prototype.createCards = (arr1, arr2) => {

    const arrHearts = arr1.filter(str => str.includes(`Hearts`))
    const arrSpades = arr1.filter(str => str.includes(`Spades`))
    const arrClubs = arr1.filter(str => str.includes(`Clubs`))
    const arrDiamonds = arr1.filter(str => str.includes(`Diamonds`))

    for(let i = 0; i < arr2.length; i++) {
        let newSpadesCard = new Card ({name: arr2[i], suit: `Spades`});
        cardNames.push(newSpadesCard);
    }

    for(let i = 0; i < arr2.length; i++) {
        let newHeartsCard = new Card ({name: arr2[i], suit: `Hearts`});
        cardNames.push(newHeartsCard);
    }

    for(let i = 0; i < arr2.length; i++) {
        let newClubsCard = new Card ({name: arr2[i], suit: `Clubs`});
        cardNames.push(newClubsCard);
    }

    for(let i = 0; i < arr2.length; i++) {
        let newDiamondsCard = new Card ({name: arr2[i], suit: `Diamonds`});
        cardNames.push(newDiamondsCard);
    }
    
}

const createPlayer1 = (playerName) => {
    players.push(new Player({name: playerName}));
}

const createPlayer2 = (playerName) => {
    players.push(new Player({name: playerName}));
}

Game.prototype.testDeck = (arr) => {
    for(let i = 51; i >= 0; i--){
        shuffledDeck.push(arr[i]);
    }

    for(i = 0; i < 26; i++) {
        player1Cards.push(shuffledDeck[i]);
    }
    for(i = 26; i > 25 && i < 52; i++) {
        player2Cards.push(shuffledDeck[i]);
    }


    player1Deck = new Deck({player: players[0], cardAmt: 26, contents: player1Cards});
    player2Deck = new Deck({player: players[1], cardAmt: 26, contents: player2Cards});
    
    // player1Deck.contents[4] = player1Deck.contents[5];
    player2Deck.contents[8] = player1Deck.contents[9];
    
    
    console.log(player1Deck);
    console.log(player2Deck);
}

Game.prototype.createDecks = (arr) => {
    for(let i = 52; i >= 0; i--){
        let randomIndex = Math.floor(Math.random() * i);
        if(arr.indexOf(arr[randomIndex]) !== -1){
            shuffledDeck.push(arr[randomIndex])
            arr.splice(randomIndex, 1);
        }
        
    }
    
    for(i = 0; i < 26; i++) {
        player1Cards.push(shuffledDeck[i]);
    }
    for(i = 26; i > 25 && i < 52; i++) {
        player2Cards.push(shuffledDeck[i]);
    }

    player1Deck = new Deck({player: players[0].name, cardAmt: 26, contents: player1Cards});
    player2Deck = new Deck({player: players[1].name, cardAmt: 26, contents: player2Cards});
    console.log(player1Deck);
    console.log(player2Deck);

}

Deck.prototype.draw = (num) => {
        if(num === 1){
            player1StatusText.textContent = `${players[0].name} has drawn a ${player1Deck.contents[0].name} of ${player1Deck.contents[0].suit}!`;
            regCurrentCard1.push(player1Deck.contents[0]);
            
        } else {
            player2StatusText.textContent = `${players[1].name} has drawn a ${player2Deck.contents[0].name} of ${player2Deck.contents[0].suit}!`;
            regCurrentCard2.push(player2Deck.contents[0]);
        }
    }

const warFunction = (arr1, arr2) => {

        titleText.textContent = "WAR!"

            if(player1Deck.cardAmt <= 4) {
                titleText.textContent = `Game Over! ${players[1].name} has won the war!`;
                drawCardsButton.disabled = true;
                player1Text.style.display = "block";
                player2Text.style.display = "block";
                players = [];
                return;
            }
        
            if(player2Deck.cardAmt <= 4) {
                titleText.textContent = `Game Over! ${players[0].name} has won the war!`;
                drawCardsButton.disabled = true;
                player1Text.style.display = "block";
                player2Text.style.display = "block";
                players = [];
                return;
            }

                player1StatusText.textContent = `${players[0].name} has placed 3 cards face down and a ${player1Deck.contents[4].name} of ${player1Deck.contents[4].suit}!`;
                player2StatusText.textContent = `${players[1].name} has placed 3 cards face down and a ${player2Deck.contents[4].name} of ${player2Deck.contents[4].suit}!`;
                
                if(warCounter === 1) {
                    warCardCopy1 = player1Deck.contents[4].name;
                    warCardCopy2 = player2Deck.contents[4].name;
                } else {
                    warCardCopy1 = player1Deck.contents[3].name;
                    warCardCopy2 = player2Deck.contents[3].name;
                }

                
               
            if(warCardCopy1 === `Jack`) {
                    warCard1 = Jack;
                }else if(warCardCopy1 === `Queen`) {
                    warCard1 = Queen;
                }else if(warCardCopy1 === `King`) {
                    warCard1 = King;
                }else if(warCardCopy1 === `Ace`) {
                    warCard1 = Ace;
                }else {
                    warCard1 = warCardCopy1;
                }
            if(warCardCopy2 === `Jack`) {
                    warCard2 = Jack;
                }else if(warCardCopy2 === `Queen`) {
                    warCard2 = Queen;
                }else if(warCardCopy2 === `King`) {
                    warCard2 = King;
                }else if(warCardCopy2 === `Ace`) {
                    warCard2 = Ace;
                }else {
                    warCard2 = warCardCopy2;
                }
    
            if (Number(warCard1) > Number(warCard2)) {
                    if(allWarCards.length > 2) {
                        titleText.textContent = `${players[0].name} wins the round!`;
                        player1Deck.cardAmt += (allWarCards.length / 2) + 4;
                        player2Deck.cardAmt -= (allWarCards.length / 2) + 4;
                        
                        player1Deck.contents.push(arr1.contents[0]);
                        player1Deck.contents.push(arr1.contents[1]);
                        player1Deck.contents.push(arr1.contents[2]);
                        player1Deck.contents.push(arr1.contents[3]);
                        player1Deck.contents.splice(0,4);

                        player1Deck.contents.push(arr2.contents[0]);
                        player1Deck.contents.push(arr2.contents[1]);
                        player1Deck.contents.push(arr2.contents[2]);
                        player1Deck.contents.push(arr2.contents[3]);
                        player2Deck.contents.splice(0,4);
                        
                        
                        for(let i = 0; i < allWarCards.length; i++){
                            player1Deck.contents.push(allWarCards[i]);
                    } 
                    } else {
                        titleText.textContent = `${players[0].name} wins the round!`;
                        player1Deck.contents.push(arr1.contents[0]);
                        player1Deck.contents.push(arr1.contents[1]);
                        player1Deck.contents.push(arr1.contents[2]);
                        player1Deck.contents.push(arr1.contents[3]);
                        player1Deck.contents.push(arr1.contents[4]);
                        player1Deck.contents.splice(0,5);
                        

                        player1Deck.contents.push(arr2.contents[0]);
                        player1Deck.contents.push(arr2.contents[1]);
                        player1Deck.contents.push(arr2.contents[2]);
                        player1Deck.contents.push(arr2.contents[3]);
                        player1Deck.contents.push(arr2.contents[4]);
                        player2Deck.contents.splice(0,5);
                        player1Deck.cardAmt += 5;
                        player2Deck.cardAmt -= 5;
                    }

            } 
            if (Number(warCard2) > Number(warCard1)) {
                    if(allWarCards.length > 2) {
                        titleText.textContent = `${players[1].name} wins the round!`;
                        player2Deck.cardAmt += (allWarCards.length / 2) + 4;
                        player1Deck.cardAmt -= (allWarCards.length / 2) + 4;
                        
                        player2Deck.contents.push(arr2.contents[0]);
                        player2Deck.contents.push(arr2.contents[1]);
                        player2Deck.contents.push(arr2.contents[2]);
                        player2Deck.contents.push(arr2.contents[3]);
                        player2Deck.contents.splice(0,4);

                        player2Deck.contents.push(arr1.contents[0]);
                        player2Deck.contents.push(arr1.contents[1]);
                        player2Deck.contents.push(arr1.contents[2]);
                        player2Deck.contents.push(arr1.contents[3]);
                        player1Deck.contents.splice(0,4);

                        for(let i = 0; i < allWarCards.length; i++){
                            player2Deck.contents.push(allWarCards[i]);
                        } 
                    } else {
                        titleText.textContent = `${players[1].name} wins the round!`;
                        player2Deck.contents.push(arr2.contents[1]);
                        player2Deck.contents.push(arr1.contents[2]);
                        player2Deck.contents.push(arr1.contents[3]);
                        player2Deck.contents.push(arr1.contents[4]);
                        player2Deck.contents.push(arr1.contents[5]);
                        player2Deck.contents.splice(0,5);

                        player2Deck.contents.push(arr1.contents[0]);
                        player2Deck.contents.push(arr1.contents[1]);
                        player2Deck.contents.push(arr1.contents[2]);
                        player2Deck.contents.push(arr1.contents[3]);
                        player2Deck.contents.push(arr1.contents[4]);
                        player1Deck.contents.splice(0,5);
                        player2Deck.cardAmt += 5;
                        player1Deck.cardAmt -= 5;
                    }
                    
            } 
            if (Number(warCard2) === Number(warCard1)) {
                    warInfinite(player1Deck, player2Deck);    
            }
            
            warCard1 = 0;
            warCard2 = 0;
            warCardCopy1 = ``;
            warCardCopy2 = ``;

        }

const warInfinite = (arr1, arr2) => {

    titleText.textContent = `ANOTHER WAR!`;

            warCounter += 1;
            
            if(warCounter === 2) {

                if(player1Deck.cardAmt <= 5) {
                    titleText.textContent = `Game Over! ${players[1].name} has won the war!`;
                    drawCardsButton.disabled = true;
                    player1Text.style.display = "block";
                    player2Text.style.display = "block";
                    players = [];
                    return;
                }
            
                if(player2Deck.cardAmt <= 5) {
                    titleText.textContent = `Game Over! ${players[0].name} has won the war!`;
                    drawCardsButton.disabled = true;
                    player1Text.style.display = "block";
                    player2Text.style.display = "block";
                    players = [];
                    return;
                }   

                allWarCards.push(arr1.contents[0]);
                allWarCards.push(arr1.contents[1]);
                allWarCards.push(arr1.contents[2]);
                allWarCards.push(arr1.contents[3]);
                allWarCards.push(arr1.contents[4]);
                arr1.contents.splice(0, 5);

                allWarCards.push(arr2.contents[0]);
                allWarCards.push(arr2.contents[1]);
                allWarCards.push(arr2.contents[2]);
                allWarCards.push(arr2.contents[3]);
                allWarCards.push(arr2.contents[4]);
                arr2.contents.splice(0, 5);
            
            } else {

                if(player1Deck.cardAmt <= 4) {
                    titleText.textContent = `Game Over! ${players[1].name} has won the war!`;
                    drawCardsButton.disabled = true;
                    player1Text.style.display = "block";
                    player2Text.style.display = "block";
                    players = [];
                    return;
                }
            
                if(player2Deck.cardAmt <= 4) {
                    titleText.textContent = `Game Over! ${players[0].name} has won the war!`;
                    drawCardsButton.disabled = true;
                    player1Text.style.display = "block";
                    player2Text.style.display = "block";
                    players = [];
                    return;
                }  

                allWarCards.push(arr1.contents[0]);
                allWarCards.push(arr1.contents[1]);
                allWarCards.push(arr1.contents[2]);
                allWarCards.push(arr1.contents[3]);
                arr1.contents.splice(0, 4);

                allWarCards.push(arr2.contents[0]);
                allWarCards.push(arr2.contents[1]);
                allWarCards.push(arr2.contents[2]);
                allWarCards.push(arr2.contents[3]);
                arr2.contents.splice(0, 4);
            }

            console.log(player1Deck);
            console.log(player2Deck);

            warFunction(player1Deck, player2Deck);
}

Game.prototype.compareCards = (arr1, arr2) => { 
    
    if(arr1[0].name === `Jack`) {
            arr1[0].name = Jack;
        }else if(arr1[0].name === `Queen`) {
            arr1[0].name = Queen;
        }else if(arr1[0].name === `King`) {
            arr1[0].name = King;
        }else if(arr1[0].name === `Ace`) {
            arr1[0].name = Ace;
        }
    if(arr2[0].name === `Jack`) {
            arr2[0].name = Jack;
        }else if(arr2[0].name === `Queen`) {
            arr2[0].name = Queen;
        }else if(arr2[0].name === `King`) {
            arr2[0].name = King;
        }else if(arr2[0].name === `Ace`) {
            arr2[0].name = Ace;
        }


    if (Number(arr1[0].name) > Number(arr2[0].name)) {
            titleText.textContent = `${players[0].name} wins the round!`;
            player1Deck.contents.push(arr2[0]);
            player1Deck.contents.push(arr1[0]);
            player1Deck.contents.splice(0,1);
            player2Deck.contents.splice(0,1);
            player1Deck.cardAmt += 1;
            player2Deck.cardAmt -= 1;
    } else if (Number(arr2[0].name) > Number(arr1[0].name)) {
            titleText.textContent = `${players[1].name} wins the round!`;
            player2Deck.contents.push(arr1[0]);
            player2Deck.contents.push(arr2[0]);
            player2Deck.contents.splice(0,1);
            player1Deck.contents.splice(0,1);
            player2Deck.cardAmt += 1;
            player1Deck.cardAmt -= 1;
    } else if ((Number(arr2[0].name) === Number(arr1[0].name))){
          
        warFunction(player1Deck, player2Deck);  
    }

        regCurrentCard1 = [];
        regCurrentCard2 = [];
        console.log(player1Deck);
        console.log(player2Deck);
}

Game.prototype.endgame = () => {
    if(player1Deck.cardAmt <= 0) {
        titleText.textContent = `Game Over! ${players[1].name} has won the war!`;
        drawCardsButton.disabled = true;
        player1Text.style.display = "block";
        player2Text.style.display = "block";
        players = [];
    }

    if(player2Deck.cardAmt <= 0) {
        titleText.textContent = `Game Over! ${players[0].name} has won the war!`;
        drawCardsButton.disabled = true;
        player1Text.style.display = "block";
        player2Text.style.display = "block";
        players = [];
    }

    

    
}

Game.prototype.cleanUp = () => {

    for(let i = 0; i < player1Deck.contents.length; i++) {
        if (player1Deck.contents[i].name == Jack || player1Deck.contents[i].name == 11) {
            player1Deck.contents[i].name = `Jack`;
        } else if (player1Deck.contents[i].name == Queen || player1Deck.contents[i].name == 12) {
            player1Deck.contents[i].name = `Queen`;
        } else if (player1Deck.contents[i].name == King || player1Deck.contents[i].name == 13) {
            player1Deck.contents[i].name = `King`;
        } else if (player1Deck.contents[i].name == Ace || player1Deck.contents[i].name == 14) {
            player1Deck.contents[i].name = `Ace`;
        }
    }

    for(let i = 0; i < player2Deck.contents.length; i++) {
        if (player2Deck.contents[i].name == Jack || player2Deck.contents[i].name == 11) {
            player2Deck.contents[i].name = `Jack`;
        } else if (player2Deck.contents[i].name == Queen || player2Deck.contents[i].name == 12) {
            player2Deck.contents[i].name = `Queen`;
        } else if (player2Deck.contents[i].name == King || player2Deck.contents[i].name == 13) {
            player2Deck.contents[i].name = `King`;
        } else if (player2Deck.contents[i].name == Ace || player2Deck.contents[i].name == 14) {
            player2Deck.contents[i].name = `Ace`;
        }
    }
}

player1Text.addEventListener("keyup", () => {
    if(event.code === "Enter") {
        createPlayer1(player1Text.value);
        player1Text.style.display = "none";
        
    }
})

player2Text.addEventListener("keyup", () => {
    if(event.code === "Enter") {
        createPlayer2(player2Text.value);
        player2Text.style.display = "none";
    }
})

newGameButton.addEventListener("click", () => {
    newGameCounter += 1;
    newGame = new Game ({player1Score: 26, player2Score: 26});
    newGame.createCards(possSuits, possNumbers);
    // newGame.playerCount(2);

    // newGame.testDeck(cardNames);
    newGame.createDecks(cardNames);
    drawCardsButton.disabled = false;
    
})

drawCardsButton.addEventListener("click", () => {
    player1Deck.draw(1);
    player2Deck.draw(2);
    newGame.compareCards(regCurrentCard1, regCurrentCard2);
    
    newGame.endgame();
    newGame.cleanUp();
    
})



})()