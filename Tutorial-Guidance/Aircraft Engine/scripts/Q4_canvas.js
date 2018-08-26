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

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("m", 250, 240);
    ctx.stroke();

    /* Draw the DoF r1 */
    ctx.beginPath();
    ctx.moveTo(260, 180);
    ctx.lineTo(260, 140);
     ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(260, 140);
    ctx.lineTo(254, 148);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(260, 140);
    ctx.lineTo(266, 148);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("r", 240, 130);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 11pt san-serif";
    ctx.fillText("2", 248, 135);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText(", R", 257, 131);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 11pt san-serif";
    ctx.fillText("2", 284, 135);
    ctx.stroke();

    /* Draw the DoF r2 */
    ctx.beginPath();
    ctx.moveTo(280, 200);
    ctx.lineTo(320, 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(320, 200);
    ctx.lineTo(312, 194);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(320, 200);
    ctx.lineTo(312, 206);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText("r", 300, 185);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 11pt san-serif";
    ctx.fillText("1", 308, 190);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 18pt san-serif";
    ctx.fillText(", R", 317, 186);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "italic 11pt san-serif";
    ctx.fillText("1", 344, 190);
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

    /* Draw the reference lines */
    ctx.beginPath();
    ctx.moveTo(80, 80);
    ctx.lineTo(80, 320);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(70, 80);
    ctx.lineTo(90, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 80);
    ctx.lineTo(72, 88);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 80);
    ctx.lineTo(88, 88);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(70, 320);
    ctx.lineTo(90, 320);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 320);
    ctx.lineTo(72, 312);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 320);
    ctx.lineTo(88, 312);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("ℓ", 50, 200);
    ctx.stroke();

    /* Draw the reference lines */
    ctx.beginPath();
    ctx.moveTo(140, 380);
    ctx.lineTo(380, 380);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 370);
    ctx.lineTo(140, 390);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 380);
    ctx.lineTo(148, 372);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 380);
    ctx.lineTo(148, 388);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 370);
    ctx.lineTo(380, 390);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 380);
    ctx.lineTo(372, 372);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(380, 380);
    ctx.lineTo(372, 388);
    ctx.stroke();

    //text
    ctx.fillStyle = "black";
    ctx.font = "italic 15pt san-serif";
    ctx.fillText("ℓ", 260, 410);
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