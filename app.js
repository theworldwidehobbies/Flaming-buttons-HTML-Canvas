//variables

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let buttons = document.querySelectorAll("button");
let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let btn3 = document.getElementById("3");
let generating = false;
let generating2 = false;
let generating3 = false;
let btn1_x = btn1.getBoundingClientRect().left + 10;
let btn1_y = btn1.getBoundingClientRect().top + 30;
let btn2_x = btn2.getBoundingClientRect().left + 10; // Corrected from btn1 to btn2
let btn2_y = btn2.getBoundingClientRect().top + 30; // Corrected from btn1 to btn2
let btn3_x = btn3.getBoundingClientRect().left + 10; // Corrected from btn1 to btn3
let btn3_y = btn3.getBoundingClientRect().top + 30; // Corrected from btn1 to btn3

let btn1Array = [];
let btn2Array = [];
let btn3Array = [];


let hue = 0;
//event listeners
window.addEventListener("resize", () => {
    btn1_x = btn1.getBoundingClientRect().left + 10;
    btn1_y = btn1.getBoundingClientRect().top + 30;
    btn2_x = btn2.getBoundingClientRect().left + 10;
    btn2_y = btn2.getBoundingClientRect().top + 30;
    btn3_x = btn3.getBoundingClientRect().left + 10;
    btn3_y = btn3.getBoundingClientRect().top + 30;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
btn1.addEventListener("mouseenter", () => {
    generating = true;
})
btn1.addEventListener("mouseleave", () => {
    generating = false;
})

btn2.addEventListener("mouseenter", () => {
    generating2 = true;
})
btn2.addEventListener("mouseleave", () => {
    generating2 = false;
})

btn3.addEventListener("mouseenter", () => {
    generating3 = true;
})
btn3.addEventListener("mouseleave", () => {
    generating3 = false;
})


//classes
class ParticleBtn1 {
    constructor() {
        this.x = Math.random() * (btn1_x + 250 - btn1_x) + btn1_x;
        this.y = btn1_y;
        this.size = Math.random() * 25; // Corrected from Math.random*30 to Math.random() * 30
        this.speedX = 3;
        this.speedY = 3;
    }

    update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        if (this.size > 0.3) {
            this.size -= 0.3;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "orange"; // Corrected from strokeStyle to fillStyle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
class ParticleBtn2 {
    constructor() {
        this.x = Math.random() * (btn2_x + 250 - btn2_x) + btn2_x;
        this.y = btn2_y;
        this.size = Math.random() * 25; // Corrected from Math.random*30 to Math.random() * 30
        this.speedX = 3;
        this.speedY = 3;
    }

    update() {
        // this.x += this.speedX;
        this.y -= this.speedY;
        if (this.size > 0.3) {
            this.size -= 0.3;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue},100%,50%)`; // Corrected from strokeStyle to fillStyle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
class ParticleBtn3 {
    constructor() {
        this.x = Math.random() * (btn3_x + 250 - btn3_x) + btn3_x;
        this.y = btn3_y;
        this.size = Math.random() * 25; // Corrected from Math.random*30 to Math.random() * 30
        this.speedX = 3;
        this.speedY = 3;
    }

    update() {
        this.x -= this.speedX;
        this.y -= this.speedY;
        if (this.size > 0.3) {
            this.size -= 0.3;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "lightblue"; // Corrected from strokeStyle to fillStyle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

//functions

function checking() {
    if (generating == true) {
        for (let i = 0; i < 5; i++) {
            btn1Array.push(new ParticleBtn1())
        }
    }
    if (generating2 == true) {
        for (let i = 0; i < 5; i++) {
            btn2Array.push(new ParticleBtn2())
        }
    }
    if (generating3 == true) {
        for (let i = 0; i < 5; i++) {
            btn3Array.push(new ParticleBtn3())
        }
    }
}

function handling() {
    btn1Array.forEach(btn => {
        btn.draw();
        btn.update();
    })
    btn2Array.forEach(btn => {
        btn.draw();
        btn.update();
    })
    btn3Array.forEach(btn => {
        btn.draw();
        btn.update();
    })
    for (let i = 0; i < btn1Array.length; i++) {
        if (btn1Array[i].size <= 0.3) {
            btn1Array.splice(i, 1);
        }
    }
    for (let i = 0; i < btn2Array.length; i++) {
        if (btn2Array[i].size <= 0.3) {
            btn2Array.splice(i, 1);
        }
    }
    for (let i = 0; i < btn3Array.length; i++) {
        if (btn3Array[i].size <= 0.3) {
            btn3Array.splice(i, 1);
        }
    }
}
function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(btn1Array.length)
    handling();
    checking();
    requestAnimationFrame(erase);
    hue += 4;
    if (hue >= 360) {
        hue = 0;
    }
}

erase();


