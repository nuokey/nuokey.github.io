pencilsDiv = document.querySelector(".pencils");

pencilsHtml = "";

for (let i = 0; i < getRandomInt(10, 15); i++) {
    pencilsHtml += `<img src="/Pencils/pencil.png" width="100">`;
}

console.log(pencilsHtml);
pencilsDiv.innerHTML = pencilsHtml;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
  