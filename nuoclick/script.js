let clickButton = document.querySelector('.click');

clickButton.onclick = function() {
    clicks = document.getElementById("clicks-clicked")
    clicks.innerHTML = Number(clicks.textContent)+1;
}

let buyButton = document.querySelector('.buy')

buyButton.onclick = function() {
    clicks = document.getElementById("clicks-clicked")
}