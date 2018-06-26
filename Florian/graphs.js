
// Section for the graph acceleration/velocity/displacement VS time
// define/initialize Variables
let k =0;
let c =0 ;
let m =0;
let t_end =100 ;
let t_init =0 ;
let v_0 =0;
let r_0 =0;
const n = 500 ; // number of points
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

function AVD_graph() {
    // Get variables from the HTML. User input
    k = document.getElementById("spring").value;
    c = document.getElementById("damping").value;
    m = document.getElementById("mass").value;
    // Initial displacement and velocity
    v_0 = document.getElementById("initial velocity").value;
    r_0 = document.getElementById("initial displacement").value;
   //  let omega = Math.sqrt(k/m);
    if (Math.pow(c, 2) < 4 * k * m) {  // lightly damped damping

        for (i = 0; i < n; i++) { //setup loop, starts at t=0, until last time,
            t[i] = t_init + interval * i;
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

        for (i = 0; i < n; i++) {

            t[i] = t_init + interval * i;
            p1 = (1 / 2 * m) * (-c + Math.sqrt(Math.pow(c, 2) - 4 * k * m));
            p2 = (1 / 2 * m) * (-c - Math.sqrt(Math.pow(c, 2) - 4 * k * m));
            r01 = (v_0 - (p2 * r_0)) / (p1 - p2);
            r02 = (r_0 - r01);
            r[i] = r01 * Math.exp(p1 * t[i]) + r02 * Math.exp(p2 * t[i]); //displacement
            v[i] = p1 * r01 * Math.exp(p1 * t[i]) + p2 * r02 * Math.exp(p2 * t[i]); //velocity
            a[i] = Math.pow(p1, 2) * r01 * Math.exp(p1 * t[i]) + Math.pow(p2, 2) * r02 * Math.exp(p2 * t[i]); //acceleration
        }
    }
    else if (Math.pow(c, 2) == 4 * k * m) {
        for (i = 0; i < n; i++) {

            t[i] = t_init + interval * i;
            p0 = -c / (2 * m);
            r[i] = r_0 * Math.exp(p0 * t[i]);
            v[i] = r_0 * p0 * Math.exp(p0 * t[i]);
            a[i] = r_0 * Math.pow(p0, 2) * Math.exp(p0 * t[i]);
        }
    }
// Energy calculations
    for(i=0; i<n; i++) {
        KS[i]= 0.5*k*Math.pow(r[i],2); //spring
        T[i]=0.5*m*Math.pow(v[i],2); // mass
        D[i]=KS[0]+T[0]-KS[i]-T[i];
        TotalE[i]=KS[i]+T[i]+D[i];
    }


    let trace1 = {
        x: t,
        y: r,
        name: 'Displacement',
        type: 'scatter'
    };

    let trace2 = {
        x: t,
        y: v,
        name: 'Velocity',
        type: 'scatter'

    };
    let trace3 = {
        x: t,
        y: a,
        name: 'Acceleration',
        type: 'scatter'

    };
    let  layout= {
        autosize: true,
        margin:{
            l:25, r:11, b:20, t:1
        },
        legend: {x: 0, y: 10, orientation: "h"
        },

        font: {
            family: "Fira Sans", size:16
        }
    };
    Plotly.newPlot('graph1', [trace1, trace2, trace3], layout, {displayModeBar:false});

// Energy
    let trace13 ={
        x:t,
        y:KS,
        name: 'Spring',
        type: 'scatter'
    };
    let trace14={
        x:t,
        y:T,
        name: 'Mass',
        type: 'scatter'
    };
    let trace15={
        x:t,
        y:D,
        name: 'Damping',
        type: 'scatter'
    };
    let trace16={
        x:t,
        y:TotalE,
        name:'Total Energy',
        type:'scatter'
    };

    Plotly.newPlot('graph5', [trace13, trace14, trace15, trace16], layout, {displayModeBar:false});
}


// Section for the graphs on the forced vibrations side
// define variables


const wStart = 0.1;
const wEnd = 3;
const n2 =500;
let interval2 = (wEnd - wStart)/(n2-1);

let w=[];
let alpha_2=[];
let wc=[];
let delta=[];
let din=[];
let dout=[];
let vin=[];
let vout=[];
let ain=[];
let aout=[];
let dampl=[];
let phased=[];
let vampl=[];
let phasev=[];
let aampl=[];
let phasea=[];
let i=0;
let r_0_forced=0; // boundary condition
let  v_0_forced=0; // boundary condition
let r_forced=[]; // displacement
let v_forced=[]; // velocity
let a_forced=[]; // acceleration
let forcing=[]; // forcing function
function AmpPhaNyq() {
    R = document.getElementById("force").value;
    k = document.getElementById("spring forced").value;
    c = document.getElementById("damping forced").value;
    m = document.getElementById("mass forced").value;
    r_0_forced = document.getElementById("initial displacement forced").value;
    v_0_forced = document.getElementById("initial velocity forced").value;
    let omega_forced= Math.sqrt(k/m);
    for (i = 0;  i < n2; i++) {

        w[i]= wStart + i*interval2;
        alpha_2[i] = k - Math.pow(w[i], 2)*m;
        wc[i] = w[i]*c;
        delta[i] = Math.pow(alpha_2[i], 2) + Math.pow(wc[i],2);
        din[i] = alpha_2[i]*R/(delta[i]);
        dout[i] = wc[i]*R/(delta[i]);
        vin[i]=w[i]*dout[i];
        vout[i]=-w[i]*din[i];
        ain[i]=w[i]*vout[i];
        aout[i]=-w[i]*vin[i];

        dampl[i]=Math.sqrt(Math.pow(din[i], 2) + Math.pow(dout[i], 2));
        phased[i]=Math.atan2(dout[i], din[i]);

        vampl[i]=Math.sqrt(Math.pow(vin[i], 2) + Math.pow(vout[i], 2));
        phasev[i]=Math.atan2(vout[i], vin[i]);

        aampl[i]=Math.sqrt(Math.pow(ain[i], 2) + Math.pow(aout[i], 2));
        phasea[i]=Math.atan2(aout[i], ain[i]);

        t[i] = t_init + interval*i;
        r_forced[i] = (v_0_forced/omega_forced)*Math.sin(omega_forced*t[i])+r_0_forced*Math.cos(omega_forced*t[i]);
        v_forced[i] = (v_0_forced/omega_forced)*omega_forced*Math.cos(omega_forced*t[i])-r_0_forced*omega_forced*Math.sin(omega_forced*t[i]);
        a_forced[i] = -1*(v_0_forced/omega_forced)*Math.pow(omega_forced,2)*Math.sin(omega_forced*t[i])-r_0_forced*Math.pow(omega_forced,2)*Math.cos(omega_forced*t[i]);
        forcing[i]=R*Math.sin(omega_forced*t[i]);
    }

    // parameters of the graphs
    let  layout= {
        autosize: true,
        margin:{
            l:25, r:11, b:20, t:1
        },
        legend: {x: 0, y: 10, orientation: "h"
        },

        font: {
            family: "Fira Sans", size:16
        }

    };

    // Amplitude Graphs
    let trace4 = {
        x: w,
        y: dampl,
        name: 'Displacement',
        type: 'scatter'
    };
    let trace5 = {
        x: w,
        y: vampl,
        name: 'Velocity',
        type: 'scatter'
    };
    let trace6 = {
        x: w,
        y: aampl,
        name: 'Acceleration',
        type: 'scatter'
    };
    let data1 = [trace4, trace5, trace6];
    Plotly.newPlot('graph2', data1, layout, {displayModeBar:false});

// nyquist

    let trace7 = {
        x: din,
        y: dout,
        name: 'Displacement',
        type: 'scatter'
    };
    let trace8 = {
        x: vin,
        y: vout,
        name: 'Velocity',
        type: 'scatter'
    };
    let trace9 = {
        x: ain,
        y: aout,
        name: 'Acceleration',
        type: 'scatter'
    };
    let data2 = [trace7, trace8, trace9];
    Plotly.newPlot('graph3', data2, layout, {displayModeBar:false});

// Phase

    let trace10 = {
        x: w,
        y: phased,
        name: 'Displacement',
        type: 'scatter'
    };
    let trace11 = {
        x: w,
        y: phasev,
        name: 'Velocity',
        type: 'scatter'
    };
    let trace12 = {
        x: w,
        y: phasea,
        name: 'Acceleration',
        type: 'scatter'
    };
    let data3 = [trace10, trace11, trace12];
    Plotly.newPlot('graph4', data3, layout, {displayModeBar:false});

// Forced displacement, velocity, acceleration and forcing function
    let trace17= {
        x:t,
        y: r_forced,
        name: 'Forced displacement',
        type: 'scatter'
    };
    let trace18={
        x:t,
        y: v_forced,
        name: 'Forced velocity',
        type: 'scatter'
    };
    let trace19={
        x:t,
        y: a_forced,
        name: 'Forced acceleration',
        type: 'scatter'
    };
    let trace20={
        x:t,
        y: forcing,
        name: 'Forcing function',
        type: 'scatter'
    };

    let data6=[trace17, trace18, trace19, trace20];
    Plotly.newPlot('graph6', data6, layout, {displayModeBar:false});

}
