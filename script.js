let textHTML = document.querySelector(".text");
let inputHTML = document.querySelector("#number");

async function requestNumber() {
    let input = inputHTML.value;
    let responce = await fetch(`https://kruase.ml/`);
    let text = await responce.text()

    console.log(text);

    textHTML.innerHTML = text;
}