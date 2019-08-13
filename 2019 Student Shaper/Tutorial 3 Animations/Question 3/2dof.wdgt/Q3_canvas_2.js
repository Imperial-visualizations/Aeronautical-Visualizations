function initPlot() {
    /** --------------------------------- Set initial plot --------------------------------- **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the mass 1 */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(250, 275 , 15, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 16pt san-serif";
    ctx.fillText("m", 280, 280);
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
    ctx.font = "italic 17pt san-serif";
    ctx.fillText("r", 142, 250);
    ctx.font = "italic 9pt san-serif";
    ctx.fillText("1", 150, 255);
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("(t)", 160, 250);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("R", 140, 280);
    ctx.font = "italic 9pt san-serif";
    ctx.fillText("1", 152, 285);
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("(t)", 160, 280);
    ctx.stroke();

    /* Draw the spring 1 */
    ctx.beginPath();
    ctx.moveTo(250, 275) ;
    ctx.lineTo(250, 305);
    ctx.lineTo(225, 310);
    for (var i = 1; i <= 9; i++) {
        ctx.lineTo(250 - 25 * Math.pow(-1, i), 310 + 10 * i);
    }
    ctx.lineTo(250, 410);
    ctx.lineTo(250, 425);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 16pt san-serif";
    ctx.fillText("k", 290, 350);
    ctx.stroke();

     /* Draw the mass 2 */
    ctx.beginPath();
    ctx.arc(250, 125, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("2m", 280, 130);
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
    ctx.font = "italic 17pt san-serif";
    ctx.fillText("r", 142, 100);
    ctx.font = "italic 9pt san-serif";
    ctx.fillText("2", 150, 105);
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("(t)", 160, 100);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("R", 140, 130);
    ctx.font = "italic 9pt san-serif";
    ctx.fillText("1", 152, 135);
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("(t)", 160, 130);
    ctx.stroke();

    /* Draw the spring 2 */
    ctx.beginPath();
    ctx.moveTo(250, 125);
    ctx.lineTo(250, 155);
    ctx.lineTo(225, 160);
    for (var i = 1; i <= 8; i++) {
        ctx.lineTo(250 - 25 * Math.pow(-1, i), 160 + 10 * i);
    }
    ctx.lineTo(250, 245);
    ctx.lineTo(250, 275);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("2k", 290, 200);
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
}

initPlot();