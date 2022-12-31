const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const massText = document.getElementById("mass");


const neutronsText = document.getElementById("neutrons");
const neutronColor = "#6CF46C";
neutronsText.style.color = neutronColor;

const protonsText = document.getElementById("protons");
const protonColor = "#F17865";
protonsText.style.color = protonColor;

const electronsText = document.getElementById("electrons");
const electronColor = "#6CE1F4";
electronsText.style.color = electronColor;


const hidrogenText = document.getElementById("hidrogen");
const hidrogenColor = "#FFFFFF";
const deuteriumText = document.getElementById("deuterium");
const tritiumText = document.getElementById("tritium");
hidrogenText.style.color = hidrogenColor;
deuteriumText.style.color = hidrogenColor;
tritiumText.style.color = hidrogenColor;

// const helium-3 = 
const heliumText = document.getElementById("helium");
const heliumColor = "#F4C271";
heliumText.style.color = heliumColor;

const berylliumText = document.getElementById("beryllium");
const berylliumColor = "#6CABF4";
berylliumText.style.color = berylliumColor;

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

let mouseGravity;

let x;
let y;

let mass = 0;

let scale = 1;

let cameraX = 0;
let cameraY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        particles.push([x, y, speedX, speedY, -1, 0, 1000000, 0]);
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
        create.neutron(0, 0, 0, 0);
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

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
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

    mass = 0;

    particlesMovement();
    atomsMovement();

    console.log(cameraX)

    neutronsText.innerHTML = `Neutrons: ${neutrons}`;
    protonsText.innerHTML = `Protons: ${protons}`;
    electronsText.innerHTML = `Electrons: ${electrons}`;

    hidrogenText.innerHTML = `Hidrogen: ${hidrogen}`;
    deuteriumText.innerHTML = `Deuterium: ${deuterium}`;
    tritiumText.innerHTML = `Tritium: ${tritium}`;

    heliumText.innerHTML = `Helium: ${helium}`;

    berylliumText.innerHTML = `Beryllium: ${beryllium}`;

    massText.innerHTML = `Mass: ${mass}`;
}

function particlesMovement() {
    particles.forEach(e => {
        e[5] += 1;
        if (e[4] == 0) {
            ctx.fillStyle = neutronColor;
        }
        else if (e[4] == 1) {
            ctx.fillStyle = protonColor;
        }
        else if (e[4] == -1) {
            ctx.fillStyle = electronColor;
        }
        ctx.fillRect((e[0] - cameraX) / scale + canvas.width / 2, (e[1] - cameraY) / scale + canvas.height / 2, 2, 2);
        e[0] += e[2];
        e[1] += e[3];

        if (e[4] == 0 && e[5] >= e[6]) {
            create.proton(e[0] + 5, e[1], e[2], e[3]);
            create.electron(e[0], e[1], -e[2], -e[3]);
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

        mass += e[7];

        particles.forEach(object => {
            distance = Math.sqrt((object[0] - e[0])**2 + (object[1] - e[1])**2);
            // Кулоновское взаимодействие
            if (distance >= 1) {
                force = 10 * -e[4] * object[4] / (distance ** 2);

                sin = (e[1] - object[1]) / distance;
                cos = (e[0] - object[0]) / distance;
                e[3] -= sin * force;
                e[2] -= cos * force;
            }

            if (distance > 20) {
                // Гравитационное взаимодействие

                force = 1 / (distance ** 2)

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
            if (distance <= 1 && atom[5] == 1 && atom[4] < 3 && e[4] == 0 && Math.abs(e[2]**2 + e[3]**2) >= 2) {
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
            ctx.fillStyle = hidrogenColor;
        }
        else if (e[5] == 2) {
            ctx.fillStyle = heliumColor;
        }
        else if (e[5] == 4) {
            ctx.fillStyle = berylliumColor;
        }

        hidrogenText.style.color = '#FFFFFF';
        heliumText.style.color = '#F4C271';
        
        ctx.beginPath();
        ctx.arc((e[0] - cameraX) / scale + canvas.width / 2, (e[1] - cameraY) / scale + canvas.height / 2, e[4], 0, 2 * Math.PI, false);
        ctx.fill();

        e[0] += e[2];
        e[1] += e[3];

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

        mass += e[4];

        atoms.forEach(object => {
            distance = Math.sqrt((object[0] - e[0])**2 + (object[1] - e[1])**2);
            if (distance > 20) {
                // Гравитационное взаимодействие

                force = 1 / (distance ** 2)

                sin = (e[1] - object[1]) / distance;
                cos = (e[0] - object[0]) / distance;
                e[3] -= sin * force;
                e[2] -= cos * force;
            }
            if (distance <= 20 && distance > 2) {
                force = 1 / (distance ** 2)

                sin = (e[1] - object[1]) / distance;
                cos = (e[0] - object[0]) / distance;
                e[3] += sin * force;
                e[2] += cos * force;
            }

            // Синтез гелия-3
            if (distance < 2 && e[5] == 1 && object[5] == 1 && e[4] == 2 && object[4] == 1 && e != object) {
                create.atom((e[0] + object[0])/2, (e[1] + object[1])/2, e[2] + object[2], e[3] + object[3], 3, 2);
                deleteObject.atom(e);
                deleteObject.atom(object);
            }
            // Синтез гелия
            if (distance < 2 && e[5] == object[5] == 1 && e[4] == 3 && object[4] == 2) {
                create.atom((e[0] + object[0])/2, (e[1] + object[1])/2, e[2] + object[2], e[3] + object[3], 4, 2);
                create.neutron(e[0], e[1], getRandomArbitrary(-e[2], e[2]), getRandomArbitrary(-e[3], e[3]));
                deleteObject.atom(e);
                deleteObject.atom(object);
            }
            // Синтез бериллия-7
            if (distance < 2 && e[5] == 2 && object[5] == 2 && e[4] == 3 && object[4] == 4 && e != object) {
                create.atom((e[0] + object[0])/2, (e[1] + object[1])/2, e[2] + object[2], e[3] + object[3], 7, 4);
                deleteObject.atom(e);
                deleteObject.atom(object);
            }
            // Синтез бериллия
            if (distance < 2 && e[5] == 2 && object[5] == 2 && e[4] == 4 && object[4] == 4 && e != object) {
                create.atom((e[0] + object[0])/2, (e[1] + object[1])/2, e[2] + object[2], e[3] + object[3], 8, 4);
                deleteObject.atom(e);
                deleteObject.atom(object);
            }
        });
    });
}

document.addEventListener('keydown', function (event) {
    if (event.key == "p") {
        if (maxFps == -1) {
            maxFps = 60;
        }
        else {
            maxFps = -1;
        }
    }
    else if (event.key == 'i') {
        particles.forEach(e => {
            e[2] *= -1;
            e[3] *= -1;
        });
    }
    else if (event.key == 'g') {
        scale *= 1.2;
    }
    else if (event.key == 'h') {
        scale /= 1.2;
    }
    else if (event.key == 'w') {
        cameraY -= 100 * scale;
    }
    else if (event.key == 'a') {
        cameraX -= 100 * scale;
    }
    else if (event.key == 's') {
        cameraY += 100 * scale;
    }
    else if (event.key == 'd') {
        cameraX += 100 * scale;
    }
    else if (event.key == 'h') {
        scale -= 1;
    }
    console.log(event)
})

canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
})

window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

document.addEventListener('wheel', function(event) {
    if (event.deltaY <= 0) {
        scale *= 1.2;
    }
    else {
        scale /= 1.2;
    }
})

canvas.addEventListener('mousedown', function(event) {
    if (event.buttons == 1) {
        create.neutron(x, y, getRandomArbitrary(-2, 2), getRandomArbitrary(-2, 2));
    }
    else if (event.buttons == 2) {
        mouseGravity = true;
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


