let indexCoins = document.cookie.indexOf("coins=", 0);
let indexSimbol = document.cookie.indexOf(";", indexCoins);
let coinsLoaded = "Coins haven't been loaded";
if (indexSimbol == -1) {
    coinsLoaded = document.cookie.slice(indexCoins + 6);
}
else {
    coinsLoaded = document.cookie.slice(indexCoins + 6, indexSimbol);
}
document.getElementById("coins").innerHTML = coinsLoaded;

let indexCoinsperclick = document.cookie.indexOf("coins-per-click=", 0);
let indexSimbol2 = document.cookie.indexOf(";", indexCoinsperclick);
let coinsperclickLoaded = "Coins per click haven't been loaded";
if (indexSimbol2 == -1) {
    coinsperclickLoaded = document.cookie.slice(indexCoinsperclick + 16);
}
else {
    coinsperclickLoaded = document.cookie.slice(indexCoinsperclick + 16, indexSimbol2);
}
document.getElementById("coins-per-click").innerHTML = coinsperclickLoaded;
