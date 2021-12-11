document.cookie = "coins=123"
let indexCoins = document.cookie.indexOf("coins", 0) + 6;
let indexSimbol = document.cookie.indexOf(";", indexCoins);
let coins = document.cookie[indexCoins, indexSimbol];
document.getElementById("coins").innerHTML = document.cookie;

let coinsPerClick = document.getElementById("coins-per-click");

let clickButton = document.querySelector('.click');

clickButton.onclick = function() {
    let coins = document.getElementById("coins");
    let coinsPerClick = document.getElementById("coins-per-click");
    let finalCoins = Number(coins.textContent) + Number(coinsPerClick.textContent)
    coins.innerHTML = finalCoins.toFixed(3);
}

let buyButton = document.querySelector('.buy')

buyButton.onclick = function() {
    let coins = document.getElementById("coins");
    let upgradeCost = document.getElementById("upgrade-cost");
    let coinsPerClick = document.getElementById("coins-per-click");
    if (Number(coins.textContent) >= Number(upgradeCost.textContent)) {
        coins.innerHTML = (Number(coins.textContent) - Number(upgradeCost.textContent)).toFixed(3);
        coinsPerClick.innerHTML = Number(coinsPerClick.textContent) + 0.001;
        upgradeCost.innerHTML = Number(upgradeCost.textContent) * 2;
    }
}