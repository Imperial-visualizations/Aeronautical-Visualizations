/** Store all the user inputs as variables **/
/* var dom={
    m : $("#m"),
    I : $("#I"),
    k : $("#k"),
    k_theta:$("#k_theta"),
    l : $("#L"),
    A1:$("input#mode1"),

}; */


/** Set variables**/

 let  A1 = 50;
    let a =0 ;
    let b = 0;
    let c=0;
    let d1=0;
    let d2=0;
    let e=0;
    let A2 = 50;
    let omega1 = 0;
    let omega2 = 0;
    let s11 = 1;
    let s12 = 0;
    let s21 = 1;
    let s22 =1;
    let t = [];
    let r = [];
    let theta = [];
    let marT = 30;
    let marB = 23;
    let marR = 5;
    let marL = 35;
    let   t_init=0;
    let t_end=100;
    let n=500;
    let interval=(t_end-t_init)/(n-1);

/** Plot the displacement against time **/
function calu_resp() {
    /* Store inputs */

    let m = document.getElementById("m").value;
    let I = document.getElementById("I").value;
    let k = document.getElementById("k").value;
    let k_theta = document.getElementById("k_theta").value;
    let l = document.getElementById("L").value;

    /* Calculation of data */
    a = m * (k_theta + k * l ** 2) + I * k;
    b = Math.sqrt(a ** 2 - 4 * m * I * k * (k_theta + k * l ** 2));
    c = 2 * m * I;
    omega1 = Math.sqrt((a + b) / c);
    omega2 = Math.sqrt((a - b) / c);

    d1 = (k - omega1 ** 2 * m);
    e = -k * l;
    s12 = -d1 / e;

    d2 = (k - omega2 ** 2 * m);
    e = -k * l;
    s22 = -d2 / e;

    A2 = 100 - A1;


    for (i = 0; i < n; i++) {
        t[i] = t_init+i*interval;
        r[i] = (A1 / 100) * Math.cos(omega1 * t[i]) * s11 + (A2 / 100) * Math.cos(omega2 * t[i]) * s21;
    }


}
let data_r = {
    type: "scatter",
    x: t,
    y: r
};


/* plot the function */
//function plot_r() {}

resp_layout = {
    title: "System response", titlefont: {size: 12},
    margin: {l: marL, r: marR, b: marB + 10, t: marT}, legend: {x: 0.46, y: 1, "orientation": "h"},
    showlegend: true,
    yaxis: {
        range: [-10, 10],
        nticks: 20, title: "Response", titlefont: {size: 10}
    },
    xaxis: {
        range: [0, 10],
        nticks: 20, title: "Time", titlefont: {size: 10}
    }
};
Plotly.newPlot('plot_r', data_r, resp_layout);
