let snake = [];
snake.push([240, 240]);

let apple = [30, 30]

let canvas = document.getElementById('canvas');
// let up = document.getElementById('up');

canvas.width = screen.width;
canvas.height = screen.height * 0.8;

let speedx = 1;
let speedy = 0;
let speed = 5;

// up.onlcick = function() {
//     turnUp();
// };

function draw() {
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'rgb(0, 255, 0)';
        // console.log(snake[i][0], snake[i][1]);
        ctx.fillRect(snake[i][0], snake[i][1], 10, 10);
    }

    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillRect(apple[0], apple[1], 20, 20);
}

function move() {
    // console.log(snake);
    for (let q = snake.length - 1; q >= 0; q--) {
        if (q == 0) {
            snake[q][0] += speedx * speed;
            snake[q][1] += speedy * speed;
        }
        else {
            snake[q][0] = snake[q-1][0];
            snake[q][1] = snake[q-1][1];
        }
    }
}

function turnUp() {
    if (speedy == 0) {
        speedx = 0;
        speedy = -1;
    }
}
function turnDown() {
    if (speedy == 0) {
        speedx = 0;
        speedy = 1;
    }
}

function turnLeft() {
    if (speedx == 0) {
        speedx = -1;
        speedy = 0;
    }
}

function turnRight() {
    if (speedx == 0) {
        speedx = 1;
        speedy = 0;
    }
}

function keyboardCheck(e) {
    console.log(e.key);
    if (e.key == "ArrowUp") {
        turnUp();
    }
    if (e.key == "ArrowDown") {
        turnDown();
    }
    if (e.key == "ArrowLeft") {
        turnLeft();
    }
    if (e.key == "ArrowRight") {
        turnRight();
    }
}

function appleUpdate() {
    let distance = Math.sqrt((apple[0] + 10 - snake[0][0] - 5)**2 + (apple[1] + 10 - snake[0][1])**2 - 5);
    if (distance <= 20 ) {
        snake.push([snake[0][0], snake[0][1]]);
        apple[0] = Math.random() * (canvas.width - 20);
        apple[1] = Math.random() * (canvas.height - 20);
    }
}

function outOfBounds() {
    if (snake[0][0] > canvas.width) {
        snake[0][0] = -11;
    }
    if (snake[0][0] < -11) {
        snake[0][0] = canvas.width;
    }
    if (snake[0][1] > canvas.height) {
        snake[0][1] = -11;
    }
    if (snake[0][1] < -11) {
        snake[0][1] = canvas.height;
    }
}

function selfBite() {
    for (let z = 1; i < snake.length; i++) {
        let snakeDistance = Math.sqrt((snake[i][0] + 10 - snake[0][0] - 10)**2 + (snake[i][1] + 10 - snake[0][1])**2 - 10);
        if (snakeDistance <= 5) {
            for (let c = z; z < snake.length; i++) {
                snake.pop(z)
            }
            break
        }
    }
}

function update() {
    move();
    appleUpdate();
    outOfBounds();
    // selfBite();

    draw();
}

setInterval(update, 10);


addEventListener("keydown", keyboardCheck);