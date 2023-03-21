pencilsDiv = document.querySelector(".pencils");
pencilsRemovedHTML = document.querySelector(".removed");

pencils = getRandomInt(10, 15);
pencilsRemoved = 0;


function drawPencils() {
    pencilsHtml = "";
    for (let i = 0; i < pencils; i++) {
        pencilsHtml += `<img src="/Pencils/pencil.png" onclick="removePencil(self);" width="100">`;
    }

    pencilsRemovedHTML.innerHTML = "Вы убрали: " + pencilsRemoved;
    pencilsDiv.innerHTML = pencilsHtml;

    if (pencils == 0) {
        if (pencilsRemoved == 0) {
            pencilsDiv.innerHTML = "<h1>Вы победили</h1>";
        }
        if (pencilsRemoved != 0) {
            pencilsDiv.innerHTML = "<h1>Вы проиграли</h1>";
        }
    }
}

drawPencils();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function removePencil(self) {
    if (pencilsRemoved < 3) {
        pencils -= 1;
        pencilsRemoved += 1;
        drawPencils();
    }
}

function move() {
    pencilsRemoved = 0;

    if (pencils == 4) {
        pencils -= 3;
    }
    else if (pencils == 3) {
        pencils -= 2;
    }
    else if (pencils == 2) {
        pencils -= 1;
    }
    else if (pencils == 1) {
        pencils -= 1;
    }
    else if (pencils % 2 == 0) {
        pencils -= 2;
    }
    else if (pencils % 2 != 0) {
        pencils -= 3;
    }
    drawPencils();
}