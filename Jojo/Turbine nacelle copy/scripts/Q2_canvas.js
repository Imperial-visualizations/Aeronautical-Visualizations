function initPlot() {
    /** --------------------------------- Set initial plot --------------------------------- **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the nacelle */
    ctx.beginPath();
    ctx.arc(250, 140, 65, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(166,166,166,0.4)";
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(84,84,84,1)";
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("m, J", 233, 115);
    ctx.stroke();

    //Draw the DoF theta
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(250, 140, 80, 290*Math.PI/180, 410*Math.PI/180);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(301,202);
    ctx.lineTo(305, 190);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(301,201);
    ctx.lineTo(312, 199);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("θ, Θ", 330, 200);
    ctx.stroke();

    //Draw the DoF r
    ctx.beginPath();
    ctx.moveTo(370, 140);
    ctx.lineTo(450, 140);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450, 140);
    ctx.lineTo(440, 134);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450, 140);
    ctx.lineTo(440, 146);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("r, R", 400, 125);
    ctx.stroke();

    /* Draw the rod */
    ctx.beginPath();
    ctx.moveTo(250, 140);
    ctx.lineTo(250, 430);
    ctx.lineWidth = 5;
    ctx.stroke();

    //Draw reference lines
    ctx.beginPath();
    ctx.moveTo(135, 140);
    ctx.lineTo(155, 140);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(135, 430);
    ctx.lineTo(155, 430);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(145, 140);
    ctx.lineTo(145, 430);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(145, 140);
    ctx.lineTo(137, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(145, 140);
    ctx.lineTo(153, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(145, 430);
    ctx.lineTo(137, 420);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(145, 430);
    ctx.lineTo(153, 420);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("ℓ", 110, 285);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("EI", 280, 285);
    ctx.stroke();

    /* Draw the supports */
    //support for nacelle
    ctx.beginPath();
    ctx.moveTo(240, 140);
    ctx.lineTo(260, 140);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(241, 140);
    ctx.lineTo(246, 135);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(245, 140);
    ctx.lineTo(250, 135);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(249, 140);
    ctx.lineTo(254, 135);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(253, 140);
    ctx.lineTo(258, 135);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(257, 140);
    ctx.lineTo(262, 135);
    ctx.stroke();

    //ground support
    ctx.beginPath();
    ctx.moveTo(220, 430);
    ctx.lineTo(280, 430);
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
}

initPlot();