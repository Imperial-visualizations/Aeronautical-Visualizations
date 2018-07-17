let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.scale(1.15, 1.15);

function initPlot() {
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
    ctx.lineTo(40,110);
    ctx.moveTo(40,100);
    ctx.lineTo(40,120);
    ctx.moveTo(40,100);
    ctx.lineTo(60,100);
    ctx.moveTo(40,120);
    ctx.lineTo(60,120);
    ctx.fillRect(42,102, 10, 16);
    ctx.moveTo(50,110);
    ctx.lineTo(130,110);
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("c", 45, 90);
    ctx.stroke();

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(10, 145);
    ctx.lineTo(40, 145);
    ctx.lineTo(45, 155);
    for (let i = 1; i < 11; i++) {
        ctx.lineTo(45 + 5 * i, 145 + 10 * Math.pow(-1, i))
    }
    ctx.lineTo(100, 145);
    ctx.lineTo(130, 145);
    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("k", 65, 175);
    ctx.stroke();

    /* Draw the mass */
    ctx.beginPath();
    ctx.moveTo(130, 100);
    ctx.lineTo(180, 100);
    ctx.lineTo(180, 150);
    ctx.lineTo(130, 150);
    ctx.lineTo(130, 100);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();

    // mass symbol
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("m", 160, 175);
    ctx.stroke();

    //draw the DoF arrow above the mass
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(155, 90);
    ctx.lineTo(155, 80);
    ctx.lineTo(195, 80);
    ctx.lineTo(190, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(195, 80);
    ctx.lineTo(190, 85);
    ctx.stroke();

    ctx.lineWidth = 1;

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("r, R", 155, 70);
    ctx.stroke();

}
initPlot();
let resp_layout = {
    autosize: true,
    legend: {x: 0, y: 6, "orientation": "h"},
    margin: {l:40 ,r:40 ,t:80 , b:80 },
    yaxis: {nticks: 8},
    xaxis: {range: [0.01, 15],
        nticks: 8,
        title: "Time (s)", titlefont: {size: 14} }
};

let myReq;
let startPause = document.getElementById("playPauseButton");

// Section for the graph acceleration/velocity/displacement VS time
// define/initialize Variables
let k =0;
let c =0 ;
let m =0;
let t_end =100 ;
let t_init =0;
let v_0 =0;
let r_0 =0;
const n = 5000 ; // number of points
let omega = Math.sqrt(k/m);
let interval= ( t_end-t_init) /(n-1) ;  // creates time intervals for the for loop
let alpha =0;
let beta=0;
let r= []; // displacement array
let v=[]; // velocity array
let a=[]; // acceleration array
let t=[];
let roc =0;
let p1=0;  // first real solution of the heavy damping case
let p2=0; // second real solution of the heavy damping case
let r01=0; // first constant in the heavy damping case (from BC)
let r02=0; // second constant in the heavy damping case (from BC)
let p0=0;
let KS= []; // Energy spring
let T=[]; // kinetic energy mass
let D=[]; // Damping energy
let TotalE=[]; // Total energy of the system
Plotly.plot('AcceVeloDisp', [{x: parseFloat(document.getElementById("IniDisp").value), y: t_init}], resp_layout, {displayModeBar: false});
Plotly.plot('EnergyFree' ,[{y: 0, x: t_init},{y: 0,x:t_init},{y: 0, x:t_init},{y:0, x:t_init}],resp_layout, {displayModeBar: false});
function response_mass() {
    // Get variables from the HTML. User input
    k = parseFloat(document.getElementById("Spring").value);
    c = parseFloat(document.getElementById("Damping").value);
    m = parseFloat(document.getElementById("Mass").value);
    // Initial displacement and velocity (user input as well)
    v_0 = parseFloat(document.getElementById("IniDisp").value);
    r_0 = parseFloat(document.getElementById("IniVelo").value);
    //  let omega = Math.sqrt(k/m);


    //Consider 3 cases depending on sign of the discriminant, assuming a solution of the form r*e^(a t) and solving ODE
    if (Math.pow(c, 2) < 4 * k * m) {  // lightly damped damping

        for (let i = 0; i < 100000; i++) { //setup loop, starts at t=0, until last time,
            t[i] = t_init + interval * i;
            if (t[i] === 0) { //This loop will refresh the value of initial displacement once the simulation is started
                alpha = -c / (2 * m);
                v[i] = v_0;
                beta = (1 / 2 * m) * Math.sqrt(4 * k * m - Math.pow(c, 2));
                roc = (v_0 - r_0 * alpha) / beta;
            }
            else

                alpha = -c / (2 * m);
            roc = (v_0 - r_0 * alpha) / beta;  //from boundary conditions
            beta = (1 / 2 * m) * Math.sqrt(4 * k * m - Math.pow(c, 2));
            r[i] = r_0 * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) + ((v_0 - r_0 * alpha) / beta) * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]); //expression for the displacement
            v[i] = r_0 * (alpha * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) - beta * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) + roc * (alpha * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) + Math.exp(alpha * t[i]) * beta * Math.cos(beta * t[i])));
            a[i] = r_0 * (Math.pow(alpha, 2) * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) - 2 * alpha * beta * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) - Math.pow(beta, 2) * Math.exp(alpha * t[i]) * Math.cos(beta * t[i])) + roc * (Math.pow(alpha, 2) * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) + 2 * alpha * beta * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) - Math.pow(beta, 2) * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]));

        }
        // ADD third case if discriminant is 0
    }

    else if (Math.pow(c, 2) > 4 * k * m) { // heavy damping

        for (let i = 0; i < n; i++) {

            t[i] = t_init + interval * i;
            if (t[i] === 0) {
                r01 = (v_0 - (p2 * r_0)) / (p1 - p2);
                r02 = (r_0 - r01);
                v[i] = v_0;
            }
            else
                p1 = (1 / 2 * m) * (-c + Math.sqrt(Math.pow(c, 2) - 4 * k * m));
            p2 = (1 / 2 * m) * (-c - Math.sqrt(Math.pow(c, 2) - 4 * k * m));
            r01 = (v_0 - (p2 * r_0)) / (p1 - p2);
            r02 = (r_0 - r01);
            r[i] = r01 * Math.exp(p1 * t[i]) + r02 * Math.exp(p2 * t[i]); //displacement
            v[i] = p1 * r01 * Math.exp(p1 * t[i]) + p2 * r02 * Math.exp(p2 * t[i]); //velocity
            a[i] = Math.pow(p1, 2) * r01 * Math.exp(p1 * t[i]) + Math.pow(p2, 2) * r02 * Math.exp(p2 * t[i]); //acceleration
        }
    }
    else if (Math.pow(c, 2) === 4 * k * m) { // critical damping
        for (let i = 0; i < n; i++) {
            t[i] = t_init + interval * i;
            if (t[i] === 0) {
                //r_0_ani = document.getElementById("IniDisp").value;
                v[i] = v_0;
                r[i] = r_0;
            }
            else
                p0 = -c / (2 * m);
            r[i] = r_0 * Math.exp(p0 * t[i]);
            v[i] = r_0 * p0 * Math.exp(p0 * t[i]);
            a[i] = r_0 * Math.pow(p0, 2) * Math.exp(p0 * t[i]);
        }
    }

// Energy calculations (
    KS[0] = 0.5 * k * Math.pow(r[0], 2);
    T[0] = 0.5 * m * Math.pow(v[0], 2);
    D[0] = c * v[0] * r[0];
    TotalE[0] = KS[0] + T[0] + D[0];
    for (i = 1; i < n; i++) {
        KS[i] = 0.5 * k * Math.pow(r[i], 2); //spring
        T[i] = 0.5 * m * Math.pow(v[i], 2); // mass
        D[i] = D[i - 1] + c * v[i] * (r[i] - r[i - 1]); // damper
        TotalE[i] = KS[i] + T[i] + D[i];
    }

    let trace_te = {
        x: t,
        y: TotalE,
        type: "scatter",
        name: "Strain energy spring",
        mode: "lines",
    };
    let trace_ks = {
        x: t,
        y: KS,
        type: "scatter",
        name: "Strain energy spring",
        mode: "lines",
    };
    let trace_ke = {
        x: t,
        y: T,
        type: "scatter",
        name: "Kinetic energy mass",
        mode: "lines",
    };
    let trace_d = {
        x: t,
        y: D,
        type: "scatter",
        name: "Damping",
        mode: "lines",
    };
//store the data for r as traces
    let trace_r = {
        x: t,
        y: r,
        type: "scatter",
        name: "Displacement",
        mode: "lines",
    };

    let trace_r1 = {
        x: t,
        y: v,
        type: "scatter",
        name: "Velocity",
        mode: "lines",
    };

    let trace_r2 = {
        x: t,
        y: a,
        type: "scatter",
        name: "Acceleration",
        mode: "lines",
    };
    console.log(D);
    Plotly.animate(div = "AcceVeloDisp", {
        data: [trace_r, trace_r1, trace_r2],
        traces: [0, 1, 2],
        layout: {}
    }, {
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
    });

    Plotly.relayout('AcceVeloDisp', {
        'yaxis.autorange': true
    });
    Plotly.animate(div = "EnergyFree", {
        data: [trace_ke, trace_ks, trace_d, trace_te],
        traces: [0, 1, 2],
        layout: {}
    }, {
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
    });


}
/** plot the function **/
/* general layout */


/* plot */


/** The animation function **/
let x = 1;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r[x] = r[x] * 100;
    // wall
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Creates wall
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
    ctx.lineTo(40,110);
    ctx.moveTo(40,100);
    ctx.lineTo(40,120);
    ctx.moveTo(40,100);
    ctx.lineTo(60,100);
    ctx.moveTo(40,120);
    ctx.lineTo(60,120);
    ctx.fillRect(42,102, 10, 16);
    ctx.moveTo(50,110);
    ctx.lineTo(130 +r[x],110);
    ctx.stroke();

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(10, 145);
    ctx.lineTo(40, 145);
    ctx.lineTo(45, 155);
    for (let i = 1; i < 11; i++) {
        ctx.lineTo(45 + 5 * i + (r[x]+i+1), 145 + 10 * Math.pow(-1, i))
    }
    ctx.lineTo(100 +r[x], 145);
    ctx.lineTo(130 +r[x], 145);
    ctx.stroke();

    /* Draw the mass */
    ctx.beginPath();
    ctx.moveTo(130 +r[x], 100);
    ctx.lineTo(180+r[x], 100);
    ctx.lineTo(180+r[x], 150);
    ctx.lineTo(130+r[x], 150);
    ctx.lineTo(130+r[x], 100);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();
    x += 1;

    myReq = requestAnimationFrame(animate);
}
function startAnime(){
    if(startPause.textContent === "Start"){
        requestAnimationFrame(animate);
        startPause.textContent = "Pause";
    }
    else{
        cancelAnimationFrame(myReq);
        startPause.textContent = "Start"
    }
}

function stopAnime() {
    /* Set initial plot */
    x = 0;
    cancelAnimationFrame(myReq);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initPlot();
    startPause.textContent = "Start";}


    