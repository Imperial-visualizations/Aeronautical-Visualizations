/** ------------------------------------- Set variables ---------------------------------------**/
/** Calculations **/
let  A1 = 0;
let A2 = 0;
let s11 = 1;
let s21 = 1;
let t = [0,0];
let r = [0,0];
let theta = [0,0];
let dt = 0.025;
let i = 0;
let x = 0;

let m = 4,
    I = 6.5,
    k = 8,
    k_theta = 8,
    l = 1.5,

    /* Calculation of vibration frequencies */
    a = m * (k_theta + k * Math.pow(l, 2)) + I * k,
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * I * k * k_theta),
    c = 2 * m * I,
    omega1 = Math.sqrt((a - b) / c),
    omega2 = Math.sqrt((a + b) / c),

    /* Calculation of eigenvectors */
    d1 = (k - Math.pow(omega1, 2) * m),
    e = -k * l,
    s12 = - d1 / e,

    d2 = (k - Math.pow(omega2, 2) * m),
    s22 = - d2 / e;

/** Set canvas variables **/
let canvas;
let ctx;

//Scale the canvas
//ctx.scale(1.1, 1.1);

/** 1st Mode **/
function animateModes1(){
    /** Change canvas variables **/
    A1 = 1; A2 = 0;
    canvas = document.querySelectorAll('canvas')[0];
    ctx = canvas.getContext('2d');

    /** Calculation of the responses r and theta **/
    //Set time interval
    t = x * dt;

    //displacements
    r = A1 * Math.cos(omega1 * t) * s11 + A2 * Math.cos(omega2 * t) * s21;
    theta = A1 * Math.cos(omega1 * t) * s12 + A2 * Math.cos(omega2 * t) * s22;

    /** The animation function **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r = r*10;
    theta = theta*10;

    /* Draw the mass */
    ctx.beginPath();
    ctx.moveTo(70 + r, 100);
    ctx.lineTo(120 + r, 100);
    ctx.lineTo(120 + r, 150);
    ctx.lineTo(70 + r, 150);
    ctx.lineTo(70 + r, 100);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

     /* Draw the trace of mass */
    ctx.beginPath();
    if (r > 0){
        ctx.moveTo(78 + r, 47.5);
        ctx.lineTo(95 + r, 47.5);
        ctx.lineTo(95 + r, 40);
        ctx.lineTo(110 + r, 52.5);
        ctx.lineTo(95 + r, 65);
        ctx.lineTo(95 + r, 57.5);
        ctx.lineTo(78 + r, 57.5);
        ctx.lineTo(78 + r, 47.5);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    if (r < 0){
        ctx.moveTo(107 + r, 47.5);
        ctx.lineTo(90 + r, 47.5);
        ctx.lineTo(90 + r, 40);
        ctx.lineTo(75 + r, 52.5);
        ctx.lineTo(90 + r, 65);
        ctx.lineTo(90 + r, 57.5);
        ctx.lineTo(107 + r, 57.5);
        ctx.lineTo(107 + r, 47.5);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(120 + r, 125);
    ctx.lineTo(150 + r, 125);
    ctx.lineTo(155 + (r + (theta*l - r)/12), 140);
    for (i = 1; i < 11; i++){
        ctx.lineTo(155 + 10*i + (r + (i + 1)*(theta*l - r)/12), 125 + 15*Math.pow(-1,i))
    }
    ctx.lineTo(260 + theta*l, 125);
    ctx.lineTo(290 + theta*l, 125);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.save();

    /* Draw the rigid rod */
    //rotate the rigid bar
    ctx.translate(290, 360);
    ctx.rotate(Math.atan(l*theta/235));
    ctx.beginPath();
    ctx.ellipse(0, -120, 15, 130, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.restore();

    /* Draw the trace of rod */
    ctx.beginPath();
    if (theta*l > 0){
        ctx.moveTo(273 + theta*l, 47.5);
        ctx.lineTo(290 + theta*l, 47.5);
        ctx.lineTo(290 + theta*l, 40);
        ctx.lineTo(305 + theta*l, 52.5);
        ctx.lineTo(290 + theta*l, 65);
        ctx.lineTo(290 + theta*l, 57.5);
        ctx.lineTo(273 + theta*l, 57.5);
        ctx.lineTo(273 + theta*l, 47.5);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    if (theta*l < 0){
        ctx.moveTo(302 + theta*l, 47.5);
        ctx.lineTo(285 + theta*l, 47.5);
        ctx.lineTo(285 + theta*l, 40);
        ctx.lineTo(270 + theta*l, 52.5);
        ctx.lineTo(285 + theta*l, 65);
        ctx.lineTo(285 + theta*l, 57.5);
        ctx.lineTo(302 + theta*l, 57.5);
        ctx.lineTo(302 + theta*l, 47.5);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    /* Draw the support of rigid rod */
    //Draw the connections (circles)
    ctx.beginPath();
    ctx.arc(290 + theta*l, 125, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(290, 360, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    //Draw a triangle
    ctx.beginPath();
    ctx.moveTo(290, 360);
    ctx.lineTo(318, 395);
    ctx.lineTo(262, 395);
    ctx.lineTo(290, 360);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    //Draw the ground
    ctx.beginPath();
    ctx.moveTo(273, 395);
    ctx.lineTo(263, 405);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(283, 395);
    ctx.lineTo(273, 405);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(293, 395);
    ctx.lineTo(283, 405);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(303, 395);
    ctx.lineTo(293, 405);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(313, 395);
    ctx.lineTo(303, 405);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.save();

    //Draw the rotational spring
    ctx.translate(290, 360);
    ctx.rotate(40*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(-5, 40);
    ctx.rotate(5*Math.PI/180 + Math.atan(theta*l/235)/22);
    ctx.lineTo(-3, 47);
    ctx.rotate(3*Math.PI/180 + Math.atan(theta*l/235)/22);
    for (i = 1; i <= 20; i++){
        ctx.lineTo(-5, 40 + 7*Math.pow(-1, i));
        ctx.rotate(5*Math.PI/180 + Math.atan(theta*l/235)/22);
    }
    ctx.rotate(2*Math.PI/180 + Math.atan(theta*l/235)/22);
    ctx.lineTo(-3, 40);
    ctx.rotate(3*Math.PI/180 + Math.atan(theta*l/235)/22);
    ctx.lineTo(-7, 40);

    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.restore();

    x += 1;

    myReq = requestAnimationFrame(animateModes1);
    return
}

animateModes1();
