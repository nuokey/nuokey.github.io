weather1HTML = document.querySelector("#t-1");

input = document.querySelector(".city");

cityH = document.querySelector(".city-name");

w1HTML = document.querySelector("#w-1");

async function requestNumber(city) {
    let cityResponce1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    
    cityH.innerHTML = city;

    let city1 = await cityResponce1.json();

    console.log(city1[0]);

    let responce1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city1[0].lat}&lon=${city1[0].lon}&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);

    let weather1 = await responce1.json();

    weather1HTML.innerHTML = `Temperature: ${Math.floor(weather1.main.temp - 273)}`;

    w1HTML.innerHTML = `Weather: ${weather1.weather[0].main}`;

    console.log(weather1);
    console.log(weather1.main.temp);
};

var request = new XMLHttpRequest;

request.open('GET', 'cities.txt', true);

request.onload = function () {
    text = request.responseText.split("\n");

    requestNumber(text[getRandomInt(text.length-1)]);
};

request.send(null);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }