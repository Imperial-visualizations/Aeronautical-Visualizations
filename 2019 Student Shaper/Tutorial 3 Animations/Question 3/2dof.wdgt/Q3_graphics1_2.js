/** ------------------------------------- Set global variables ---------------------------------------**/
/** Store inputs in variables **/
let m, k, Omega, omega, R0, delta, r0, rr0;

/** Set time variable **/
let t = [0,0];
let t_end = 150;
let n = 3000;
let dt = t_end/(n-1);

function calcu_resp(){
    m = parseFloat(document.getElementById("m").value);
    k = parseFloat(document.getElementById("k").value);
    Omega = parseFloat(document.getElementById("Omega").value);
    R0 = parseFloat(document.getElementById("R0").value);

    omega = Math.sqrt(k/m);
    Omega = Omega * omega;

    delta = (3 * k - m * Math.pow(Omega, 2)) * (2 * k - 2 * m * Math.pow(Omega, 2)) - 4 * Math.pow(k, 2);
    r0 = (1 / delta) * (2 * k - 2 * m * Math.pow(Omega, 2)) * R0;
    rr0 = (1 / delta) * 2 * k * R0;
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
        r[i] = r0 * Math.cos(Omega * t[i]);
        r1[i] = -Omega * r0 * Math.sin(Omega * t[i]);
        r2[i] = -Math.pow(Omega, 2) * r0 * Math.cos(Omega * t[i]);
    }

    //Update the graph immediately after the parameters change
    Plotly.animate(div = "plot_r1", {
        data: [trace_r, trace_r1, trace_r2],
        traces: [0, 1, 2],
        layout: {}
    }, {
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
    });

    Plotly.relayout( 'plot_r1',{
        'yaxis.autorange': true
    });
}

function plot_resp2() {
    /** Response of DoF r **/
    for (i = 0; i < n; i++) {
        t[i] = i*dt;
        rr[i] = rr0 * Math.cos(Omega * t[i]);
        rr1[i] = -Omega * rr0 * Math.sin(Omega * t[i]);
        rr2[i] = -Math.pow(Omega, 2) * rr0 * Math.cos(Omega * t[i]);
    }

    //Update the graph immediately after the parameters change
    Plotly.animate(div = "plot_r2", {
        data: [trace_rr, trace_rr1, trace_rr2],
        traces: [0, 1, 2],
        layout: {}
    }, {
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
    });

    Plotly.relayout( 'plot_r2',{
        'yaxis.autorange': true
    });
}

//store the data for r1 as traces
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

//store the data for r2 as traces
let trace_rr = {
    x: t,
    y: rr,
    type: "scatter",
    name: "Displacement",
    mode: "lines",
};

let trace_rr1 = {
    x: t,
    y: rr1,
    type: "scatter",
    name: "Velocity",
    mode: "lines",
};

let trace_rr2 = {
    x: t,
    y: rr2,
    type: "scatter",
    name: "Acceleration",
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
//plot r1 response
Plotly.newPlot('plot_r1', [trace_r, trace_r1, trace_r2], resp_layout, {displayModeBar: false});
//plot r2 response
Plotly.newPlot('plot_r2', [trace_rr, trace_rr1, trace_rr2], resp_layout, {displayModeBar: false});



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

    let kValue = $("#k").val();
    $("#kDisplay").html(kValue);

    let R0Value = $("#R0").val();
    $("#R0Display").html(R0Value);

    let OmegaValue = $("#Omega").val();
    $("#OmegaDisplay").html(OmegaValue);
}

slider();


/** ---------------------------------- Function for animations --------------------------------------- **/
/** Set variables **/
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let x = 0;
let y = 0;


function animate(){

    /** Calculation of the responses r and theta **/
        //Set time interval
    let t2 = x * dt;

    //displacements
    let r2 = r0 * Math.cos(Omega * t2);
    let rr2 = rr0 * Math.cos(Omega * t2);

    //scale up the displacement
    r2 = r2 * 50;
    rr2 = rr2 * 50;

    /* Draw the mass 1 */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(250, 275 + r2, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    //draw the DoF
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(215, 275);
    ctx.lineTo(200, 275);
    ctx.lineTo(200, 235);
    ctx.lineTo(193, 242);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 235);
    ctx.lineTo(207, 242);
    ctx.stroke();

    ctx.lineWidth = 1;

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("r", 140, 260);
    ctx.font = "italic 11pt san-serif";
    ctx.fillText("1", 148, 265);
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("(t)", 160, 260);
    ctx.stroke();

    /* Draw the spring 1 */
    ctx.beginPath();
    ctx.moveTo(250, 275 + r2) ;
    ctx.lineTo(250, 305 + r2);
    ctx.lineTo(225, 310 + (r2 - r2/20));
    for (var i = 1; i <= 9; i++) {
        ctx.lineTo(250 - 25 * Math.pow(-1, i), 310 + 10 * i + (r2 - (i + 1) * r2/8));
    }
    ctx.lineTo(250, 410);
    ctx.lineTo(250, 425);
    ctx.stroke();

     /* Draw the mass 2 */
    ctx.beginPath();
    ctx.arc(250, 125 + rr2, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    //draw the DoF
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(215, 125);
    ctx.lineTo(200, 125);
    ctx.lineTo(200, 85);
    ctx.lineTo(193, 92);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 85);
    ctx.lineTo(207, 92);
    ctx.stroke();

    ctx.lineWidth = 1;

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("r", 140, 110);
    ctx.font = "italic 11pt san-serif";
    ctx.fillText("2", 148, 115);
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("(t)", 160, 110);
    ctx.stroke();

    /* Draw the spring 2 */
    ctx.beginPath();
    ctx.moveTo(250, 125 + rr2);
    ctx.lineTo(250, 155 + rr2);
    ctx.lineTo(225, 160 + (rr2 - (rr2 - r2)/20));
    for (var i = 1; i <= 8; i++) {
        ctx.lineTo(250 - 25 * Math.pow(-1, i), 160 + 10 * i + (rr2 - (i + 1) * (rr2 - r2)/8));
    }
    ctx.lineTo(250, 245 + r2);
    ctx.lineTo(250, 275 + r2);
    ctx.stroke();

    /* Draw the support */
    ctx.beginPath();
    ctx.moveTo(250, 425);
    ctx.lineTo(275, 455);
    ctx.lineTo(225, 455);
    ctx.lineTo(250, 425);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(233, 455);
    ctx.lineTo(223, 465);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(243, 455);
    ctx.lineTo(233, 465);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(253, 455);
    ctx.lineTo(243, 465);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(263, 455);
    ctx.lineTo(253, 465);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(273, 455);
    ctx.lineTo(263, 465);
    ctx.stroke();

    x += 1;

    myReq = requestAnimationFrame(animate);
    return
}



/** --------------------------- Function to start/pause and reset animations ---------------------------- **/
function startAnime() {
    if (startPause.textContent === "Start") {
        requestAnimationFrame(animate);
        startPause.textContent = "Pause";
    }

    else {
        cancelAnimationFrame(myReq);
        startPause.textContent = "Start"
    }
}


function stopAnime() {
    /* Set initial plot */
    x = 0;
    y = 0;
    cancelAnimationFrame(myReq);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initPlot();
    startPause.textContent = "Start";

    /* Set initial values */
    document.getElementById("m").value = 4;
    document.getElementById("k").value = 8.5;
    document.getElementById("R0").value = 1.5;
    document.getElementById("Omega").value = 0.95;
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
