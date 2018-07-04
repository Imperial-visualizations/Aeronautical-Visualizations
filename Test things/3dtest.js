$(window).on('load', function() {
    /** Define dom shorthands for key html elements */
    var dom = {
        intface: $("#interface"),
        play: $("#play"),
        loadSpinner: $("#loading-spinner"),
        animationInput: $("input#animation"),
        animationDisplay: $("#animation-display"),
        },
        /** Create initial layout of plotly plot */
        plt = {
            MaxTraceNo: 12,
            layout: {
                autosize: true,
                 showlegend: false,
                margin: {
                    l: 0, r: 0, b: 0, t: 1, pad: 5
                },
                scene: {
                    aspectmode: "cube",
                    camera:{eye:{x:-1.25,},},
                    xaxis: {
                        range: [-10, 10], autorange: false, zeroline: true, showspikes: false,
                    },
                    yaxis: {
                        range: [-10, 10], autorange: false, zeroline: true, showspikes: false,
                    },
                    zaxis: {
                        range: [-10, 10], autorange: false, zeroline: true, showspikes: false,
                    }
                },
                hovermode: false,
                font: {
                    family: "Fira Sans",
                    size: 14
                }
            },
        };


/** Returns xyz trace of a sphere as a nxn array, given radius and n as inputs */
    function makesphere(r,N){
        let x=[], y=[], z=[];
        for (let i = 0; i <= N; i++) {
            let dx=[],dy=[],dz=[];
            for (let j = 0; j <= N; j++) {
                let theta = i*Math.PI/N, phi=j*2*Math.PI/N;
                dx.push(r*Math.sin(theta)*Math.cos(phi));
                dy.push(r*Math.sin(theta)*Math.sin(phi));
                dz.push(r*Math.cos(theta));
            };
            x.push(dx);
            y.push(dy);
            z.push(dz);
        };
        return({type: 'surface',
            x: x,
            y: y,
            z: z,showscale: false});
    }
/** Create the initial plot */
    Plotly.plot(div='graph', [makesphere(0.5,50)],plt.layout);

    /** Set the onclick functionalities for play button and slider */
        dom.animationInput.on("input", handleAnimationSlider);
        dom.play.on("click",handleplaybutton);

    function handleAnimationSlider() {
        /** Updates plotly plot with new animation frame*/
        let R= $(this).val();
        console.log(R)
        Plotly.animate(div="graph", {
            data: [makesphere(R,9)],
            traces: [0],
            layout: {}
        }, {
            transition: {duration: 1},
            frame: {duration: 1, redraw: false}
        });
        dom.animationDisplay.text($(this).val());
    }
let anim, dr= 0.4;


    function handleplaybutton(){
        function nexttimestep(){
            let R = parseFloat(dom.animationInput.val())
            if(R==10){
                dr= -0.4;
            }else if (R==1){
                dr=0.4;
            };
            R = dr + R
            dom.animationInput.val(R)

            Plotly.animate(div="graph", {
            data: [makesphere(R,9)],
            traces: [0],
            layout: {}
        }, {
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
        });
        return;
        };

        if ($(this).html().toString()=="PLAY") {
            anim = setInterval(nexttimestep, 60/1000);
            console.log(anim);
            $(this).text("PAUSE")
        }else {
            console.log(anim);
            clearInterval(anim);
            $(this).text("PLAY")
            console.log(anim);
        };
    }


    function endLoadingScreen() {
        dom.loadSpinner.fadeOut(0);
    }

});
