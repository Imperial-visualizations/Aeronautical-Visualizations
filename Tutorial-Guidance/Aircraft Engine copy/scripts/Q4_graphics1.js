/** ------------------------------------- Set global variables ---------------------------------------**/
/** Store inputs in variables **/
let m, EA, l, A2, k, omega1, omega2, s12, s22, A1;

/** Set time variable **/
let t = [0,0];
let t_end = 150;
let n = 3000;
let dt = t_end/(n-1);

/** Calculation of eigenvectors **/
let s11 = 1;
let s21 = 0;

function calcu_resp(){
    m = parseFloat(document.getElementById("m").value);
    l = parseFloat(document.getElementById("l").value);
    EA = parseFloat(document.getElementById("EA").value);
    A2 = parseFloat(document.getElementById("mode1").value);

    /** Calculation of vibration frequencies **/
    //The 2 DoF are uncoupled, so the vibration frequencies are the same
    k = 2 * Math.sqrt(2) * EA / l;
    omega1 = Math.sqrt(k / m);
    omega2 = Math.sqrt(k / m);

    s12 = 0;
    s22 = 1;

    /** Ratio of two modes **/
    A1 = 1 - A2;
}

/** Storing variables **/

let r = [0,0];
let r1 = [0,0];
let r2 = [0,0];
let rr = [0,0];
let rr1 = [0,0];
let rr2 = [0,0];

let i = 0;

/** Function variables **/
let myReq;
let startPause = document.getElementById("playPauseButton");




/** -------------------------------- Plot the displacement against time -------------------------------- **/
/** Calculation of the responses r and theta **/
function plot_resp() {
    /** Response of DoF r **/
    for (i = 0; i < n; i++) {
        t[i] = i*dt;
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
    console.log("aaaaaaa")
}


function plot_resp2() {
    /** Response of DoF theta **/
    for (i = 0; i < n; i++) {
        t[i] = i*dt;
        rr[i] = A1 * Math.cos(omega1 * t[i]) * s12 + A2 * Math.cos(omega2 * t[i]) * s22;
        rr1[i] = -omega1 * A1 * Math.sin(omega1 * t[i]) * s12 - omega2 * A2 * Math.sin(omega2 * t[i]) * s22;
        rr2[i] = -Math.pow(omega1, 2) * A1 * Math.cos(omega1 * t[i]) * s12 - Math.pow(omega1, 2) * A2 * Math.cos(omega2 * t[i]) * s22;
    }

    //Update the graph immediately after the parameters change
    Plotly.animate(div = "plot_theta", {
        data: [trace_rr, trace_rr1, trace_rr2],
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
let trace_rr = {
    x: t,
    y: rr,
    type: "scatter",
    name: "Angular Displacement",
    mode: "lines",
};

let trace_rr1 = {
    x: t,
    y: rr1,
    type: "scatter",
    name: "Angular Velocity",
    mode: "lines",
};

let trace_rr2 = {
    x: t,
    y: rr2,
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
Plotly.newPlot('plot_theta', [trace_rr, trace_rr1, trace_rr2], resp_layout, {displayModeBar: false});



/** ---------------------------------- Function to hide and display ------------------------------------- **/

function showSpoiler()
{
    //var inner = obj.parentNode.getElementsByTagName("div")[0];
    var inner =document.getElementById("spoiler1");
    if (inner.style.display === "none")
        inner.style.display = "";
    else
        inner.style.display = "none";
}



/** ---------------------------------- Function to display slider value ------------------------------------- **/
function slider() {
    let mValue = $("#m").val();
    $("#mDisplay").html(mValue);

    let lValue = $("#l").val();
    $("#lDisplay").html(lValue);

    let EAValue = $("#EA").val();
    $("#EADisplay").html(EAValue);
}

slider();


/** ---------------------------------- Function for animations --------------------------------------- **/
/** Set variables **/
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let x = 0;

function animate(){
    /** Calculation of the responses r and theta **/
        //Set time interval
    let t2 = x * dt;

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

    myReq = requestAnimationFrame(animate);
    return
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
    document.getElementById("EA").value = 7.5;
    document.getElementById("l").value = 1.5;
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
    modalContent[6].style.display = "none";
}

function scrollToTop(){
    //Scroll to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollToBottom(){
    //Scroll to top
    document.body.scrollTop = 1000; // For Safari
    document.documentElement.scrollTop = 1000; // For Chrome, Firefox, IE and Opera
}

//Function to close modal
function closeModal(){
    modal.style.display = "none";
}

//Function to close modal if outside click
function outsideClick(e){
    if(e.target === modal){
        modal.style.display = "none";
        currentSlide(1);
    }
}

//Function to close current modal and open next modal
function nextModal(n){
    modalContent[n].style.display = "none";
    modalContent[n+1].style.display = "block";
}

/** --------------------------- Function for hiding after few seconds---------------------------- **/
/* Function to make fade out instruction tab after window load */
//Display nav bar
function navShow(){document.getElementById("instructions").style.left = "30px";}
navShow();

//Hide nav bar
function navHide(){document.getElementById("instructions").style.left = "5px";
    document.getElementById("instructions").style.transitionDuration = "1s";}

/* Function to make fade out prev next tabs after window load */
function arrowShow1(){document.getElementById("prev1").style.color = "#006EAF";}
arrowShow1();

function arrowShow2(){document.getElementById("prev2").style.color = "#006EAF";}
arrowShow2();

//Hide nav bar
function arrowHide1(){document.getElementById("prev1").style.color = "white";}

function arrowHide2(){document.getElementById("prev2").style.color = "white";}

//Set timeout in milliseconds
setTimeout(function() {
    navHide();
    arrowHide1();
    arrowHide2();
}, 3000);