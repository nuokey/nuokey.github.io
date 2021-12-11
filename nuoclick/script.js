document.cookie = encodeURIComponent("user") + "=" + encodeURIComponent("John");
document.getElementById("coins").innerHTML = document.cookie;

let clickButton = document.querySelector('.click');

clickButton.onclick = function() {
    coins = document.getElementById("coins");
    coinsPerClick = document.getElementById("coins-per-click");
    finalCoins = Number(coins.textContent) + Number(coinsPerClick.textContent)
    coins.innerHTML = finalCoins.toFixed(3);
}

let buyButton = document.querySelector('.buy')

buyButton.onclick = function() {
    coins = document.getElementById("coins");
    upgradeCost = document.getElementById("upgrade-cost");
    coinsPerClick = document.getElementById("coins-per-click");
    if (Number(coins.textContent) >= Number(upgradeCost.textContent)) {
        coins.innerHTML = (Number(coins.textContent) - Number(upgradeCost.textContent)).toFixed(3);
        coinsPerClick.innerHTML = Number(coinsPerClick.textContent) + 0.001;
        upgradeCost.innerHTML = Number(upgradeCost.textContent) * 2;
    }
}