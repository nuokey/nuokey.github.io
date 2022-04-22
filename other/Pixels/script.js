var canvas = document.getElementById('pixel');

if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(0, 0, 50, 50);
}