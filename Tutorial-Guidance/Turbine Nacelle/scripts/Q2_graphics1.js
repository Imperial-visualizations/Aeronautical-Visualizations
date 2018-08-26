/** ------------------------------------- Set global variables ---------------------------------------**/
/** Store inputs in variables **/
let m, J, l, EI, A2, a1, b1, a, b, c, omega1, omega2, s12, s22, d1, d2, e, A1;

/** Set time variable **/
let t = [0,0];
let t_end = 150;
let n = 3000;
let dt = t_end/(n-1);

/** Calculation of eigenvectors **/
let s11 = 1;
let s21 = 1;

function calcu_resp(){
    m = parseFloat(document.getElementById("m").value);
    J = parseFloat(document.getElementById("J").value);
    l = parseFloat(document.getElementById("l").value);
    EI = parseFloat(document.getElementById("EI").value);
    A2 = parseFloat(document.getElementById("mode1").value);

    /** Calculation of vibration frequencies **/
    a1 = 12 * EI / Math.pow(l,3);
    b1 = 4 * EI / l;
    a = m * b1 + J * a1;
    b = Math.sqrt((Math.pow(a, 2)) - 4 * m * J * (a1 * b1 - 36 * EI^2 / Math.pow(l,4)));
    c = 2 * m * J;
    omega1 = Math.sqrt((a - b) / c);
    omega2 = Math.sqrt((a + b) / c);

    d1 = (12 * EI / Math.pow(l,3) - Math.pow(omega1, 2) * m);
    d2 = (12 * EI / Math.pow(l,3) - Math.pow(omega2, 2) * m);
    e = - 6 * EI / Math.pow(l, 2);
    s12 = - d1 / e;
    s22 = - d2 / e;

    /** Ratio of two modes **/
    A1 = 1 - A2;
}

/** Storing variables **/

let r = [0,0];
let r1 = [0,0];
let r2 = [0,0];
let theta = [0,0];
let theta1 = [0,0];
let theta2 = [0,0];

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

}


function plot_resp2() {
    /** Response of DoF theta **/
    for (i = 0; i < n; i++) {
        t[i] = i*dt;
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

    let JValue = $("#J").val();
    $("#JDisplay").html(JValue);

    let lValue = $("#l").val();
    $("#lDisplay").html(lValue);

    let EIValue = $("#EI").val();
    $("#EIDisplay").html(EIValue);
}

slider();


/** ---------------------------------- Function for animations --------------------------------------- **/

/** Set variables **/
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let x = 0;

/** Import picture into canvas
let pic = new Image();
pic.src = "assets/flag.png";
pic.addEventListener("load", function(){ctx.drawImage(pic,185,75,130,130)}, false);**/

function animate(){
    /** Calculation of the responses r and theta **/
    //Set time interval
    let t2 = x * dt;

    //displacements
    let r2 = A1 * Math.cos(omega1 * t2) * s11 + A2 * Math.cos(omega2 * t2) * s21;
    let theta2 = A1 * Math.cos(omega1 * t2) * s12 + A2 * Math.cos(omega2 * t2) * s22;

    console.log("hi");

    /** The animation function **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Scale up the displacements */
    r2 = r2*10;
    //theta2 = theta2*10;

    /* Draw the DoF r reference lines */
    //draw the DoF
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(250, 55);
    ctx.lineTo(250, 40);
    ctx.lineTo(290, 40);
    ctx.lineTo(285, 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(290, 40);
    ctx.lineTo(285, 45);
    ctx.stroke();

    ctx.lineWidth = 2;

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 17pt san-serif";
    ctx.fillText("r", 270, 25);
    ctx.stroke();

    //Draw the DoF theta
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(250, 140, 100, 340*Math.PI/180, 390*Math.PI/180);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(335,192);
    ctx.lineTo(337, 180);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(335,191);
    ctx.lineTo(346, 185);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 16pt san-serif";
    ctx.fillText("θ", 360, 160);
    ctx.stroke();

    /* Draw the nacelle */
    ctx.translate(250 + r2, 140);
    ctx.rotate(theta2);
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(51,102,153,0.3)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 65, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(51,102,153,0.3)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 65, Math.PI, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgba(51,102,153,0.6)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    //support for nacelle
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-9, 0);
    ctx.lineTo(-4, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(0, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-1, 0);
    ctx.lineTo(4, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(3, 0);
    ctx.lineTo(8, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(12, -5);
    ctx.stroke();

    ctx.restore();

    /* Draw the rod */
    ctx.beginPath();
    ctx.moveTo(250 + r2, 140);
    ctx.lineTo(250, 430);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();

    /* Draw the supports */
    //ground support
    ctx.beginPath();
    ctx.moveTo(220, 430);
    ctx.lineTo(280, 430);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(228, 430);
    ctx.lineTo(220, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(235, 430);
    ctx.lineTo(227, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(242, 430);
    ctx.lineTo(234, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(249, 430);
    ctx.lineTo(241, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(256, 430);
    ctx.lineTo(248, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(263, 430);
    ctx.lineTo(255, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(270, 430);
    ctx.lineTo(262, 441);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(277, 430);
    ctx.lineTo(269, 441);
    ctx.stroke();

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
    document.getElementById("J").value = 6.5;
    document.getElementById("l").value = 1.4;
    document.getElementById("EI").value = 8;
    document.getElementById("mode1").value = 0;
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
}, 1500);