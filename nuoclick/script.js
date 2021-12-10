let clickButton = document.querySelector('.click');

clickButton.onclick = function() {
    coins = document.getElementById("coins");
    coinsPerClick = document.getElementById("coins-per-click");
    finalCoins = Number(coins.textContent) + Number(coinsPerClick.textContent)
    coins.innerHTML = finalCoins.toFixed(3);
}

let buyButton = document.querySelector('.buy')

buyButton.onclick = function() {
    clicks = document.getElementById("coins");
    upgradeCost = document.getElementById("upgrade-cost");
    clicksPerClick = document.getElementById("coins-per-click");
    if (Number(clicks.textContent) >= Number(upgradeCost.textContent)) {
        clicks.innerHTML = (Number(clicks.textContent) - Number(upgradeCost.textContent)).toFixed(3);
        clicksPerClick.innerHTML = Number(clicksPerClick.textContent) + 0.001;
        upgradeCost.innerHTML = Number(upgradeCost.textContent) * 2;
    }
}