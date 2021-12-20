let indexCoins = document.cookie.indexOf("coins=", 0);
let indexSimbol = document.cookie.indexOf(";", indexCoins);
let coinsLoaded = "Coins haven't been loaded";
if (indexSimbol == -1) {
    coinsLoaded = document.cookie.slice(indexCoins);
}
else {
    coinsLoaded = document.cookie.slice(indexCoins + 6, indexSimbol);
}
document.getElementById("coins").innerHTML = coinsLoaded;
