let a = "Здравствуйте, вы лох";

let themeButton = document.querySelector('.click');

themeButton.onclick = function() {
    clicks = document.getElementById("clicks-clicked")
    clicks.innerHTML = Number(clicks.textContent)+1;
}