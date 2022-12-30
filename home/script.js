const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");

const score = document.getElementById("score");

const neutronsText = document.getElementById("neutrons");
const protonsText = document.getElementById("protons");
const electronsText = document.getElementById("electrons");


const hidrogenText = document.getElementById("hidrogen");
const deuteriumText = document.getElementById("deuterium");
const tritiumText = document.getElementById("tritium");

const heliumText = document.getElementById("helium");

const berylliumText = document.getElementById("beryllium");


let neutrons = 0;
let protons = 0;
let electrons = 0;

let hidrogen = 0;
let deuterium = 0;
let tritium = 0;

let helium = 0;

let beryllium = 0;

let animationId;
let pastTime;

let particles = [];
let atoms = [];

let distance;

let maxFps = 60;

let time = 0;

let startParticles = 1000;

let bigBang = true;



// Характеристики частицы:
    // 0, 1 - координаты
    // 2, 3 - скорость
    // 4 - тип
    // 5 - время жизни
    // 6 - время распада
    // 7 - масса

// Характеристики атома:
    // 0, 1 - координаты
    // 2, 3 - скорость
    // 4, 5 - состав(протоны, нейтроны)
    // 6 - время жизни
    // 7 - время распада
class Create {
    neutron(x, y, speedX, speedY) {
        particles.push([x, y, speedX, speedY, 0, 0, getRandomArbitrary(100, 10000), 1]);
    }
    proton(x, y, speedX, speedY) {
        particles.push([x, y, speedX, speedY, 1, 0, 1000000, 1]);
    }
    electron(x, y, speedX, speedY) {
        particles.push([x, y, speedX, speedY, -1, 0, 1000000, 0.0005]);
    }

    atom(x, y, speedX, speedY, mass, protons) {
        atoms.push([x, y, speedX, speedY, mass, protons]);
    }
}

class DeleteObject {
    particle(object) {
        particles.splice(particles.indexOf(object), 1);
    }
    atom(object) {
        atoms.splice(atoms.indexOf(object), 1);
    }
}
    
let create = new Create();
let deleteObject = new DeleteObject();

if (bigBang) {
    for (let i = 0; i < startParticles; i++) {
        create.neutron(canvas.width / 2, canvas.height / 2, 0, 0);
    }
}


window.onload = startAnimation;


function startAnimation() {
	frame();
	pastTime = 0;
}

function frame() {
	animationId = requestAnimationFrame(frame);

	let time = Date.now();
	let delta = time - pastTime;
	let fps = Math.floor(1000 / delta);

	if (fps <= maxFps) {
		draw();
		pastTime = Date.now();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    time += 1;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    neutrons = 0;
    protons = 0;
    electrons = 0;

    hidrogen = 0;
    deuterium = 0;
    tritium = 0;

    helium = 0;

    beryllium = 0;

    particlesMovement();
    atomsMovement();

    neutronsText.innerHTML = `Neutrons: ${neutrons}`;
    protonsText.innerHTML = `Protons: ${protons}`;
    electronsText.innerHTML = `Electrons: ${electrons}`;

    hidrogenText.innerHTML = `Hidrogen: ${hidrogen}`;
    deuteriumText.innerHTML = `Deuterium: ${deuterium}`;
    tritiumText.innerHTML = `Tritium: ${tritium}`;

    heliumText.innerHTML = `Helium: ${helium}`

    berylliumText.innerHTML = `Beryllium: ${beryllium}`
}

function particlesMovement() {
    particles.forEach(e => {
        e[5] += 1;
        if (e[4] == 0) {
            ctx.fillStyle = "green";
        }
        else if (e[4] == 1) {
            ctx.fillStyle = "#CD1D1D";
        }
        else if (e[4] == -1) {
            ctx.fillStyle = "blue";
        }
        ctx.fillRect(e[0], e[1], 2, 2);
        e[0] += e[2];
        e[1] += e[3];

        if (e[0] > canvas.width) {
            e[0] = 0;
        }
        if (e[1] > canvas.height) {
            e[1] = 0;
        }
        if (e[0] < 0) {
            e[0] = canvas.width;
        }
        if (e[1] < 0) {
            e[1] = canvas.height;
        }

        if (e[4] == 0 && e[5] >= e[6]) {
            create.proton(e[0] + 5, e[1], e[2], e[3])
            create.electron(e[0], e[1], -e[2], -e[3])
            deleteObject.particle(e);
        }

        if (e[4] == 0) {
            neutrons += 1;
        }
        else if (e[4] == 1) {
            protons += 1;
        }
        else if (e[4] == -1) {
            electrons += 1;
        }

        particles.forEach(object => {
                distance = Math.sqrt((object[0] - e[0])**2 + (object[1] - e[1])**2);
                // Кулоновское взаимодействие
                if (distance >= 3 && ((e[4] == 1 && object[4] == -1) || (e[4] == -1 && object[4] == 1))) {
                    force = 1 / distance

                    sin = (e[1] - object[1]) / distance;
                    cos = (e[0] - object[0]) / distance;
                    e[3] -= sin * force;
                    e[2] -= cos * force;
                }
                if (distance < 5 && distance != 0 && ((e[4] == 1 && object[4] == -1) || (e[4] == -1 && object[4] == 1))) {
                    create.atom(e[0], e[1], e[2], e[3], 1, 1);
                    deleteObject.particle(object);
                    deleteObject.particle(e);
                }
                else if (distance == 0 && time == 1) {
                    e[3] += getRandomArbitrary(-0.25, 0.25);
                    e[2] += getRandomArbitrary(-0.25, 0.25);
                }
        });

        // Появление дейтерия и трития
        atoms.forEach(atom => {
            distance = Math.sqrt((atom[0] - e[0])**2 + (atom[1] - e[1])**2);
            if (distance <= 1 && atom[5] == 1 && atom[4] < 3 && e[4] == 0 && Math.sqrt(e[2]**2 + e[3]**2) >= 5) {
                atom[4] += e[7];
                particles.splice(particles.indexOf(e), 1);

                if (atom[5] == 2) {
                    console.log(atom);
                }
            }
        });
    });
}

function atomsMovement() {
    atoms.forEach(e => {
        if (e[5] == 1) {
            ctx.fillStyle = "white";
        }
        else if (e[5] == 2) {
            ctx.fillStyle = "orange";
        }
        else if (e[5] == 4) {
            ctx.fillStyle = "blue";
        }
        // ctx.fillRect(e[0], e[1], e[4] * 2, e[4] * 2);
        ctx.beginPath();
        ctx.arc(e[0], e[1], e[4], 0, 2 * Math.PI, false);
        ctx.fill();

        e[0] += e[2];
        e[1] += e[3];

        if (e[0] > canvas.width) {
            e[0] = 0;
        }
        if (e[1] > canvas.height) {
            e[1] = 0;
        }
        if (e[0] < 0) {
            e[0] = canvas.width;
        }
        if (e[1] < 0) {
            e[1] = canvas.height;
        }

        if (e[4] == 1 && e[5] == 1) {
            hidrogen += 1;
        }
        else if (e[4] == 2 && e[5] == 1) {
            deuterium += 1;
        }
        else if (e[4] == 3 && e[5] == 1) {
            tritium += 1;
        }

        else if (e[4] == 4 && e[5] == 2) {
            helium += 1;
        }

        else if (e[4] == 8 && e[5] == 4) {
            beryllium += 1;
        }

        atoms.forEach(object => {
            distance = Math.sqrt((object[0] - e[0])**2 + (object[1] - e[1])**2);
            if (distance >= 2) {
                // Гравитационное взаимодействие

                force = 1 / (distance ** 2)

                sin = (e[1] - object[1]) / distance;
                cos = (e[0] - object[0]) / distance;
                e[3] -= sin * force;
                e[2] -= cos * force;
            }
            // Термоядерный синтез
            if (distance < 3 && e[5] == object[5] == 1 && e[4] == 3 && object[4] == 2) {
                create.atom(e[0], e[1], e[2], e[3], 4, 2);
                create.neutron(e[0], e[1], getRandomArbitrary(-e[2], e[2]), getRandomArbitrary(-e[3], e[3]));
                deleteObject.atom(e);
                deleteObject.atom(object);
            }
            // Синтез бериллия
            if (distance < 3 && e[5] == 2 && object[5] == 2 && e[4] == 4 && object[4] == 4 && e != object) {
                create.atom(e[0], e[1], e[2], e[3], 8, 4);
                deleteObject.atom(e);
                deleteObject.atom(object);
                console.log("aaaa")
            }
        });
    });
}

canvas.addEventListener('mousemove', function (e) {
    y1 = e.pageY - e.target.offsetTop;
    // y2 = y1;
})

document.addEventListener('keydown', function (event) {
    if (event.key == "p") {
        if (maxFps == -1) {
            maxFps = 60;
        }
        else {
            maxFps = -1;
        }
    }
})

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    create.neutron(x, y, getRandomArbitrary(-2, 2), getRandomArbitrary(-2, 2));
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


