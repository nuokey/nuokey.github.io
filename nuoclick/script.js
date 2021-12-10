let clickButton = document.querySelector('.click');

clickButton.onclick = function() {
    clicks = document.getElementById("clicks-clicked");
    clicksPerClick = document.getElementById("clicks-per-click");
    clicks.innerHTML = Number(clicks.textContent) + Number(clicksPerClick.textContent);
}

let buyButton = document.querySelector('.buy')

buyButton.onclick = function() {
    clicks = document.getElementById("clicks-clicked");
    upgradeCost = document.getElementById("upgrade-cost");
    clicksPerClick = document.getElementById("clicks-per-click");
    if (Number(clicks.textContent) >= Number(upgradeCost.textContent)) {
        clicks.innerHTML = Number(clicks.textContent) - Number(upgradeCost.textContent);
        clicksPerClick.innerHTML = Number(clicksPerClick.textContent) + 1;
        upgradeCost.innerHTML = Number(upgradeCost.textContent) * 2;
    }
}