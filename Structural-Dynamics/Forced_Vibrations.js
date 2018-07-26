let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.scale(1, 1); //scale of the canvas
function initPlot_forced() {
    /** --------------------------------- Set initial plot - drawing - what is displayed initially --------------------------------- **/
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

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(10, 125);
    ctx.lineTo(100, 125);
    ctx.lineTo(105, 135);
    for (let i = 1; i < 11; i++) {
        ctx.lineTo(105 + 5 * i, 125 + 10 * Math.pow(-1, i))
    }
    ctx.lineTo(160, 125);
    ctx.lineTo(280, 125);
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
    ctx.fillText("m", 300, 175);
    ctx.stroke();

    //draw the DoF arrow above the mass
    ctx.beginPath();
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


// text for forcing function on the right of the mass (including the arrow)
    ctx.beginPath();
    ctx.moveTo(330, 125);
    ctx.lineTo(360,125);
    ctx.lineTo(355,120);
    ctx.moveTo(360,125);
    ctx.lineTo(355,130);
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("F(t)= R  cos \u03c9t", 400, 128);
    ctx.fillText("0",460,138);
    ctx.stroke();


}
let myReq_forced;
let startPause = document.getElementById("playPauseButton");
/** Create variables**/
const wStart = 0.1;
const wEnd = 3;
const n2 =500;
let t_end =100;
let t_init =0;
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
let omega_forced=0; // frequency forcing function
let t=[];
let KS= []; // Energy spring
let KE=[]; // kinetic energy mass
let D=[]; // Damping energy
let TotalE=[]; // Total energy of the system

const n = 500 ; // number of points - IMPORTANT
let interval= ( t_end-t_init) /(n-1) ;
function AmpPhaNyq() {
    // User input from HTML
    R = parseFloat(document.getElementById("Force").value);
    k = parseFloat(document.getElementById("SpringForced").value);
    c = parseFloat(document.getElementById("DampingForced").value);
    m = parseFloat(document.getElementById("MassForced").value);
    r_0_forced = parseFloat(document.getElementById("IniDispForced").value);
    v_0_forced = parseFloat(document.getElementById("IniVeloForced").value);
    omega_forced= parseFloat(document.getElementById("OmegaForced").value)
    for (i = 0;  i < 1000; i++) {

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
        let Delta= Math.pow((k-Math.pow(omega_forced,2)*m),2)+Math.pow(omega_forced*c,2);
        let rc = R*(k-Math.pow(omega_forced,2)*m)/Delta;
        let rs= R*omega_forced*c/Delta;

        r_forced[i]=rc*Math.cos(omega_forced*t[i])+rs*Math.sin(omega_forced*t[i]);
        v_forced[i]= -rc*omega_forced*Math.sin(omega_forced*t[i])+rs*omega_forced*Math.cos(omega_forced*t[i]);
        a_forced[i]= -rc*Math.pow(omega_forced,2)*Math.cos(omega_forced*t[i])-rs*Math.pow(omega_forced,2)*Math.sin(omega_forced*t[i]);


        /*
        r_forced[i] = (v_0_forced/omega_forced)*Math.sin(omega_forced*t[i])+r_0_forced*Math.cos(omega_forced*t[i]);
        v_forced[i] = (v_0_forced/omega_forced)*omega_forced*Math.cos(omega_forced*t[i])-r_0_forced*omega_forced*Math.sin(omega_forced*t[i]);
        a_forced[i] = -1*(v_0_forced/omega_forced)*Math.pow(omega_forced,2)*Math.sin(omega_forced*t[i])-r_0_forced*Math.pow(omega_forced,2)*Math.cos(omega_forced*t[i]);
        forcing[i]=R*Math.sin(omega_forced*t[i]);
        */
    }


    // Energy calculations
    for (let i = 1; i < n; i++) {
        KS[0]=0.5* k *Math.pow(r_0_forced,2);
        KE[0]=0.5* m *Math.pow(v_0_trans,2);
        D[0]=c*v_0_forced*r_0_forced;
        KS[i] = 0.5 * k * Math.pow(r_forced[i], 2); //strain energy of the spring
        KE[i] = 0.5 * m * Math.pow(v_forced[i], 2); // kinetic energy of the mass
        D[i]=D[i-1]+c*v_forced[i]*(r_forced[i]-r_forced[i-1]); // Energy dissipated by damping
       // D[i] = KS[0] + KE[0] - KS[i] - KE[i];
        TotalE[i] = KS[i] + KE[i] + D[i];
    }
    /** Traces for Nyquist, Amplitude, Phase, Energy, Displacement**/
    let trace_ks = {
        x: t,
        y: KS,
        type: "scatter",
        name: "Strain energy spring",
    };
    let trace_ke = {
        x: t,
        y: KE,
        type: "scatter",
        name: "Kinetic energy mass",
    };
    let trace_te = {
        x: t,
        y: TotalE,
        type: "scatter",
        name: "Total energy",
    };
    let trace_d = {
        x: t,
        y: D,
        type: "scatter",
        name: "Damping",
    };

    // layout of the graphs
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

// nyquist plots
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
    /** Plots**/
    Plotly.newPlot('graph3', data2, layout, {displayModeBar:false});
    Plotly.newPlot('Energy_Forced', [trace_ks, trace_ke, trace_d, trace_te], layout, {displayModeBar: false});
    Plotly.newPlot('graph2', data1, layout, {displayModeBar:false});
    Plotly.newPlot('graph4', data3, layout, {displayModeBar:false});
    Plotly.newPlot('graph6', data6, layout, {displayModeBar:false});

}

/** The animation function **/
let x = 0;
let fps = 60; //choose FPS of the simulation
let now;
let then = Date.now();
let interval_2 = 1000/fps;
let delta_2;

let resp_layout_2= {
    autosize: true,
    legend: {x: 0, y: 6, "orientation": "h"},
    margin: {l: 25, r: 10, t: 5, b: 20},
    xaxis: {range: [-2, 2]},
    yaxis: {range: [0,100 ]}
};

Plotly.plot('graphmovingforced', [{x: document.getElementById("IniDispForced").value, y: t_init}], resp_layout_2, {displayModeBar: false});
/** Variable initialization**/
// initialize displacement/time arrays
let r_array_forced=[];
let v_array_forced=[];
let t_array_forced=[];
let  omega_ani_forced=0;
let k_ani_forced =0;
let m_ani_forced =0;
let t_init_ani_forced =0 ;
let t_end_ani_forced= 100;
let v_0_ani_forced =0;
let r_0_ani_forced =0;
let R_forced=0;
const n_ani_forced = 500 ; // number of points
let interval_ani_forced= ( t_end_ani_forced-t_init_ani_forced) /(n_ani_forced-1) ;  // creates time intervals for the for loop

let r_ani_forced= 0; // displacement array
let t_ani_forced=0;
let g_s=0;
function newPosition_forced() {  // This function does exactly the same thing as AmpPhaNyq() earlier but this one is called in the animation function to create the moving graph
    // gets values from the sliders in the HTML (value is called by the ID of the slider in the HTML file)
    k_ani_forced = document.getElementById("SpringForced").value;
    R_forced = document.getElementById("Force").value;
    m_ani_forced = document.getElementById("MassForced").value;
    // Initial displacement and velocity
    v_0_ani_forced = document.getElementById("IniVeloForced").value;
    r_0_ani_forced = document.getElementById("IniDispForced").value;
    omega_ani_forced = document.getElementById("OmegaForced").value;
    wu = Math.sqrt(k/m);
    xi = c/(2*Math.sqrt(k*m));
    coverm=2*wu*xi;
    c=coverm*m;
    koverm=Math.pow(wu,2);
    alpha_html=wu*xi;
    beta_html=wu*Math.sqrt(1-Math.pow(xi,2));

    $('#beta_html').html(beta_html.toFixed(2));
    $('#alpha_html').html(alpha_html.toFixed(2));
    $('#omegau').html(wu.toFixed(2));
    $('#xi').html(xi.toFixed(5)) ;
    $('#coverm').html(coverm.toFixed(2));
    $('#koverm').html(koverm.toFixed(2));


    let Delta= Math.pow((k-Math.pow(omega_ani_forced,2)*m),2)+Math.pow(omega_ani_forced*c,2);
    let rc = R*(k-Math.pow(omega_ani_forced,2)*m)/Delta;
    let rs= R*omega_ani_forced*c/Delta;

    r_ani_forced=rc*Math.cos(omega_ani_forced*t_ani_forced)+rs*Math.sin(omega_ani_forced*t_ani_forced);
    v_ani_forced= -rc*omega_ani_forced*Math.sin(omega_ani_forced*t_ani_forced)+rs*omega_ani_forced*Math.cos(omega_ani_forced*t_ani_forced);
    /*
        let r_ani_forced = (v_0_ani_forced / omega_ani_forced) * Math.sin(omega_ani_forced * t_ani_forced) + r_0_forced * Math.cos(omega_ani_forced * t_ani_forced);
        let v_ani_forced = (v_0_ani_forced / omega_ani_forced) * omega_ani_forced * Math.cos(omega_ani_forced * t_ani_forced) - r_0_forced * omega_ani_forced * Math.sin(omega_ani_forced * t_ani_forced);
    */
    t_ani_forced += interval_ani_forced; //time counter, incremented at each iteration
    r_array_forced.push(r_ani_forced); // .push will add a value to an array. It adds the value of the new displacement to an array
    t_array_forced.push(t_ani_forced); // same as above but for time
    v_array_forced.push(v_ani_forced);

    //animate the graphs using the arrays above

    Plotly.animate(div = "graphmovingforced", {
        data: [{x: r_array_forced, y: t_array_forced}],
        traces: [0],
        layout: {}
    }, {
        transition: {duration: 1},
        frame: {duration: 1, redraw: false}
    });
    Plotly.relayout('graphmovingforced', {
        // 'xaxis.autorange': true,
        'xaxis.range': [-1.5, 1.5],
        'yaxis.autorange': true
    });

}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    delta_2 = now - then;
    if (delta_2 > interval_2) {
        // update time stuffs
        then = now - (delta_2 % interval_2);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        r_forced[x] = r_forced[x] * 40; // scaling of the drawing

        // Creates wall
        ctx.beginPath();
        ctx.moveTo(10, 100);
        ctx.lineTo(10, 160);
        ctx.moveTo(10, 100);
        ctx.lineTo(0, 110);
        ctx.moveTo(10, 110);
        ctx.lineTo(0, 120);
        ctx.moveTo(10, 120);
        ctx.lineTo(0, 130);
        ctx.moveTo(10, 130);
        ctx.lineTo(0, 140);
        ctx.moveTo(10, 140);
        ctx.lineTo(0, 150);
        ctx.moveTo(10, 150);
        ctx.lineTo(0, 160);
        ctx.stroke();

        /* Draw the linear spring */
        ctx.beginPath();
        ctx.moveTo(10, 125);
        ctx.lineTo(100+ r_forced[x], 125);
        ctx.lineTo(105+ r_forced[x] -r_forced[x]/12, 135);
        for (let i = 1; i < 11; i++) {
            ctx.lineTo(105 + 5 * i+ (r_forced[x] + (i + 1)*(- r_forced[x])/12), 125 + 10 * Math.pow(-1, i))
        }
        ctx.lineTo(185+ r_forced[x]*0.1, 125);
        ctx.lineTo(280+ r_forced[x], 125);
        ctx.stroke();

        /* Draw the mass */
        ctx.beginPath();
        ctx.moveTo(280+r_forced[x], 100);
        ctx.lineTo(330+r_forced[x], 100);
        ctx.lineTo(330+r_forced[x], 150);
        ctx.lineTo(280+r_forced[x], 150);
        ctx.lineTo(280+r_forced[x], 100);
        ctx.fillStyle = "rgba(166,166,166,0.4)";
        ctx.fill();
        ctx.stroke();

        newPosition_forced(); // function to plot the graph automatically as mass moves
        x += 1;
    }
}

/** broken functions to start pause reset the vis properly**/
function startAnime(){
    if(startPause.textContent === "Start"){
        requestAnimationFrame(animate);
        startPause.textContent = "Pause";
    }
    else{
        cancelAnimationFrame(myReq_forced);
        startPause.textContent = "Start"
    }
}

function stopAnime() {
    /* Set initial plot */
    x = 0;
    cancelAnimationFrame(myReq_forced);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initPlot_forced();
    startPause.textContent = "Start";}



/** --------------------------- Function for slide show ---------------------------- **/
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

showSlides(slideIndex);

/** Guidance function - to switch tabs etc...**/

let modal = document.getElementById("guideModal");
let modalContent = document.getElementsByClassName("modalContent");

//Listen for outside click
window.addEventListener("click", outsideClick);

//Function to open modal
function openModal(){
    modal.style.display = "block";
    modalContent[0].style.display = "block";
    modalContent[1].style.display = "none";
    modalContent[2].style.display = "none";
    modalContent[3].style.display = "none";
    modalContent[4].style.display = "none";
    modalContent[5].style.display = "none";
}

//Function to close modal
function closeModal(){
    modal.style.display = "none";
}

//Function to close modal if outside click
function outsideClick(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
}

//Function to close current modal and open next modal
function nextModal(n) {
    modalContent[n].style.display = "none";
    modalContent[n + 1].style.display = "block";
}