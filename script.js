pointsHTML = document.querySelector(".points");
playerImgsHTML = document.querySelector(".player-imgs");
computerImgsHTML = document.querySelector(".computer-imgs");
resultHTML = document.querySelector(".result");

let playerPoints = 0;
let computerPoints = 0;

let computerHTML = '';

takeCard();
takeCard();

async function takeCard() {
    let responce = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);

    let text = await responce.json();
    console.log(text.deck_id);

    let cards = await fetch(`https://deckofcardsapi.com/api/deck/${text.deck_id}/draw/?count=2`);

    let cardsJSON = await cards.json();

    console.log(cardsJSON.cards);

    if (cardsJSON.cards[0].value == "QUEEN" || cardsJSON.cards[0].value == "KING" || cardsJSON.cards[0].value == "JACK") {
        playerPoints += 10;
    }
    else if (cardsJSON.cards[0].value == "ACE") {
        if (playerPoints + 11 > 21) {
            playerPoints += 1
        }
        else {
            playerPoints += 11;
        }
    }
    else {
        playerPoints += parseFloat(cardsJSON.cards[0].value);
    }

    

    // pointsHTML.innerHTML = computerPoints;

    playerImgsHTML.innerHTML += `<img src="${cardsJSON.cards[0].image}">`;

    


    if (computerPoints < 18) {
        if (cardsJSON.cards[1].value == "QUEEN" || cardsJSON.cards[1].value == "KING" || cardsJSON.cards[1].value == "JACK") {
            computerPoints += 10;
        }
        else if (cardsJSON.cards[1].value == "ACE") {
            if (computerPoints + 11 > 21) {
                computerPoints += 1
            }
            else {
                computerPoints += 11;
            }
        }
        else {
            computerPoints += parseFloat(cardsJSON.cards[1].value);
        }
        computerHTML += `<img src="${cardsJSON.cards[1].image}">`;
    }
}

async function stopTaking() {
    while (computerPoints < 18) {
        let responce = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);

        let text = await responce.json();
        console.log(text.deck_id);

        let cards = await fetch(`https://deckofcardsapi.com/api/deck/${text.deck_id}/draw/?count=2`);

        let cardsJSON = await cards.json();

        console.log(cardsJSON.cards);

        if (cardsJSON.cards[1].value == "QUEEN" || cardsJSON.cards[1].value == "KING" || cardsJSON.cards[1].value == "JACK") {
            computerPoints += 10;
        }
        else if (cardsJSON.cards[1].value == "ACE") {
            if (computerPoints + 11 > 21) {
                computerPoints += 1
            }
            else {
                computerPoints += 11;
            }
        }
        else {
            computerPoints += parseFloat(cardsJSON.cards[1].value);
        }
        computerHTML += `<img src="${cardsJSON.cards[1].image}">`;
    }

    computerImgsHTML.innerHTML = computerHTML;
    if (computerPoints > 21 && playerPoints > 21) {
        resultHTML.innerHTML = "Ничья";
    }
    else if (computerPoints > 21) {
        resultHTML.innerHTML = "Вы выиграли";
    }
    else if (playerPoints > 21) {
        resultHTML.innerHTML = "Вы проиграли";
    }
    else if (computerPoints > playerPoints) {
        resultHTML.innerHTML = "Вы проиграли";
    }
    else if (computerPoints < playerPoints) {
        resultHTML.innerHTML = "Вы выиграли";
    }
    else {
        resultHTML.innerHTML = "Ничья";
    }
}