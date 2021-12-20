let indexCoins = document.cookie.indexOf("coins=", 0);
let indexSimbol = document.cookie.indexOf(";", indexCoins);
let coinsLoaded = "Coins haven't been loaded";
if (indexSimbol == -1) {
    coinsLoaded = document.cookie.slice(indexCoins);
}
else {
    coinsLoaded = document.cookie.slice(indexCoins, indexSimbol);
}
document.getElementById("coins").innerHTML = coinsLoaded;
alert(document.cookie);
