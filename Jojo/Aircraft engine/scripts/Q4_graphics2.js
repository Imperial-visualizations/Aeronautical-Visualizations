/** ------------------------------------- Set variables ---------------------------------------**/
/** Calculations **/
let  A1 = 0;
let A2 = 0;
let s11 = 1, s12 = 0;
let s21 = 0, s22 = 1;
let t2 = [0,0];
let r2 = [0,0];
let rr2 = [0,0];
let dt = 0.025;
let i = 0;
let x = 0;

let m = 4,
    EA = 7,
    l = 1.5,

    /** Calculation of vibration frequencies **/
    //The 2 DoF are uncoupled, so the vibration frequencies are the same
    k = 2 * Math.sqrt(2) * EA / l;
    omega1 = Math.sqrt(k / m);
    omega2 = Math.sqrt(k / m);

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
    t2 = x * dt;

    //displacements
    let r2 = A1 * Math.cos(omega1 * t2) * s11 + A2 * Math.cos(omega2 * t2) * s21;
    let rr2 = A1 * Math.cos(omega1 * t2) * s12 + A2 * Math.cos(omega2 * t2) * s22;

    console.log("hi");

    /** The animation function **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r2 = r2*10;
    rr2 = rr2*10;

    /* Draw the mass */
    ctx.beginPath();
    ctx.arc(260 + r2, 200 - rr2, 10, 0, 2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

     /* Draw the frame */
    ctx.beginPath();
    ctx.moveTo(140, 80);
    ctx.lineTo(380, 80);
    ctx.lineTo(380, 320);
    ctx.lineTo(140, 320);
    ctx.lineTo(140, 80);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* Draw the rods */
    ctx.beginPath();
    ctx.moveTo(140, 80);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 80);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 320);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 320);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    /* Draw the supports */
    //Support 1
    ctx.translate(140, 80);
    ctx.rotate(135 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.rotate(-135 * Math.PI / 180);

    //Support 2
    ctx.translate(240, 0);
    ctx.rotate(225 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.rotate(-225 * Math.PI / 180);

    //Support 3
    ctx.translate(0, 240);
    ctx.rotate(315 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.rotate(-315 * Math.PI / 180);

    //Support 4
    ctx.translate(-240, 0);
    ctx.rotate(45 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.restore();
    //x += 1;
    console.log("hello1");

    myReq = requestAnimationFrame(animateModes1);
    return
}

animateModes1();



/** 2nd Mode **/
function animateModes2(){
    /** Change canvas variables **/
    A1 = 0; A2 = 1;
    canvas = document.querySelectorAll('canvas')[1];
    ctx = canvas.getContext('2d');

    /** Calculation of the responses r and theta **/
    //Set time interval
    t2 = x * dt;

    //displacements
    let r2 = A1 * Math.cos(omega1 * t2) * s11 + A2 * Math.cos(omega2 * t2) * s21;
    let rr2 = A1 * Math.cos(omega1 * t2) * s12 + A2 * Math.cos(omega2 * t2) * s22;

    console.log("hi");

    /** The animation function **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r2 = r2*10;
    rr2 = rr2*10;

    /* Draw the mass */
    ctx.beginPath();
    ctx.arc(260 + r2, 200 - rr2, 10, 0, 2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

     /* Draw the frame */
    ctx.beginPath();
    ctx.moveTo(140, 80);
    ctx.lineTo(380, 80);
    ctx.lineTo(380, 320);
    ctx.lineTo(140, 320);
    ctx.lineTo(140, 80);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* Draw the rods */
    ctx.beginPath();
    ctx.moveTo(140, 80);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 80);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 320);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 320);
    ctx.lineTo(260 + r2, 200 - rr2);
    ctx.stroke();

    /* Draw the supports */
    //Support 1
    ctx.translate(140, 80);
    ctx.rotate(135 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.rotate(-135 * Math.PI / 180);

    //Support 2
    ctx.translate(240, 0);
    ctx.rotate(225 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.rotate(-225 * Math.PI / 180);

    //Support 3
    ctx.translate(0, 240);
    ctx.rotate(315 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.rotate(-315 * Math.PI / 180);

    //Support 4
    ctx.translate(-240, 0);
    ctx.rotate(45 * Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 25);
    ctx.lineTo(-18, 25);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-11, 25);
    ctx.lineTo(-20, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-3, 25);
    ctx.lineTo(-12, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6, 25);
    ctx.lineTo(-4, 34);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(14, 25);
    ctx.lineTo(5, 34);
    ctx.stroke();

    ctx.restore();

    x += 1;
    console.log("hello2");

    myReq = requestAnimationFrame(animateModes2);
    return
}


animateModes2();