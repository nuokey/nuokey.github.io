playerImg = document.querySelector(".player")
aiImg = document.querySelector(".ai")
resultDiv = document.querySelector(".result")

async function requestCards() {
    let responce = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);

    let text = await responce.json();
    console.log(text.deck_id);

    let cards = await fetch(`https://deckofcardsapi.com/api/deck/${text.deck_id}/draw/?count=2`);

    let cardsJSON = await cards.json();

    console.log(cardsJSON.cards);

    playerImg.innerHTML = `<img src="${cardsJSON.cards[0].image}">`;
    aiImg.innerHTML = `<img src="${cardsJSON.cards[1].image}">`;

    if (parseFloat(cardsJSON.cards[0].value) > parseFloat(cardsJSON.cards[1].value)) {
        resultDiv.innerHTML = "<h1>Вы выиграли</h1>";
    }
    else if (cardsJSON.cards[0].value == cardsJSON.cards[1].value) {
        resultDiv.innerHTML = "<h1>Ничья</h1>";
    }
    else {
        resultDiv.innerHTML = "<h1>Вы проиграли</h1>";
    }

    return text;
}