/** ------------------------------------- Set variables ---------------------------------------**/
/** Calculations **/
let  A1 = 50;
let a = 0;
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
let t_end = 150;
let n = 3000;
let interval=(t_end - t_init)/(n-1);
let m = 0;
let I = 0;
let k = 0;
let k_theta = 0;
let l = 0;
let i = 0;

/** Functions **/
let myReq;
let startPause = document.getElementById("playPauseButton");



/** -------------------------------- Plot the displacement against time -------------------------------- **/
/** Calculation of the responses r and theta **/
function calcu_resp() {
    /* Store inputs in variables */
    m = parseFloat(document.getElementById("m").value);
    I = parseFloat(document.getElementById("I").value);
    k = parseFloat(document.getElementById("k").value);
    k_theta = parseFloat(document.getElementById("k_theta").value);
    l = parseFloat(document.getElementById("L").value);
    A2 = parseFloat(document.getElementById("mode1").value);

    /* Calculation of vibration frequencies */
    a = m * (k_theta + k * Math.pow(l, 2)) + I * k;
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * I * k * k_theta);
    c = 2 * m * I;
    omega1 = Math.sqrt((a + b) / c);
    omega2 = Math.sqrt((a - b) / c);

    /* Calculation of eigenvectors */
    d1 = (k - Math.pow(omega1, 2) * m);
    e = -k * l;
    s12 = - d1 / e;

    d2 = (k - Math.pow(omega2, 2) * m);
    e = -k * l;
    s22 = - d2 / e;

    /* Calculations of responses */
    A1 = 1 - A2;

    //Response of DoF r
    for (i = 0; i < n; i++) {
        t[i] = t_init + i * interval;
        r[i] = A1 * Math.cos(omega1 * t[i]) * s11 + A2 * Math.cos(omega2 * t[i]) * s21;
        r1[i] = -omega1 * A1 * Math.sin(omega1 * t[i]) * s11 - omega2 * A2 * Math.sin(omega2 * t[i]) * s21;
        r2[i] = -Math.pow(omega1, 2) * A1 * Math.cos(omega1 * t[i]) * s11 - Math.pow(omega1, 2) * A2 * Math.cos(omega2 * t[i]) * s21;
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

    Plotly.relayout( 'plot_r',{
        'yaxis.autorange': true
    });

}


function calcu_resp2() {

    /* Store inputs in variables */
    m = parseFloat(document.getElementById("m").value);
    I = parseFloat(document.getElementById("I").value);
    k = parseFloat(document.getElementById("k").value);
    k_theta = parseFloat(document.getElementById("k_theta").value);
    l = parseFloat(document.getElementById("L").value);
    A2 = parseFloat(document.getElementById("mode1").value);

    /* Calculation of vibration frequencies */
    a = m * (k_theta + k * Math.pow(l, 2)) + I * k;
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * I * k * k_theta);
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
    A1 = 1 - A2;


    //Response of DoF theta
    for (i = 0; i < n; i++) {
        t[i] = t_init + i * interval;
        theta[i] = A1 * Math.cos(omega1 * t[i]) * s12 + A2 * Math.cos(omega2 * t[i]) * s22;
        theta1[i] = -omega1 * A1 * Math.sin(omega1 * t[i]) * s12 - omega2 * A2 * Math.sin(omega2 * t[i]) * s22;
        theta2[i] = -Math.pow(omega1, 2) * A1 * Math.cos(omega1 * t[i]) * s12 - Math.pow(omega1, 2) * A2 * Math.cos(omega2 * t[i]) * s22;
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
    legend: {x: 0, y: 6, "orientation": "h"},
    margin: {l:100 ,r:5 ,t:50 , b:100 },
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
    if (inner.style.display === "none")
        inner.style.display = "";
    else
        inner.style.display = "none";
}



/** ---------------------------------- Function to display slider value ------------------------------------- **/
function slider() {
    let mValue = $("#m").val();
    $("#mDisplay").html(mValue);

    let LValue = $("#L").val();
    $("#LDisplay").html(LValue);

    let kValue = $("#k").val();
    $("#kDisplay").html(kValue);

    let k_thetaValue = $("#k_theta").val();
    $("#k_thetaDisplay").html(k_thetaValue);

    let IValue = $("#I").val();
    $("#IDisplay").html(IValue);
}

slider();


/** ---------------------------------- Function for animations --------------------------------------- **/
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

/** The animation function **/
let x = 1;
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r[x] = r[x]*10;
    theta[x] = theta[x]*10;

    /* Draw the mass */
    ctx.beginPath();
    ctx.moveTo(70 + r[x], 100);
    ctx.lineTo(120 + r[x], 100);
    ctx.lineTo(120 + r[x], 150);
    ctx.lineTo(70 + r[x], 150);
    ctx.lineTo(70 + r[x], 100);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(120 + r[x], 125);
    ctx.lineTo(150 + r[x], 125);
    ctx.lineTo(155 + (r[x] + (theta[x]*l - r[x])/12), 140);
    for (i = 1; i < 11; i++){
        ctx.lineTo(155 + 10*i + (r[x] + (i + 1)*(theta[x]*l - r[x])/12), 125 + 15*Math.pow(-1,i))
    }
    ctx.lineTo(260 + theta[x]*l, 125);
    ctx.lineTo(290 + theta[x]*l, 125);
    ctx.stroke();

    ctx.save();

    /* Draw the rigid rod */
    //rotate the rigid bar
    ctx.translate(290, 360);
    ctx.rotate(Math.atan(l*theta[x]/235));
    ctx.beginPath();
    ctx.ellipse(0, -120, 15, 130, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    /* Draw the support of rigid rod */
    //Draw the connections (circles)
    ctx.beginPath();
    ctx.arc(290 + theta[x]*l, 125, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(290, 360, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    //Draw a triangle
    ctx.beginPath();
    ctx.moveTo(290, 360);
    ctx.lineTo(318, 395);
    ctx.lineTo(262, 395);
    ctx.lineTo(290, 360);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    //Draw the ground
    ctx.beginPath();
    ctx.moveTo(273, 395);
    ctx.lineTo(263, 405);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(283, 395);
    ctx.lineTo(273, 405);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(293, 395);
    ctx.lineTo(283, 405);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(303, 395);
    ctx.lineTo(293, 405);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(313, 395);
    ctx.lineTo(303, 405);
    ctx.stroke();

    ctx.save();

    //Draw the rotational spring
    ctx.translate(290, 360);
    ctx.rotate(40*Math.PI/180);
    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(-5, 40);
    ctx.rotate(5*Math.PI/180 + Math.atan(theta[x]*l/235)/22);
    ctx.lineTo(-3, 47);
    ctx.rotate(3*Math.PI/180 + Math.atan(theta[x]*l/235)/22);
    for (i = 1; i <= 20; i++){
        ctx.lineTo(-5, 40 + 7*Math.pow(-1, i));
        ctx.rotate(5*Math.PI/180 + Math.atan(theta[x]*l/235)/22);
    }
    ctx.rotate(2*Math.PI/180 + Math.atan(theta[x]*l/235)/22);
    ctx.lineTo(-3, 40);
    ctx.rotate(3*Math.PI/180 + Math.atan(theta[x]*l/235)/22);
    ctx.lineTo(-7, 40);

    ctx.stroke();
    ctx.restore();


    x += 1;
    console.log("hello");

    myReq = requestAnimationFrame(animate);
}



/** --------------------------- Function to start/pause and reset animations ---------------------------- **/
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
    startPause.textContent = "Start";

    /* Set initial values */
    document.getElementById("m").value = 4;
    document.getElementById("I").value = 6.5;
    document.getElementById("k").value = 8;
    document.getElementById("k_theta").value = 8;
    document.getElementById("L").value = 1.5;
    document.getElementById("mode1").value = 0.5;
}



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



/** --------------------------- Function for modal ---------------------------- **/
/*//Get modal element
let modal = document.getElementById("guideModal");
//Get open modal button
let modalBtn = document.getElementById("modalBtn");
//Get close modal button
let closeBtn = document.getElementsByClassName("closeBtn");
//Get next page button
let nextBtn = document.getElementsByClassName("nextBtn");
//Get modals
let modal_1 = document.getElementById("modal_1");
let modal_2 = document.getElementById("modal_2");


// Listen for open click
modalBtn.addEventListener("click", openModal);
//Listen for close click
closeBtn.addEventListener("click", closeModal);
//Listen for outside click
window.addEventListener("click", outsideClick);
//Listen for next page click
nextBtn.addEventListener("click", nextModal);*/

//Get modal element
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