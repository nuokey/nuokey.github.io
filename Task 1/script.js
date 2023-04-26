weather1HTML = document.querySelector("#t-1");
weather2HTML = document.querySelector("#t-2");
weather3HTML = document.querySelector("#t-3");

w1HTML = document.querySelector("#w-1");
w2HTML = document.querySelector("#w-2");
w3HTML = document.querySelector("#w-3");

async function requestNumber() {
    let cityResponce1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${"Moscow"}&limit=1&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    let cityResponce2 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${"St. Petersburg"}&limit=1&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    let cityResponce3 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${"Novosibirsk"}&limit=1&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    
    let city1 = await cityResponce1.json();
    let city2 = await cityResponce2.json();
    let city3 = await cityResponce3.json();

    console.log(city1[0]);

    let responce1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city1[0].lat}&lon=${city1[0].lon}&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    let responce2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city2[0].lat}&lon=${city2[0].lon}&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);
    let responce3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city3[0].lat}&lon=${city3[0].lon}&appid=b7c20233e51a871a2cd9e4f3fbdb0ead`);

    let weather1 = await responce1.json();
    let weather2 = await responce2.json();
    let weather3 = await responce3.json();

    weather1HTML.innerHTML = `Temperature: ${Math.floor(weather1.main.temp - 273)}`;
    weather2HTML.innerHTML = `Temperature: ${Math.floor(weather2.main.temp - 273)}`;
    weather3HTML.innerHTML = `Temperature: ${Math.floor(weather3.main.temp - 273)}`;

    w1HTML.innerHTML = `Weather: ${weather1.weather[0].main}`;
    w2HTML.innerHTML = `Weather: ${weather2.weather[0].main}`;
    w3HTML.innerHTML = `Weather: ${weather3.weather[0].main}`;

    console.log(weather1);
    console.log(weather1.main.temp);
};

requestNumber();