weather1HTML = document.querySelector("#t-1");

input = document.querySelector(".city");

city = document.querySelector(".city-name");

w1HTML = document.querySelector("#w-1");

async function requestNumber() {
    let cityResponce1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    
    city.innerHTML = input.value;

    let city1 = await cityResponce1.json();

    console.log(city1[0]);

    let responce1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city1[0].lat}&lon=${city1[0].lon}&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);

    let weather1 = await responce1.json();

    weather1HTML.innerHTML = `Temperature: ${Math.floor(weather1.main.temp - 273)}`;

    w1HTML.innerHTML = `Weather: ${weather1.weather[0].main}`;

    console.log(weather1);
    console.log(weather1.main.temp);
};

// requestNumber();