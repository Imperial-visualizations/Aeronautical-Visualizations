let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.scale(1, 1);

function initPlot_trans() {
    /** --------------------------------- Set initial plot --------------------------------- **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Creates wall
    ctx.beginPath();
    ctx.moveTo(10,100);
    ctx.lineTo(10, 160);
    ctx.moveTo(10,100);
    ctx.lineTo(0,110);
    ctx.moveTo(10,110);
    ctx.lineTo(0,120);
    ctx.moveTo(10,120);
    ctx.lineTo(0,130);
    ctx.moveTo(10,130);
    ctx.lineTo(0,140);
    ctx.moveTo(10,140);
    ctx.lineTo(0,150);
    ctx.moveTo(10,150);
    ctx.lineTo(0,160);
    ctx.stroke();
// Damper
    ctx.beginPath();
    ctx.moveTo(10,110);
    ctx.lineTo(150,110);
    ctx.moveTo(150,100);
    ctx.lineTo(150,120);
    ctx.moveTo(150,100);
    ctx.lineTo(170,100);
    ctx.moveTo(150,120);
    ctx.lineTo(170,120);
    ctx.fillRect(152,102, 10, 16);
    ctx.moveTo(160,110);
    ctx.lineTo(280,110);
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("c", 155, 90);
    ctx.stroke();

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(10, 145);
    ctx.lineTo(100, 145);
    ctx.lineTo(105, 155);
    for (let i = 1; i < 11; i++) {
        ctx.lineTo(105 + 5 * i, 145 + 10 * Math.pow(-1, i))
    }
    ctx.lineTo(160, 145);
    ctx.lineTo(280, 145);
    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("k", 125, 175);
    ctx.stroke();

    /* Draw the mass */
    ctx.beginPath();
    ctx.moveTo(280, 100);
    ctx.lineTo(330, 100);
    ctx.lineTo(330, 150);
    ctx.lineTo(280, 150);
    ctx.lineTo(280, 100);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();

    // mass symbol
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("m", 295, 175);
    ctx.stroke();

    //draw the DoF arrow above the mass
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(300, 90);
    ctx.lineTo(300, 80);
    ctx.lineTo(340, 80);
    ctx.lineTo(330, 75);
    ctx.moveTo(340,80);
    ctx.lineTo(330,85);
    ctx.stroke();

    ctx.lineWidth = 1;

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("r, R", 305, 70);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(330,125);
    ctx.lineTo(360,125);
    ctx.lineTo(355,120);
    ctx.moveTo(360,125);
    ctx.lineTo(355,130);
     ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("R(t)", 375, 130);
    ctx.stroke();
}
let myReq_trans;
let startPause = document.getElementById("playPauseButton");

let t_end =100 ;
let t_init =0;
let w=[];
let i=0;
let r_0_forced=0; // boundary condition
let  v_0_forced=0; // boundary condition
let t=[];
let KS= []; // Energy spring
let KE=[]; // kinetic energy mass
let TotalE=[]; // Total energy of the system
let r_trans=[]; // displacement array
let v_trans=[]; //  velocity array
const n = 500 ; // number of points
let interval= ( t_end-t_init) /(n-1) ;
function Trans_resp() {
    // User input from HTML
    R = parseFloat(document.getElementById("Force").value);
    k = parseFloat(document.getElementById("SpringForced").value);
    c = parseFloat(document.getElementById("DampingForced").value);
    m = parseFloat(document.getElementById("MassForced").value);
    r_0_forced = parseFloat(document.getElementById("IniDispForced").value);
    v_0_forced = parseFloat(document.getElementById("IniVeloForced").value);
    for (i = 1; i < n; i++) {
        t[i] = t_init + interval * (i-1);
         if (t[i] === 0) {
             r_trans[i] = r_0_forced;
             v_trans[i] = v_0_forced;
         }
r_trans[i]=r_trans[i-1]
    }

}

