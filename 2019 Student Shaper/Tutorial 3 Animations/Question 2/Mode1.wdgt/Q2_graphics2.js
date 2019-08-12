/** ------------------------------------- Set variables ---------------------------------------**/
/** Calculations **/
let  A1 = 0;
let A2 = 0;
let s11 = 1;
let s21 = 1;
let t = [0,0];
let r2 = [0,0];
let theta2 = [0,0];
let dt = 0.015;
let x = 0;

let m = 4,
    J = 6.5,
    l = 1.4,
    EI = 8,

    /** Calculation of vibration frequencies **/
    a1 = 12 * EI / Math.pow(l,3),
    b1 = 4 * EI / l,
    a = m * b1 + J * a1,
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * J * (a1 * b1 - 36 * EI^2 / Math.pow(l,4))),
    c = 2 * m * J,
    omega1 = Math.sqrt((a - b) / c),
    omega2 = Math.sqrt((a + b) / c),

    d1 = (12 * EI / Math.pow(l,3) - Math.pow(omega1, 2) * m),
    d2 = (12 * EI / Math.pow(l,3) - Math.pow(omega2, 2) * m),
    e = - 6 * EI / Math.pow(l, 2),
    s12 = - d1 / e,
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
    r2 = A1 * Math.cos(omega1 * t) * s11 + A2 * Math.cos(omega2 * t) * s21;
    theta2 = A1 * Math.cos(omega1 * t) * s12 + A2 * Math.cos(omega2 * t) * s22;

   /** The animation function **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r2 = r2*10;

    /* Draw the nacelle */
    ctx.translate(250 + r2, 140);
    ctx.rotate(theta2);
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(51,102,153,0.3)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 65, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(51,102,153,0.3)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 65, Math.PI, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(51,102,153,0.6)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    //support for nacelle
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-9, 0);
    ctx.lineTo(-4, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(0, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-1, 0);
    ctx.lineTo(4, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(3, 0);
    ctx.lineTo(8, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(12, -5);
    ctx.stroke();

    ctx.restore();

    /* Draw the trace of DoF r */
    ctx.beginPath();
    if (r2 > 0){
        ctx.moveTo(233 + r2, 37.5);
        ctx.lineTo(250 + r2, 37.5);
        ctx.lineTo(250 + r2, 30);
        ctx.lineTo(265 + r2, 42.5);
        ctx.lineTo(250 + r2, 55);
        ctx.lineTo(250 + r2, 47.5);
        ctx.lineTo(233 + r2, 47.5);
        ctx.lineTo(233 + r2, 37.5);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    if (r2 < 0){
        ctx.moveTo(267 + r2, 37.5);
        ctx.lineTo(250 + r2, 37.5);
        ctx.lineTo(250 + r2, 30);
        ctx.lineTo(235 + r2, 42.5);
        ctx.lineTo(250 + r2, 55);
        ctx.lineTo(250 + r2, 47.5);
        ctx.lineTo(267 + r2, 47.5);
        ctx.lineTo(267 + r2, 37.5);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    /* Draw the trace of DoF theta */
    if (theta2 > 0){
        ctx.beginPath();
        ctx.arc(250 + r2, 140, 80, -6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 90, 6 * Math.PI / 180, -6 * Math.PI / 180, true);
        ctx.arc(250 + r2, 140, 80, -6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250 + r2, 140, 73, 6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 97, 6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 85, 14 * Math.PI / 180, 14 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 73, 6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    if (theta2 < 0){
        ctx.beginPath();
        ctx.arc(250 + r2, 140, 80, -6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 90, 6 * Math.PI / 180, -6 * Math.PI / 180, true);
        ctx.arc(250 + r2, 140, 80, -6 * Math.PI / 180, 6 * Math.PI / 180);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(250 + r2, 140, 73, -6 * Math.PI / 180, -6 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 97, -6 * Math.PI / 180, -6 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 85, -14 * Math.PI / 180, -14 * Math.PI / 180);
        ctx.arc(250 + r2, 140, 73, -6 * Math.PI / 180, -6 * Math.PI / 180);
        ctx.fillStyle = "rgba(16,78,139,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(16,78,139,1)";
        ctx.stroke();
    }

    /* Draw the rod */
    ctx.beginPath();
    ctx.moveTo(250 + r2, 140);
    ctx.lineTo(250, 430);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();

    /* Draw the supports */
    //ground support
    ctx.beginPath();
    ctx.moveTo(220, 430);
    ctx.lineTo(280, 430);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(228, 430);
    ctx.lineTo(220, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(235, 430);
    ctx.lineTo(227, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(242, 430);
    ctx.lineTo(234, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(249, 430);
    ctx.lineTo(241, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(256, 430);
    ctx.lineTo(248, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(263, 430);
    ctx.lineTo(255, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(270, 430);
    ctx.lineTo(262, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(277, 430);
    ctx.lineTo(269, 441);
    ctx.stroke();

    x += 1;

    myReq = requestAnimationFrame(animateModes1);
    return
}

animateModes1();
