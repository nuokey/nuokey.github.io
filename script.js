let a = "Здравствуйте, вы лох";

let themeButton = document.querySelector('.click');

themeButton.onclick = function() {
    document.getElementsById("p1").innerHTML = "New text!";
}