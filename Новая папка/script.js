function congr() {
    body = document.querySelector(".body");
    input = document.querySelector("#name");

    body.innerHTML = `<img src="/c3309137-8ff5-51e5-a275-977a4f4b52fc.jpeg" height="500">
    <marquee><h1>С 8 марта!</h1></marquee>
    <h2>${input.value}</h2>`;
}