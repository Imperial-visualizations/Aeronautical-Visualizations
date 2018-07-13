ctx.scale(1.15, 1.15);

function initPlot() {
    /** --------------------------------- Set initial plot --------------------------------- **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the mass */
    ctx.beginPath();
    ctx.moveTo(70, 100);
    ctx.lineTo(120, 100);
    ctx.lineTo(120, 150);
    ctx.lineTo(70, 150);
    ctx.lineTo(70, 100);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("m", 87, 168);
    ctx.stroke();

    //draw the DoF
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(95, 90);
    ctx.lineTo(95, 80);
    ctx.lineTo(135, 80);
    ctx.lineTo(130, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(135, 80);
    ctx.lineTo(130, 85);
    ctx.stroke();

    ctx.lineWidth = 1;

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("r, R", 110, 70);
    ctx.stroke();

    /* Draw the linear spring */
    ctx.beginPath();
    ctx.moveTo(120, 125);
    ctx.lineTo(150, 125);
    ctx.lineTo(155, 140);
    for (var i = 1; i < 11; i++) {
        ctx.lineTo(155 + 10 * i, 125 + 15 * Math.pow(-1, i))
    }
    ctx.lineTo(260, 125);
    ctx.lineTo(290, 125);
    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("k", 200, 165);
    ctx.stroke();

    /* Draw the rigid rod */
    ctx.beginPath();
    ctx.ellipse(290, 240, 15, 130, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("I", 286, 244);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("L", 380, 244);

    /* Draw the support of rigid rod */
    //Draw the connections (circles)
    ctx.beginPath();
    ctx.arc(290, 125, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(290, 360, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    //Draw the reference lines
    ctx.beginPath();

    ctx.moveTo(360, 125);
    ctx.lineTo(370, 125);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(365, 125);
    ctx.lineTo(365, 360);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(360, 360);
    ctx.lineTo(370, 360);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(365, 125);
    ctx.lineTo(360, 130);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(365, 125);
    ctx.lineTo(370, 130);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(365, 360);
    ctx.lineTo(360, 355);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(365, 360);
    ctx.lineTo(370, 355);
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

    //Draw the DoF
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(290, 355);
    ctx.lineTo(290, 315);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(294, 357);
    ctx.lineTo(320, 324);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(314, 331);
    ctx.lineTo(306, 323);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(314, 331);
    ctx.lineTo(304, 329);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(290, 363, 40, 270*Math.PI/180, 307*Math.PI/180);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("θ, Θ", 311, 315);
    ctx.stroke();

    ctx.lineWidth = 1;

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
    ctx.rotate(5*Math.PI/180);
    ctx.lineTo(-3, 47);
    ctx.rotate(3*Math.PI/180);
    for (i = 1; i <= 20; i++){
        ctx.lineTo(-5, 40 + 7*Math.pow(-1, i));
        ctx.rotate(5*Math.PI/180);
    }
    ctx.rotate(2*Math.PI/180);
    ctx.lineTo(-3, 40);
    ctx.rotate(3*Math.PI/180);
    ctx.lineTo(-7, 40);

    ctx.stroke();
    ctx.restore();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("k", 210, 360);
    ctx.font = "italic 9pt san-serif";
    ctx.fillText("θ", 219, 362);
    ctx.stroke();
}

initPlot();