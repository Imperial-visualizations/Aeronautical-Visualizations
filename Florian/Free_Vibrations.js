let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.scale(1, 1); //Scale of the canvas

function initPlot() {
    /** --------------------------------- Set initial plot - drawing section --------------------------------- **/
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

}

/** define/initialize Variables **/
let k =0; //spring constant
let c =0 ; //damping constant
let m =0; // mass
let t_end =100 ;
let t_init =0;
let v_0 =0; // initial velocity
let r_0 =0; // initial displacement
const n = 400 ; // number of points - CRUCIAL PARAMETER FOR THE MOVING PLOT (TOO MUCH POINTS = LAG)
let interval= ( t_end-t_init) /(n-1) ;  // creates time intervals for the loop
let alpha =0; //  -c / (2 * m) Only valid for the first case (light damping)
let beta=0; // Only used for the first case (light damping)
let r= []; // displacement array
let v=[]; // velocity array
let a=[]; // acceleration array
let t=[]; // time array
let roc =0; // from Boundary conditions
let p1=0;  // first real solution of the heavy damping case
let p2=0; // second real solution of the heavy damping case
let r01=0; // first constant in the heavy damping case (from BC)
let r02=0; // second constant in the heavy damping case (from BC)
let p0=0; // third case
let KS= []; // Energy spring
let KE=[]; // kinetic energy mass
let D=[]; // Damping energy
let TotalE=[]; // Total energy of the system

function response_mass() {
    // Get variables from the HTML. User input
    k = parseFloat(document.getElementById("Spring").value);
    c = parseFloat(document.getElementById("Damping").value);
    m = parseFloat(document.getElementById("Mass").value);
    // Initial displacement and velocity (user input as well)
    v_0 = parseFloat(document.getElementById("IniDisp").value);
    r_0 = parseFloat(document.getElementById("IniVelo").value);

    //Consider 3 cases depending on sign of the discriminant, assuming a solution of the form r*e^(a t) and solving ODE
    if (Math.pow(c, 2) < 4 * k * m) {  // lightly damped damping

        for (let i = 0; i < 10000; i++) {
            t[i] = t_init + interval * i;
            if (t[i] === 0) { //This loop will refresh the value of initial displacement once the simulation is started
                v[i] = v_0;
                r[i] = r_0;
            }
            else
                alpha = -c / (2 * m);
            roc = (v_0 - r_0 * alpha) / beta;  //from boundary conditions
            beta = (1 / 2 * m) * Math.sqrt(4 * k * m - Math.pow(c, 2));
            r[i] = r_0 * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) + ((v_0 - r_0 * alpha) / beta) * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]); //expression for the displacement
            v[i] = r_0 * (alpha * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) - beta * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) + roc * (alpha * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) + Math.exp(alpha * t[i]) * beta * Math.cos(beta * t[i])));
            a[i] = r_0 * (Math.pow(alpha, 2) * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) - 2 * alpha * beta * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) - Math.pow(beta, 2) * Math.exp(alpha * t[i]) * Math.cos(beta * t[i])) + roc * (Math.pow(alpha, 2) * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]) + 2 * alpha * beta * Math.exp(alpha * t[i]) * Math.cos(beta * t[i]) - Math.pow(beta, 2) * Math.exp(alpha * t[i]) * Math.sin(beta * t[i]));
            v[0] = v_0;
            r[0] = r_0;
        }

    }

    else if (Math.pow(c, 2) > 4 * k * m) { // heavy damping

        for (let i = 0; i < 10000; i++) {

            t[i] = t_init + interval * i;
            p1 = (1 / 2 * m) * (-c + Math.sqrt(Math.pow(c, 2) - 4 * k * m));
            p2 = (1 / 2 * m) * (-c - Math.sqrt(Math.pow(c, 2) - 4 * k * m));
            r01 = (v_0 - (p2 * r_0)) / (p1 - p2);
            r02 = (r_0 - r01);
            r[i] = r01 * Math.exp(p1 * t[i]) + r02 * Math.exp(p2 * t[i]); //displacement
            v[i] = p1 * r01 * Math.exp(p1 * t[i]) + p2 * r02 * Math.exp(p2 * t[i]); //velocity
            a[i] = Math.pow(p1, 2) * r01 * Math.exp(p1 * t[i]) + Math.pow(p2, 2) * r02 * Math.exp(p2 * t[i]); //acceleration
            v[0] = v_0;
        }
    }
    else if (Math.pow(c, 2) === 4 * k * m) { // critical damping
        for (let i = 0; i < n; i++) {
            t[i] = t_init + interval * i;
            p0 = -c / (2 * m);
            r[i] = r_0 * Math.exp(p0 * t[i]);
            v[i] = r_0 * p0 * Math.exp(p0 * t[i]);
            a[i] = r_0 * Math.pow(p0, 2) * Math.exp(p0 * t[i]);
            v[0] = v_0;
        }
    }


// Energy calculations
    for (let i = 0; i < 10000; i++) {

        KS[i] = 0.5 * k * Math.pow(r[i], 2); // strain energy spring
        KE[i] = 0.5 * m * Math.pow(v[i], 2); // Kinetic energy of the mass
        D[i] = KS[0] + KE[0] - KS[i] - KE[i]; // Energy dissipated by damping
        TotalE[i] = KS[i] + KE[i] + D[i];
    }

    /** Create traces to be plotted **/
//Energy traces
    let trace_te = {
        x: t,
        y: TotalE,
        type: "scatter",
        name: "Total energy",
    };
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
    let trace_d = {
        x: t,
        y: D,
        type: "scatter",
        name: "Damping",
    };
    // Acceleration/ Velocity/Displacement traces
    let trace_r = {
        x: t,
        y: r,
        type: "scatter",
        name: "Displacement",
    };

    let trace_r1 = {
        x: t,
        y: v,
        type: "scatter",
        name: "Velocity",
    };

    let trace_r2 = {
        x: t,
        y: a,
        type: "scatter",
        name: "Acceleration",
    };


    // general layout
    let resp_layout = {
        autosize: true,
        legend: {x: 0, y: 6, "orientation": "h"},
        margin: {l: 10, r: 10, t: 5, b: 20},
        xaxis: {range: [0, 100]},
        yaxis: {range: [Math.min(r), Math.max(r)]}
    };

    /* plot */
    Plotly.newPlot('AVD_Free', [trace_r, trace_r1, trace_r2], resp_layout, {displayModeBar: false});
    Plotly.newPlot('Energy_Free', [trace_te, trace_ks, trace_ke, trace_d], resp_layout, {displayModeBar: false});
}

let resp_layout_2= {
    autosize: true,
    legend: {x: 0, y: 6, "orientation": "h"},
    margin: {l: 25, r: 10, t: 5, b: 20},
    xaxis: {range: [-1.4, 1.4]},
    yaxis: {range: [0,100 ]}
};


Plotly.newPlot('graphmoving', [{x: parseFloat(document.getElementById("IniDisp").value), y: t_init}], resp_layout_2, {displayModeBar: false});
/** Variable initialization **/

let r_array=[]; // displacement array
let t_array=[]; // time array
let v_array=[]; // velocity array
let a_array=[]; // acceleration array


let k_ani =0; //spring constant
let c_ani =0 ; // damping constant
let m_ani =0; // mass
let t_init_ani =0 ;
let t_end_ani= 100;
let v_0_ani =0; // initial condition
let r_0_ani =0;
const n_ani = 400 ; // number of points - IMPORTANT
let interval_ani= ( t_end_ani-t_init_ani) /(n_ani-1) ;  // creates time intervals for the for loop
let alpha_ani =0; // light damping only
let beta_ani=0; //
let r_ani= 0; // displacement variable which will be pushed to r_array
let v_ani= 0; // same
let a_ani=0; // same
let t_ani=0; // same
let roc_ani =0; // boundary condition 1st case
let p1_ani=0;  // first real solution of the heavy damping case
let p2_ani=0; // second real solution of the heavy damping case
let r01_ani=0; // first constant in the heavy damping case (from BC)
let r02_ani=0; // second constant in the heavy damping case (from BC)
let p0_ani=0; // third case constant

function newPosition() { // This function does exactly the same thing as response_mass earlier but this one is called in the animation function to create the moving graph

    // gets values from the sliders in the HTML (value is called by the ID of the slider in the HTML file)
    k_ani = parseFloat(document.getElementById("Spring").value);
    c_ani = parseFloat(document.getElementById("Damping").value);
    m_ani = parseFloat(document.getElementById("Mass").value);
    // Initial displacement and velocity
    v_0_ani = parseFloat(document.getElementById("IniVelo").value);
    r_0_ani = parseFloat(document.getElementById("IniDisp").value);
    // Calculates important parameters of the system and send them to HTML to be displayed on the page
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

    if (Math.pow(c_ani, 2) < 4 * k_ani * m_ani) {  // lightly damped damping

        if (t_ani === 0) { //This loop will refresh the value of initial displacement once the simulation is started
            alpha_ani = -c_ani / (2 * m_ani);
            v_ani = v_0_ani;
            beta_ani = (1 / 2 * m_ani) * Math.sqrt(4 * k_ani * m_ani - Math.pow(c_ani, 2));
            roc_ani = (v_0_ani - r_0_ani * alpha_ani) / beta_ani;
        }

        else
            roc_ani = r_ani;
        alpha_ani = -c_ani / (2 * m_ani);
        roc_ani = (v_0_ani - r_0_ani * alpha_ani) / beta_ani;  //from boundary conditions
        beta_ani = (1 / 2 * m_ani) * Math.sqrt(4 * k_ani * m_ani - Math.pow(c_ani, 2));
        r_ani = r_0_ani * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) + ((v_0_ani - r_0_ani * alpha_ani) / beta_ani) * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani); //expression for the displacement
        v_ani = r_0_ani * (alpha_ani * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) - beta_ani * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani) + roc_ani * (alpha_ani * Math.exp(alpha * t_ani) * Math.sin(beta_ani * t_ani) + Math.exp(alpha_ani * t_ani) * beta_ani * Math.cos(beta_ani * t_ani)));
        a_ani = r_0_ani * (Math.pow(alpha_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) - 2 * alpha_ani * beta_ani * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani) - Math.pow(beta_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani)) + roc_ani * (Math.pow(alpha_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani) + 2 * alpha_ani * beta_ani * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) - Math.pow(beta_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani));
    }

    else if (Math.pow(c_ani, 2) > 4 * k_ani * m_ani) { // heavy damping
        if (t_ani === 0) {
            r01_ani = (v_0_ani - (p2_ani * r_0_ani)) / (p1_ani - p2_ani);
            r02_ani = (r_0_ani - r01_ani);
            v_ani = v_0_ani;
        }
        else
            r01_ani = (v_ani - (p2_ani * r_0_ani)) / (p1_ani - p2_ani);
        r02_ani = (r_ani - r01_ani);
        p1_ani = (1 / 2 * m_ani) * (-c_ani + Math.sqrt(Math.pow(c_ani, 2) - 4 * k_ani * m_ani));
        p2_ani = (1 / 2 * m_ani) * (-c_ani - Math.sqrt(Math.pow(c_ani, 2) - 4 * k_ani * m_ani));
        r_ani = r01_ani * Math.exp(p1_ani * t_ani) + r02_ani * Math.exp(p2_ani * t_ani); //displacement
        v_ani = p1_ani * r01_ani * Math.exp(p1_ani * t_ani) + p2_ani * r02_ani * Math.exp(p2_ani * t_ani); //velocity
        a_ani = Math.pow(p1_ani, 2) * r01_ani * Math.exp(p1_ani * t_ani) + Math.pow(p2_ani, 2) * r02_ani * Math.exp(p2_ani * t_ani); //acceleration
        // r_ani= r_ani // scaling
    }

    else if (Math.pow(c_ani, 2) === 4 * k_ani * m_ani) { //critical damping
        if (t_ani === 0) {
            v_ani = v_0_ani;
            r_ani = r_0_ani;
        }
        else
            r_0_ani = r_ani;
        p0_ani = -c_ani / (2 * m_ani);
        r_ani = r_0_ani * Math.exp(p0_ani * t_ani);
        v_ani = r_0_ani * p0_ani * Math.exp(p0_ani * t_ani);
        a_ani = r_0_ani * Math.pow(p0_ani, 2) * Math.exp(p0_ani * t_ani);
        // r_ani= r_ani // scaling
    }

    //time counter, incremented at each iteration
    r_array.push(r_ani); // .push will add a value to an array. It adds the value of the new displacement to an array
    v_array.push(v_ani);
    a_array.push(a_ani);
    t_array.push(t_ani); // same as above but for time
    t_ani += interval_ani;


    //animate the graphs using the arrays above
    Plotly.animate(div="graphmoving", {
        data: [{x: r_array, y: t_array}],
        traces: [0],
        layout: {}
    }, {
        transition: {duration: 1},
        frame: {duration: 1, redraw: false}
    });
    Plotly.relayout( 'graphmoving', {
        'xaxis.autorange': false, // important to make sure the y axis stays aligned with the mass
        'yaxis.autorange': true
    });
}

/** The animation function **/
let x = 0;
let fps = parseFloat(document.getElementById("FPS").value); //choose FPS of the simulation (to slow it down )
let now;
let then = Date.now();
let interval_2 = 1000/fps;
let delta_2;
function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    delta_2 = now - then;
    if (delta_2 > interval_2) {

        then = now - (delta_2 % interval_2);

        /** Creates the drawing, make it move etc...Identical to first section but the x component is incremented for the parts that need to move**/
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        r[x] = r[x] * 100; // scale the displacement so that the displacement is visible on the animation

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

        //damper
        ctx.beginPath();
        ctx.moveTo(10,110);
        ctx.lineTo(150+r[x]*0.1,110);
        ctx.moveTo(150+r[x]*0.1 ,100);
        ctx.lineTo(150+r[x]*0.1,120);
        ctx.moveTo(150+r[x]*0.1,100);
        ctx.lineTo(170+r[x]*0.1,100);
        ctx.moveTo(150+r[x]*0.1,120);
        ctx.lineTo(170+r[x]*0.1,120);
        ctx.fillRect(152+ r[x]*0.15,102, 10, 16);
        ctx.moveTo(160+ r[x]*0.1,110);
        ctx.lineTo(260+ r[x],110);
        ctx.stroke();

        /* Draw the linear spring */
        ctx.beginPath();
        ctx.moveTo(10, 145);
        ctx.lineTo(100+ r[x], 145);
        ctx.lineTo(105+ r[x] -r[x]/12, 155);
        for (let i = 1; i < 11; i++) {
            ctx.lineTo(105 + 5 * i+ (r[x] + (i + 1)*(- r[x])/12), 145 + 10 * Math.pow(-1, i))
        }
        ctx.lineTo(185+ r[x]*0.1, 145);
        ctx.lineTo(260+ r[x], 145);
        ctx.stroke();

        /* Draw the mass */
        ctx.beginPath();
        ctx.moveTo(260+ r[x], 100);
        ctx.lineTo(310+ r[x], 100);
        ctx.lineTo(310+ r[x], 150);
        ctx.lineTo(260+ r[x], 150);
        ctx.lineTo(260+ r[x], 100);
        ctx.fillStyle = "rgba(166,166,166,0.4)";
        ctx.fill();

        // calls function for the moving graph
        newPosition();

        x += 1; //increments the index to go through the displacement array
    }
}

let myReq;
let startPause = document.getElementById("playPauseButton");
// broken function to start/pause the animation - does not work anymore, don't know why...
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

// broken function to stop the animation - does not work anymore, don't know why...
function stopAnime_free() {
    /* Set initial plot */
    x = 0;
    cancelAnimationFrame(myReq);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initPlot();

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
function nextModal(n){
    modalContent[n].style.display = "none";
    modalContent[n+1].style.display = "block";
}