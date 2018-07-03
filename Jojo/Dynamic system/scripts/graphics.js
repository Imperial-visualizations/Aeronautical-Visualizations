
/** ------------------------- Plot the displacement against time ------------------------ **/
/** Set variables**/
let  A1 = 50;
let a = 0 ;
let b = 0;
let c = 0;
let d1 = 0;
let d2 = 0;
let e = 0;
let A2 = 50;
let omega1 = 0;
let omega2 = 0;
let s11 = 1;
let s12 = 0;
let s21 = 1;
let s22 =1;
let t = [0,0];
let r = [0,0];
let r1 = [0,0];
let r2 = [0,0];
let theta = [0,0];
let theta1 = [0,0];
let theta2 = [0,0];
let t_init = 0;
let t_end = 100;
let n = 500;
let interval=(t_end-t_init)/(n-1);
let m;
let I;
let k;
let k_theta;
let l;

/** Calculation of the responses r and theta **/
function calcu_resp() {
    /* Store inputs in variables */
    m = document.getElementById("m").value;
    I = document.getElementById("I").value;
    k = document.getElementById("k").value;
    k_theta = document.getElementById("k_theta").value;
    l = document.getElementById("L").value;
    A2 = document.getElementById("mode1").value;

    /* Calculation of vibration frequencies */
    a = m * (k_theta + k * Math.pow(l, 2)) + I * k;
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * I * k * (k_theta + k * Math.pow(l, 2)));
    c = 2 * m * I;
    omega1 = Math.sqrt((a + b) / c);
    omega2 = Math.sqrt((a - b) / c);

    /* Calculation of eigenvectors */
    d1 = (k - Math.pow(omega1, 2) * m);
    e = -k * l;
    s12 = -d1 / e;

    d2 = (k - Math.pow(omega2, 2) * m);
    e = -k * l;
    s22 = -d2 / e;

    /* Calculations of responses */
    A1 = 100 - A2;

    //Response of DoF r
    for (i = 0; i < n; i++) {
        t[i] = t_init + i * interval;
        r[i] = (A1 / 100) * Math.cos(omega1 * t[i]) * s11 + (A2 / 100) * Math.cos(omega2 * t[i]) * s21;
        r1[i] = -omega1 * (A1 / 100) * Math.sin(omega1 * t[i]) * s11 - omega2 * (A2 / 100) * Math.sin(omega2 * t[i]) * s21;
        r2[i] = -Math.pow(omega1, 2) * (A1 / 100) * Math.cos(omega1 * t[i]) * s11 - Math.pow(omega1, 2) * (A2 / 100) * Math.cos(omega2 * t[i]) * s21;
    }

    //Response of DoF theta
    for (j = 0; j < n; j++) {
        t[j] = t_init + j * interval;
        theta[j] = (A1 / 100) * Math.cos(omega1 * t[j]) * s12 + (A2 / 100) * Math.cos(omega2 * t[j]) * s22;
        theta1[j] = -omega1 * (A1 / 100) * Math.sin(omega1 * t[j]) * s12 - omega2 * (A2 / 100) * Math.sin(omega2 * t[j]) * s22;
        theta2[j] = -Math.pow(omega1, 2) * (A1 / 100) * Math.cos(omega1 * t[j]) * s12 - Math.pow(omega1, 2) * (A2 / 100) * Math.cos(omega2 * t[j]) * s22;
    }

    //Update the graph immediately after the parameters change
    Plotly.animate(div = "plot_r", {
        data: [trace_r, trace_r1, trace_r2],
        traces: [0, 1, 2],
        layout: {}
    }, {
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
    });

    Plotly.relayout( 'plot_r', {
        'yaxis.autorange': true
    });

}


function calcu_resp2() {

    /* Store inputs in variables */
    m = document.getElementById("m").value;
    I = document.getElementById("I").value;
    k = document.getElementById("k").value;
    k_theta = document.getElementById("k_theta").value;
    l = document.getElementById("L").value;
    A2 = document.getElementById("mode1").value;

    /* Calculation of vibration frequencies */
    a = m * (k_theta + k * Math.pow(l, 2)) + I * k;
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * I * k * (k_theta + k * Math.pow(l, 2)));
    c = 2 * m * I;
    omega1 = Math.sqrt((a + b) / c);
    omega2 = Math.sqrt((a - b) / c);

    /* Calculation of eigenvectors */
    d1 = (k - Math.pow(omega1, 2) * m);
    e = -k * l;
    s12 = -d1 / e;

    d2 = (k - Math.pow(omega2, 2) * m);
    e = -k * l;
    s22 = -d2 / e;

    /* Calculations of responses */
    A1 = 100 - A2;


    //Response of DoF theta
    for (j = 0; j < n; j++) {
        t[j] = t_init + j * interval;
        theta[j] = (A1 / 100) * Math.cos(omega1 * t[j]) * s12 + (A2 / 100) * Math.cos(omega2 * t[j]) * s22;
        theta1[j] = -omega1 * (A1 / 100) * Math.sin(omega1 * t[j]) * s12 - omega2 * (A2 / 100) * Math.sin(omega2 * t[j]) * s22;
        theta2[j] = -Math.pow(omega1, 2) * (A1 / 100) * Math.cos(omega1 * t[j]) * s12 - Math.pow(omega1, 2) * (A2 / 100) * Math.cos(omega2 * t[j]) * s22;
    }

    //Update the graph immediately after the parameters change
    Plotly.animate(div = "plot_theta", {
        data: [trace_theta, trace_theta1, trace_theta2],
        traces: [0, 1, 2],
        layout: {}
    }, {
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
    });

    Plotly.relayout( 'plot_theta', {
        'yaxis.autorange': true
    });

}

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
    y: r1,
    type: "scatter",
    name: "Velocity",
    mode: "lines",
};

let trace_r2 = {
    x: t,
    y: r2,
    type: "scatter",
    name: "Acceleration",
    mode: "lines",
};

//store the data for theta as traces
let trace_theta = {
    x: t,
    y: theta,
    type: "scatter",
    name: "Angular Displacement",
    mode: "lines",
};

let trace_theta1 = {
    x: t,
    y: theta1,
    type: "scatter",
    name: "Angular Velocity",
    mode: "lines",
};

let trace_theta2 = {
    x: t,
    y: theta2,
    type: "scatter",
    name: "Angular Acceleration",
    mode: "lines",
};

/** plot the function **/
/* general layout */
let resp_layout = {
    autosize: true,
    yaxis: {nticks: 8},
    xaxis: {range: [0.01, 15],
        nticks: 8,
        title: "Time (s)", titlefont: {size: 14} }
};

/* plot */
//plot r response
Plotly.newPlot('plot_r', [trace_r, trace_r1, trace_r2], resp_layout, {displayModeBar: false});
//plot theta response
Plotly.newPlot('plot_theta', [trace_theta, trace_theta1, trace_theta2], resp_layout, {displayModeBar: false});


/** ---------------------------------- Function to hide and display ------------------------------------- **/

function showSpoiler(obj)
{
    var inner = obj.parentNode.getElementsByTagName("div")[0];
    if (inner.style.display == "none")
        inner.style.display = "";
    else
        inner.style.display = "none";
}

/** ---------------------------------- Function for animations --------------------------------------- **/

