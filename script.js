let value = [6,7,8,9,10,'J','Q','K','A'];
let color = ['♤','♡','♢','♧'];
let toValue = {6:6,7:7,8:8,9:9,10:10,'J':2,'Q':3,'K':4,'A':11,}
let card, start= false;
let usedCards = []
let computerCards = [], playerCards = [];
let cscore = 0, pscore = 0
let music = new Audio();

let stavka = document.querySelector(".stavka");
let balanceHTML = document.querySelector(".balance");

let balance = 100;


let game = false;

function newCard(){
  card = generateValue();
  while (contains(usedCards,card)){
    card = generateValue();
  }
  let littleText = document.querySelectorAll('#lit-text');
  for (let i = 0;i<littleText.length;i++){
    littleText[i].textContent = card[0] + card[1];
  };
  let centerText = document.querySelector('#cen-text');
  centerText.textContent = card[1];
};

function generateValue(){
  return [value[getRandomInt(0,value.length)],color[getRandomInt(0,color.length)]]
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function contains(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}


function drawCard(){
  document.querySelector('.player-score').textContent = pscore + ' очков';
  document.querySelector('.computer-score').textContent = cscore + ' очков';
  con = document.querySelector('.player')
  con.innerHTML = ''
  for (let i = 0; i<playerCards.length;i++){
    con.innerHTML += `<div class="card-mini" style=left:${5+37*i}px;><h2 class="mini-left-text">${playerCards[i][0]}${playerCards[i][1]}</h2>
    <h2 class="mini-center">${playerCards[i][0]}</h2>
    <h2 class="mini-right-text">${playerCards[i][0]}${playerCards[i][1]}</h2></div>`
  }

  con = document.querySelector('.computer')
  con.innerHTML = ''
  for (let i = 0; i<computerCards.length;i++){
    con.innerHTML += `<div class="card-mini" style=left:${5+37*i}px;><h2 class="mini-left-text">${computerCards[i][0]}${computerCards[i][1]}</h2>
    <h2 class="mini-center">${computerCards[i][0]}</h2>
    <h2 class="mini-right-text">${computerCards[i][0]}${computerCards[i][1]}</h2></div>`
  }
}
function becomeLoser(){
  if (pscore > 21){
    document.querySelector('.player').classList.add('red')
  }
  if (cscore > 21){
    document.querySelector('.computer').classList.add('red')
  }
}


intervalId = window.setInterval(newCard, 20);
intervalId2 = window.setInterval(drawCard, 100);
intervalId3 = window.setInterval(becomeLoser, 1000);



// document.addEventListener("click",function (){
//   if (!start){
//     start=true;
//     cscore = 0, pscore = 0;
//     if (usedCards.length > 24){
//       usedCards = [];
//     };
//     ccard = generateValue();
//     while (contains(usedCards,ccard)){
//       ccard = generateValue();
//     };
//     pcard = generateValue();
//     while (contains(usedCards,pcard)){
//       pcard = generateValue();
//     };
//     computerCards.push(ccard);
//     cscore = toValue[ccard[0]];
//     playerCards.push(pcard);
//     pscore = toValue[pcard[0]];
//     usedCards.push(ccard);
//     usedCards.push(pcard);
//   };
// })

function pickUp(){
  if (game) {
    if ((start) && (playerCards.length < 5) && (pscore < 21)){
      pcard = generateValue();
      while (contains(usedCards,pcard)){
        pcard = generateValue();
      };
    playerCards.push(pcard);
      pscore += toValue[pcard[0]];
      usedCards.push(pcard);
    }
  }
  
}

function end() {
  if (pscore == 21){
    document.querySelector('.player').classList.add('blue')
    document.querySelector('.computer').classList.add('red')
    musicStart()
    return
  }
  while ((start) && (playerCards.length < 5) && (cscore < 16)){
    ccard = generateValue();
    while (contains(usedCards,ccard)){
      ccard = generateValue();
    };
    computerCards.push(ccard);
    cscore += toValue[ccard[0]];
    usedCards.push(ccard);
  };
  if ((cscore > pscore && cscore < 22)||(cscore === pscore && cscore < 22)){
    document.querySelector('.computer').classList.add('blue')
    document.querySelector('.player').classList.add('red')

    balance -= Number(stavka.value);
  }
  if (cscore < pscore && pscore < 22){
    document.querySelector('.computer').classList.add('red')
    document.querySelector('.player').classList.add('blue')
    balance += Number(stavka.value);
    musicStart()
  }
  if (cscore >= 22 && pscore < 22){
    document.querySelector('.computer').classList.add('red')
    document.querySelector('.player').classList.add('blue')
    balance += Number(stavka.value);
    musicStart()
  }
  if (cscore < 22 && pscore >= 22){
    document.querySelector('.computer').classList.add('blue')
    document.querySelector('.player').classList.add('red')
    balance -= Number(stavka.value);
  }
  balanceHTML.innerHTML = "Ваш Баланс: " + balance;
  console.log("end")
}

function startGame() {
  if (!game && Math.floor(Number(stavka.value)) > 0) {
    game = true;

    

    console.log("start");

    start=true;
    cscore = 0, pscore = 0;
    if (usedCards.length > 24){
      usedCards = [];
    };
    ccard = generateValue();
    while (contains(usedCards,ccard)){
      ccard = generateValue();
    };
    pcard = generateValue();
    while (contains(usedCards,pcard)){
      pcard = generateValue();
    };
    computerCards.push(ccard);
    cscore = toValue[ccard[0]];
    playerCards.push(pcard);
    pscore = toValue[pcard[0]];
    usedCards.push(ccard);
    usedCards.push(pcard);
    pickUp();
  }
  
}


document.querySelector('.take-card').addEventListener("click",pickUp)

document.querySelector('.end').addEventListener("click",end);


function musicStart(){
  music.loop = true;
  music.src = 'blue.mp3';
  music.preload = true;
  music.play();
};

function musicStop(){
  music.loop = true;
  music.src = 'blue.mp3';
  music.preload = true;
  music.pause();
};