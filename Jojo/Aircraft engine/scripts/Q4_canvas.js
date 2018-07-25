function initPlot() {
    /** --------------------------------- Set initial plot --------------------------------- **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    /* Draw the mass */
    ctx.beginPath();
    ctx.arc(260, 200, 10, 0, 2*Math.PI);
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
    ctx.lineTo(260, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 80);
    ctx.lineTo(260, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 320);
    ctx.lineTo(260, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 320);
    ctx.lineTo(260, 200);
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
}

initPlot();