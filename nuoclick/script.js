let indexCoins = document.cookie.indexOf("coins=", 0) + 6;
let indexSimbol = document.cookie.indexOf(";", indexCoins);
if (indexSimbol == -1) {
    let coins = document.cookie.slice(indexCoins);
}
else {
    let coins = document.cookie.slice(indexCoins, indexSimbol);
}
document.getElementById("coins").innerHTML = coins;

let coinsPerClick = document.getElementById("coins-per-click");

let clickButton = document.querySelector('.click');

clickButton.onclick = function() {
    let coins = document.getElementById("coins");
    let coinsPerClick = document.getElementById("coins-per-click");
    let finalCoins = Number(coins.textContent) + Number(coinsPerClick.textContent)
    coins.innerHTML = finalCoins.toFixed(3);
    document.cookie = "coins=" + finalCoins.toFixed(3);
}

let buyButton = document.querySelector('.buy');

buyButton.onclick = function() {
    let coins = document.getElementById("coins");
    let upgradeCost = document.getElementById("upgrade-cost");
    let coinsPerClick = document.getElementById("coins-per-click");
    if (Number(coins.textContent) >= Number(upgradeCost.textContent)) {
        coins.innerHTML = (Number(coins.textContent) - Number(upgradeCost.textContent)).toFixed(3);
        coinsPerClick.innerHTML = Number(coinsPerClick.textContent) + 0.001;
        upgradeCost.innerHTML = Number(upgradeCost.textContent) * 2;

        // document.cookie = "coins=" + ((Number(coins.textContent) - Number(upgradeCost.textContent)).toFixed(3)) + "; coins-per-click=" + (Number(coinsPerClick.textContent) + 0.001);
    }
}

let deleteButton = document.querySelector(".delete");

deleteButton.onclick = function() {
    // document.cookie = "coins=0; coins-per-click=0.001"
    location.reload()
}