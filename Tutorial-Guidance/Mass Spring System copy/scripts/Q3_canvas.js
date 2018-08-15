function initPlot() {
    /** --------------------------------- Set initial plot --------------------------------- **/
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw the mass */
    ctx.beginPath();
    ctx.arc(250, 150, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    /* Draw the spring */
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 190);
    ctx.lineTo(225, 195);
    for (var i = 1; i <= 19; i++) {
        ctx.lineTo(250 - 25 * Math.pow(-1, i), 195 + 10 * i);
    }
    ctx.lineTo(250, 395);
    ctx.lineTo(250, 425);
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