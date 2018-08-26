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

let i=0;
let r_0_forced=0; // boundary condition
let  v_0_forced=0; // boundary condition
let t=[];
let R_trans=[]; // array to store values of the function
let KS= []; // Energy spring
let KE=[]; // kinetic energy mass
let D=[];
let TotalE=[]; // Total energy of the system
let r_trans=[]; // displacement array
let v_trans=[]; //  velocity array
const n = 500 ; // number of points
let int_trans= ( t_end-t_init) /(n-1) ; //  Delta t
function Trans_resp() {
    // User input from HTML
    k = parseFloat(document.getElementById("SpringTrans").value);
    c = parseFloat(document.getElementById("DampingTrans").value);
    m = parseFloat(document.getElementById("MassTrans").value);
    r_0_trans = parseFloat(document.getElementById("IniDispTrans").value);
    v_0_trans = parseFloat(document.getElementById("IniVeloTrans").value);
    let a0=parseFloat(document.getElementById("a0").value);
    let a1=parseFloat(document.getElementById("a1").value);
    let a2=parseFloat(document.getElementById("a2").value);
    let a3=parseFloat(document.getElementById("a3").value);
    let a4=parseFloat(document.getElementById("a4").value);
    let a5=parseFloat(document.getElementById("a5").value);
    let b1=parseFloat(document.getElementById("b1").value);
    let b2=parseFloat(document.getElementById("b2").value);
    let b3=parseFloat(document.getElementById("b3").value);
    let c1=parseFloat(document.getElementById("c1").value);
    let c2=parseFloat(document.getElementById("c2").value);
    let c3=parseFloat(document.getElementById("c3").value);
    let d1=parseFloat(document.getElementById("d1").value);
    let e1=parseFloat(document.getElementById("e1").value);
    let omega1=parseFloat(document.getElementById("omega1").value);
    let omega2=parseFloat(document.getElementById("omega2").value);
    let omega3=parseFloat(document.getElementById("omega3").value);
    let wu_trans = Math.sqrt(k/m); // undamped natural frequency
    let xi_trans = c/(2*Math.sqrt(k*m)); // damping ratio
    let  alpha_trans=wu_trans*xi_trans;
    let beta_trans = wu_trans*Math.sqrt(1-Math.pow(xi_trans,2));
    for (i = 1; i < n+1; i++) {
        t[i] = t_init + int_trans*(i);
        r_trans[0] = r_0_trans;
        v_trans[0] = v_0_trans;
        R_trans[0]=a0+b1+b2+b3;

        R_trans[i]=a0+a1*t[i]+a2*Math.pow(t[i],2)+a3*Math.pow(t[i],3)+a4*Math.pow(t[i],a5)+b1*Math.cos(omega1*t[i])+b2*Math.cos(omega2*t[i])+b3*Math.cos(omega3*t[i])+c1*Math.sin(omega1*t[i])+c2*Math.sin(omega2*t[i])+c3*Math.sin(omega3*t[i])+d1*Math.sqrt(t[i])+e1*Math.log(t[i]);
        v_trans[i]=Math.exp(-alpha_trans*int_trans)*v_trans[i-1]*Math.cos(beta_trans*int_trans)-(r_trans[i-1]*beta_trans+(v_trans[i-1]+alpha_trans*r_trans[i-1])/beta_trans)*Math.sin(beta_trans*int_trans)+(1/beta_trans*m)*Math.exp(-alpha_trans*int_trans)*Math.sin(beta_trans*int_trans)*R_trans[i-1]*int_trans;
        r_trans[i]=r_trans[i-1]*Math.exp(-alpha_trans*int_trans)*Math.cos(beta_trans*int_trans)+ (((v_trans[i-1]+alpha_trans*r_trans[i-1])*Math.exp(-alpha_trans*int_trans)*Math.sin(beta_trans*int_trans))/beta_trans)+(Math.exp(-alpha_trans*int_trans)*Math.sin(beta_trans*int_trans)/(beta_trans*m))*R_trans[i-1]*int_trans
    }

// Energy calculations
    for (let i = 1; i < 1000+1; i++) {
        KS[0]=0.5* k *Math.pow(r_0_forced,2);
        KE[0]=0.5* m *Math.pow(v_0_trans,2);
        D[0]=c*v_0_forced*r_0_forced;
        KS[i] = 0.5 * k * Math.pow(r_trans[i], 2); //strain energy of the spring
        KE[i] = 0.5 * m * Math.pow(v_trans[i], 2); // kinetic energy of the mass
        D[i]=D[i-1]+c*v_trans[i]*(r_trans[i]-r_trans[i-1]); // Energy dissipated by damping
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

// Forced displacement, velocity, acceleration and forcing function
    let trace17= {
        x:t,
        y: r_trans,
        name: 'Forced displacement',
        type: 'scatter'
    };
    let trace18={
        x:t,
        y: v_trans,
        name: 'Forced velocity',
        type: 'scatter'
    };

    let trace20={
        x:t,
        y: R_trans,
        name: 'Forcing function',
        type: 'scatter'
    };

    let data6=[trace17, trace18, trace20];

    Plotly.newPlot('Energy_Trans', [trace_ks, trace_ke, trace_d, trace_te], layout, {displayModeBar: false});
    Plotly.newPlot('AV_trans', data6, layout, {displayModeBar:false});

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

Plotly.plot('graphmovingtrans', [{x: document.getElementById("IniVeloTrans").value, y: t_init}], resp_layout_2, {displayModeBar: false});
/** Variable initialization**/
// initialize displacement/time arrays
let r_array_trans=[];
let v_array_trans=[];
let t_array_trans=[];
let R_array_trans=[];
let k_ani_trans =0;
let m_ani_trans =0;
let c_ani_trans=0;
let t_init_ani_trans =0 ;
let t_end_ani_trans= 100;
let v_0_ani_trans =0;
let r_0_ani_trans =0;
let R_forced=0;
const n_ani_trans = 500 ; // number of points
let interval_ani_trans= parseFloat(( t_end_ani_trans-t_init_ani_trans) /(n_ani_trans-1)) ;  // creates time intervals for the for loop
let r_ani_trans= []; // displacement array
let v_ani_trans=[];
let t_ani_trans= 0;
console.log(typeof interval_ani_trans);

function newPosition_forced() {  // This function does exactly the same thing as AmpPhaNyq() earlier but this one is called in the animation function to create the moving graph
    // gets values from the sliders in the HTML (value is called by the ID of the slider in the HTML file)
    k_ani_trans = parseFloat(document.getElementById("SpringTrans").value);
    m_ani_trans = parseFloat(document.getElementById("MassTrans").value);
    c_ani_trans= parseFloat(document.getElementById("DampingTrans").value);
    // Initial displacement and velocity
    v_0_ani_trans = parseFloat(document.getElementById("IniVeloTrans").value);
    r_0_ani_trans = parseFloat(document.getElementById("IniDispTrans").value);
    let a0 = parseFloat(document.getElementById("a0").value);
    let a1 = parseFloat(document.getElementById("a1").value);
    let a2 = parseFloat(document.getElementById("a2").value);
    let a3 = parseFloat(document.getElementById("a3").value);
    let a4 = parseFloat(document.getElementById("a4").value);
    let a5 = parseFloat(document.getElementById("a5").value);
    let b1 = parseFloat(document.getElementById("b1").value);
    let b2 = parseFloat(document.getElementById("b2").value);
    let b3 = parseFloat(document.getElementById("b3").value);
    let c1 = parseFloat(document.getElementById("c1").value);
    let c2 = parseFloat(document.getElementById("c2").value);
    let c3 = parseFloat(document.getElementById("c3").value);
    let d1 = parseFloat(document.getElementById("d1").value);
    let e1 = parseFloat(document.getElementById("e1").value);
    let omega1 = parseFloat(document.getElementById("omega1").value);
    let omega2 = parseFloat(document.getElementById("omega2").value);
    let omega3 = parseFloat(document.getElementById("omega3").value);
    let wu_trans = Math.sqrt(k_ani_trans / m_ani_trans); // undamped natural frequency
    let xi_trans = c_ani_trans / (2 * Math.sqrt(k_ani_trans * m_ani_trans)); // damping ratio
    let alpha_trans = wu_trans * xi_trans;
    let beta_trans = wu_trans * Math.sqrt(1 - Math.pow(xi_trans, 2));
    wu = Math.sqrt(k / m);
    xi = c / (2 * Math.sqrt(k * m));
    coverm = 2 * wu * xi;
    c = coverm * m;
    koverm = Math.pow(wu, 2);
    alpha_html = wu * xi;
    beta_html = wu * Math.sqrt(1 - Math.pow(xi, 2));

    $('#beta_html').html(beta_html.toFixed(2));
    $('#alpha_html').html(alpha_html.toFixed(2));
    $('#omegau').html(wu.toFixed(2));
    $('#xi').html(xi.toFixed(5));
    $('#coverm').html(coverm.toFixed(2));
    $('#koverm').html(koverm.toFixed(2));
    r_array_trans[0]=r_0_ani_trans;
    v_array_trans[0]=v_0_ani_trans;

    R_trans = a0 + a1 *t_ani_trans  + a2 * Math.pow(t_ani_trans, 2) + a3 * Math.pow(t_ani_trans, 3) + a4 * Math.pow(t_ani_trans, a5) + b1 * Math.cos(omega1 * t_ani_trans) + b2 * Math.cos(omega2 * t_ani_trans) + b3 * Math.cos(omega3 * t_ani_trans) + c1 * Math.sin(omega1 * t_ani_trans) + c2 * Math.sin(omega2 * t_ani_trans) + c3 * Math.sin(omega3 * t_ani_trans) + d1 * Math.sqrt(t_ani_trans) + e1 * Math.log(t_ani_trans);

    v_ani_trans = Math.exp(-alpha_trans * int_trans) * Math.cos(beta_trans * int_trans) - (r_array_trans[r_array_trans.length] * beta_trans + (v_array_trans[v_array_trans.length] + alpha_trans * r_array_trans[r_array_trans.length]) / beta_trans) * Math.sin(beta_trans * int_trans) + (1 / beta_trans * m) * Math.exp(-alpha_trans * int_trans) * Math.sin(beta_trans * int_trans) * R_array_trans[R_array_trans.length] * int_trans;
    r_ani_trans = r_array_trans[r_array_trans.length] * Math.exp(-alpha_trans * int_trans) * Math.cos(beta_trans * int_trans) + (((v_array_trans[v_array_trans.length] + alpha_trans * r_array_trans[r_array_trans.length]) * Math.exp(-alpha_trans * int_trans) * Math.sin(beta_trans * int_trans)) / beta_trans) + (Math.exp(-alpha_trans * int_trans) * Math.sin(beta_trans * int_trans) / (beta_trans * m)) * R_array_trans[R_array_trans.length] * int_trans;

    t_ani_trans +=  interval_ani_trans; //time counter, incremented at each iteration

    R_array_trans.push(R_trans);
    r_array_trans.push(r_ani_trans); // .push will add a value to an array. It adds the value of the new displacement to an array
    t_array_trans.push(t_ani_trans); // same as above but for time
    v_array_trans.push(v_ani_trans);

    console.log(R_array_trans);
    console.log(t_ani_trans);

        console.log(R_trans);
        console.log(v_ani_trans);
        console.log(v_array_trans);

    //animate the graphs using the arrays above

    Plotly.animate(div = "graphmovingtrans", {
        data: [{x: r_array_trans, y: t_array_trans}],
        traces: [0],
        layout: {}
    }, {
        transition: {duration: 1},
        frame: {duration: 1, redraw: false}
    });
    Plotly.relayout('graphmovingtrans', {
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
        r_trans[x] = r_trans[x] * 40; // scaling of the drawing

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
        ctx.lineTo(100+ r_trans[x], 125);
        ctx.lineTo(105+ r_trans[x] -r_trans[x]/12, 135);
        for (let i = 1; i < 11; i++) {
            ctx.lineTo(105 + 5 * i+ (r_trans[x] + (i + 1)*(- r_trans[x])/12), 125 + 10 * Math.pow(-1, i))
        }
        ctx.lineTo(185+ r_trans[x]*0.1, 125);
        ctx.lineTo(280+ r_trans[x], 125);
        ctx.stroke();

        /* Draw the mass */
        ctx.beginPath();
        ctx.moveTo(280+r_trans[x], 100);
        ctx.lineTo(330+r_trans[x], 100);
        ctx.lineTo(330+r_trans[x], 150);
        ctx.lineTo(280+r_trans[x], 150);
        ctx.lineTo(280+r_trans[x], 100);
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

