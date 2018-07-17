// Draw the scene
let graphics = (function() {
    let canvas = null, // Canvas DOM element.
        context = null, // Canvas context for drawing.
        canvasHeight = 100,
        boxSize = 50, // changes the size of the mass
        springInfo = {
            height: 40, // changes the appearance of the spring (height of the peak)
            numberOfSegments: 50 // Number of segments in the spring.
        },
        // defines colors to be used in the visualisation
        colors = {
            shade30: "#449ECF", // changes the color of the outline of the mass
            shade40: "#006EAF", // changes color wall and spring
            shade50: "#0091D4" // changes the inside color of the mass
        };

    // Return the middle X position of the box
    function boxMiddleX(position) {
        let boxSpaceWidth = canvas.width - 2*boxSize;
        return boxSpaceWidth * (position + 1) / 2 + boxSize / 2;
    }

    // Draw spring from the box to the center. Position argument is the box position and varies from -1 to 1.
    // Value 0 corresponds to the central position, while -1 and 1 are the left and right respectively.
    function drawSpring(position) {
        let springEndX = boxMiddleX(position), // sets the end point of the spring to the position of the mass
            springTopY = (canvasHeight - springInfo.height) / 2, // defines the height of the spring on the y-axis
            springEndY = canvasHeight /2, //
            canvasMiddleX = canvas.width / 2, // end point of the spring to the left of the wall
            singleSegmentWidth = (canvasMiddleX - springEndX) / (springInfo.numberOfSegments - 1), //defines the width of one single segment
            springGoesUp = true;

        context.beginPath();
        context.lineWidth = 1; // thickness of the spring (visually)
        context.strokeStyle = colors.shade40; // sets the color of the spring by calling relevant function
        context.moveTo(springEndX, springEndY);

        for (let i = 0; i < springInfo.numberOfSegments; i++) {
            let currentSegmentWidth = singleSegmentWidth;
            if (i === 0 || i === springInfo.numberOfSegments - 1) { currentSegmentWidth /= 2; }

            springEndX += currentSegmentWidth;
            springEndY = springTopY;
            if (!springGoesUp) { springEndY += springInfo.height; }
            if (i === springInfo.numberOfSegments - 1) { springEndY = canvasHeight / 2; }

            context.lineTo(springEndX, springEndY);
            springGoesUp = !springGoesUp;
        }

        context.stroke();
    }

    // Draw a box at position. Position is a value from -1 to 1.
    // Value 0 corresponds to the central position, while -1 and 1 are the left and right respectively.
    function drawBox(position) { //initial position of the box
        let boxTopY = Math.floor((canvasHeight - boxSize) / 2); // y coordinate of the upper side of the box
        let startX = boxMiddleX(position) - boxSize / 2;

        // Rectangle
        context.beginPath();
        context.fillStyle = colors.shade50;
        context.fillRect(startX, boxTopY, boxSize, boxSize);
        // fillRect() method of the Canvas 2D API draws a filled
        // rectangle whose starting point is at the coordinates (x, y) with the specified width and height and whose style
        // is determined by the fillStyle attribute.

        // Border around rectangle
        context.beginPath();
        context.lineWidth = 1; // thickness border
        context.strokeStyle = colors.shade30; // color of the border
        context.strokeRect(startX + 0.5, boxTopY + 0.5, boxSize - 1, boxSize - 1);
    }

    // Draw vertical line in the middle (Wall)
    function drawMiddleLine() {
        let middleX = Math.floor(canvas.width / 2); // defines position of the wall in the center of the canvas

        context.beginPath();
        context.moveTo(middleX, 0);
        context.lineTo(middleX, canvas.height);
        context.lineWidth = 2;
        context.strokeStyle = colors.shade40; // color of the wall
        context.setLineDash([2,3]); // defines the length of the lines and the distance between them (wall)
        context.stroke();
        context.setLineDash([1,0]); // this line will change the dash of the spring
    }

    // Clears everything and draws the whole scene after
    function drawScene(position) {
        context.clearRect(0, 0, canvas.width, canvas.height); // erases element in the canvas
        drawMiddleLine(); // calls the function to draw wall
        drawSpring(position); // calls function to draw spring
        drawBox(position); // calls function to draw mass
    }
// in case browser does not support canvas
    function hideCanvasNotSupportedMessage() {
        document.getElementById("HarmonicOscillator-notSupportedMessage").style.display ='none';
    }

    // Resize canvas to will the width of container
    function fitToContainer(){
        canvas.style.width='100%'; // scales the canvas
        canvas.style.height= canvasHeight + 'px';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Create canvas for drawing and call success argument
    function init(success) {
        // Find the canvas HTML element
        canvas = document.querySelector(".HarmonicOscillator-canvas");

        // Check if the browser supports canvas drawing
        if (!(window.requestAnimationFrame && canvas && canvas.getContext)) { return; }

        // Get canvas context for drawing
        context = canvas.getContext("2d");
        if (!context) { return; } // Error, browser does not support canvas

        // If we got to this point it means the browser can draw
        // Hide the old browser message
        hideCanvasNotSupportedMessage();

        // Update the size of the canvas
        fitToContainer();

        // Execute success callback function
        success();
    }

    return {
        fitToContainer: fitToContainer,
        drawScene: drawScene,
        init: init
    };
})();

// Call init function
graphics.init(function(){});

// Draw scene
graphics.drawScene(1);

// defines layout of the graph to be plotted (borders, style etc...)
let  layout = {
    autosize: true,
    margin:{
        l:20, r:20, b:20, t:1
    },
    xaxis:{range: [-1.3,1.3]},
    yaxis:{autorange: true},
    legend: {x: 0, y: 10, orientation: "h"
    },
    font: {
        family: "Fira Sans", size:16
    }

};

let  layout2 = {
    autosize: true,
    margin:{
        l:20, r:20, b:20, t:1
    },
    yaxis:{range: [-1.3,1.3]},
    xaxis:{autorange: true},
    legend: {x: 0, y: 10, orientation: "h"
    },
    font: {
        family: "Fira Sans", size:16
    }

};

// initialize graph (graph need to be created first so it can be animated after)
Plotly.plot('graphmoving', [{x: parseFloat(document.getElementById("IniDisp").value), y: t_init}], layout, {displayModeBar: false});
Plotly.plot('AVD_free',[{y: parseFloat(document.getElementById("IniDisp").value), x: t_init},{y:document.getElementById("IniVelo"),x:t_init},{y: 0, x:t_init}], layout2, {displayModeBar: false});
Plotly.plot('Energy_free' ,[{y: 0, x: t_init},{y: 0,x:t_init},{y: 0, x:t_init},{y:0, x:t_init}],layout2, {displayModeBar: false});
// initialize displacement/time arrays
let r_array=[];
let t_array=[];
let v_array=[];
let a_array=[];
let d_array=[0];
let ke_array=[];
let ks_array=[];

// Calculate position and velocity of the box
let physics = (function() {
    // Define initial condition for the system
    let initialConditions = {
        position:       1.0, // Box is shown on the right initially
        velocity:       0.0, // Velocity is zero
        springConstant: 100.0, // The higher the value the stiffer the spring
        mass:           10.0 // The mass of the box
    };

    // Current state of the system
    let state = {
        /*
        Position of the box:
          0 is when the box is at the center.
          1.0 is the maximum position to the right.
          -1.0 is the maximum position to the left.
        */
        position: 0,
        velocity: 0,
        springConstant: 0, // The higher the value the stiffer the spring
        mass: 0 // The mass of the box
    };

    function resetStateToInitialConditions() {
        state.position = initialConditions.position;
        state.velocity = initialConditions.velocity;
        state.springConstant = initialConditions.springConstant;
        state.mass = initialConditions.mass;
    }

    // Variable initialization
    let k_ani =0;
    let c_ani =0 ;
    let m_ani =0;
    // let t_end_ani =100 ;
    let t_init_ani =0 ;
    let t_end_ani= 100;
    let v_0_ani =0;
    let r_0_ani =0;
    const n_ani = 1000 ; // number of points
    //  let omega_ani = Math.sqrt(k/m);
    let interval_ani= ( t_end-t_init_ani) /(n_ani-1) ;  // creates time intervals for the for loop
    let alpha_ani =0;
    let beta_ani=0;
    let r_ani= 0; // displacement array
    let v_ani= 0;
    let a_ani=0;
    let t_ani=0;
    let roc_ani =0;
    let p1_ani=0;  // first real solution of the heavy damping case
    let p2_ani=0; // second real solution of the heavy damping case
    let r01_ani=0; // first constant in the heavy damping case (from BC)
    let r02_ani=0; // second constant in the heavy damping case (from BC)
    let p0_ani=0;

    function newPosition() {// gets values from the sliders in the HTML (value is called by the ID of the slider in the HTML file)
        k_ani = parseFloat(document.getElementById("Spring").value);
        c_ani = parseFloat(document.getElementById("Damping").value);
        m_ani = parseFloat(document.getElementById("Mass").value);
        // Initial displacement and velocity
        v_0_ani = parseFloat(document.getElementById("IniVelo").value);
        r_0_ani = parseFloat(document.getElementById("IniDisp").value);

        //  let omega = Math.sqrt(k/m);
        if (Math.pow(c_ani, 2) < 4 * k_ani * m_ani) {  // lightly damped damping

            if (t_ani === 0 ){ //This loop will refresh the value of initial displacement once the simulation is started
                alpha_ani = -c_ani / (2 * m_ani);
                v_ani=v_0_ani;
                beta_ani = (1 / 2 * m_ani) * Math.sqrt(4 * k_ani * m_ani - Math.pow(c_ani, 2));
                roc_ani = (v_0_ani - r_0_ani * alpha_ani) / beta_ani;}

            else
                roc_ani = r_ani;
            alpha_ani = -c_ani / (2 * m_ani);
            roc_ani = (v_0_ani - r_0_ani * alpha_ani) / beta_ani;  //from boundary conditions
            beta_ani = (1 / 2 * m_ani) * Math.sqrt(4 * k_ani * m_ani - Math.pow(c_ani, 2));
            r_ani = r_0_ani * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) + ((v_0_ani - r_0_ani * alpha_ani) / beta_ani) * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani); //expression for the displacement
            v_ani = r_0_ani * (alpha_ani * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) - beta_ani * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani) + roc_ani * (alpha_ani * Math.exp(alpha * t_ani) * Math.sin(beta_ani * t_ani) + Math.exp(alpha_ani * t_ani) * beta_ani * Math.cos(beta_ani * t_ani)));
            a_ani = r_0_ani * (Math.pow(alpha_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) - 2 * alpha_ani * beta_ani * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani) - Math.pow(beta_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani)) + roc_ani * (Math.pow(alpha_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani) + 2 * alpha_ani * beta_ani * Math.exp(alpha_ani * t_ani) * Math.cos(beta_ani * t_ani) - Math.pow(beta_ani, 2) * Math.exp(alpha_ani * t_ani) * Math.sin(beta_ani * t_ani));

            // r_ani= r_ani //scaling - TO MODIFY
        }

        else if (Math.pow(c_ani, 2) > 4 * k_ani * m_ani) { // heavy damping
            if (t_ani === 0 ){
                r01_ani = (v_0_ani - (p2_ani * r_0_ani)) / (p1_ani - p2_ani);
                r02_ani = (r_0_ani - r01_ani);
                v_ani=v_0_ani;
            }
            else
                r01_ani = (v_ani - (p2_ani * r_0_ani)) / (p1_ani - p2_ani);
            r02_ani = (r_ani- r01_ani);
            p1_ani = (1 / 2 * m_ani) * (-c_ani + Math.sqrt(Math.pow(c_ani, 2) - 4 * k_ani * m_ani));
            p2_ani = (1 / 2 * m_ani) * (-c_ani - Math.sqrt(Math.pow(c_ani, 2) - 4 * k_ani * m_ani));
            r_ani = r01_ani * Math.exp(p1_ani * t_ani) + r02_ani * Math.exp(p2_ani * t_ani); //displacement
            v_ani = p1_ani * r01_ani * Math.exp(p1_ani * t_ani) + p2_ani * r02_ani * Math.exp(p2_ani * t_ani); //velocity
            a_ani = Math.pow(p1_ani, 2) * r01_ani * Math.exp(p1_ani * t_ani) + Math.pow(p2_ani, 2) * r02_ani * Math.exp(p2_ani * t_ani); //acceleration
            // r_ani= r_ani // scaling
        }

        else if (Math.pow(c_ani, 2) === 4 * k_ani * m_ani) { //critical damping
            if (t_ani === 0){
                //r_0_ani = document.getElementById("IniDisp").value;
                v_ani=v_0_ani;
                r_ani=r_0_ani;

            }
            else
                r_0_ani = r_ani;
            p0_ani = -c_ani / (2 * m_ani);
            r_ani = r_0_ani * Math.exp(p0_ani * t_ani);
            v_ani = r_0_ani * p0_ani * Math.exp(p0_ani * t_ani);
            a_ani = r_0_ani * Math.pow(p0_ani, 2) * Math.exp(p0_ani * t_ani);
            // r_ani= r_ani // scaling
        }


         //time counter, incremented at each iteration
        r_array.push(r_ani); // .push will add a value to an array. It adds the value of the new displacement to an array
        v_array.push(v_ani);
        a_array.push(a_ani);
        t_array.push(t_ani); // same as above but for time
        t_ani += interval_ani;
        // Energy Calculations

        let KS=0.5*k_ani*Math.pow(r_ani,2);
        let KE=0.5*m_ani*Math.pow(v_ani,2);
        d_array[0]=0;
        d_array[1]=d_array[0]+c_ani*v_array[v_array.length]*(r_array[r_array.length]-r_array[r_array.length-1]);
        let D=d_array[d_array.length-1]+c_ani*v_array[v_array.length]*(r_array[r_array.length]-r_array[r_array.length-1]);
        //let TotalE = 0.5*k_ani*Math.pow(r_0_ani,2);
        //let  D=(TotalE-(KE+KS));
        d_array.push(D);
        ks_array.push(KS);
        ke_array.push(KE);
        //  console.log(D);
        // console.log(d_array);

        for (let i=0; i<r_array.length; i++){
            if (isNaN(d_array[i])){
                d_array[i]=d_array[i-1];
            }
        }

        console.log(d_array);

        //animate the graphs using the arrays above
        Plotly.animate(div="graphmoving", {
            data: [{x: r_array, y: t_array}],
            traces: [0],
            layout: {yaxis:{range: [0,t_array[t_array.length-1]]},}
        }, {
            transition: {duration: 1},
            frame: {duration: 1, redraw: false}
        });



// This graph is the same as above BUT shown in one of the hide/show button on the right hand side of the vis
        Plotly.animate(div="AVD_free",{data: [{y: r_array, x: t_array}, {y: v_array, x: t_array},{y:a_array, x:t_array}],

            traces: [0,1,2],
            layout: {xaxis:{range: [0,t_array[t_array.length-1]]},}
        }, {
            transition: {duration: 1},
            frame: {duration: 1, redraw: false}
        });

        Plotly.animate(div="Energy_free",{data: [{y: ks_array, x: t_array}, {y: ke_array, x: t_array},{y:d_array, x:t_array}],

            traces: [0,1,2],
            layout: {xaxis:{range: [0,t_array[t_array.length-1]]},}
        }, {
            transition: {duration: 1},
            frame: {duration: 1, redraw: false}
        });


        return r_ani;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current position of the box.
    function updatePosition() {
        state.position = newPosition();
        if (state.position > 1.5) { state.position = 1; } // make sure the mass stays inside the canvas
        if (state.position < -1.5) { state.position = -1; } // same but for the left hand side of the wall
    }


    return {
        resetStateToInitialConditions: resetStateToInitialConditions,
        updatePosition: updatePosition,
        initialConditions: initialConditions,
        state: state,
    };

})();



////////////////////////////////////
// FORCED VIBRATION CASE + GRAPHS ETC....
// initialize graph (graph need to be created first so it can be animated after)
Plotly.plot('graphmoving', [{x: document.getElementById("IniDispForced").value, y: t_init}], layout, {displayModeBar: false});

// initialize displacement/time arrays
let r_array_forced=[];
let v_array_forced=[];
let a_array_forced=[];
let t_array_forced=[];
// Calculate position and velocity of the box
let physics_forced = (function() {
    // Define initial condition for the system
    let initialConditions_forced = {
        position_forced:       1.0, // Box is shown on the right initially
        velocity_forced:       0.0, // Velocity is zero
        springConstant_forced: 100.0, // The higher the value the stiffer the spring
        mass_forced:           10.0 // The mass of the box
    };

    // Current state of the system
    let state_forced = {
        /*
        Position of the box:
          0 is when the box is at the center.
          1.0 is the maximum position to the right.
          -1.0 is the maximum position to the left.
        */
        position_forced: 0,
        velocity_forced: 0,
        springConstant_forced: 0, // The higher the value the stiffer the spring
        mass_forced: 0 // The mass of the box
    };

    function resetStateToInitialConditions_forced() {
        state_forced.position_forced = initialConditions_forced.position_forced;
        state_forced.velocity = initialConditions_forced.velocity_forced;
        state_forced.springConstant = initialConditions_forced.springConstant_forced;
        state_forced.mass = initialConditions_forced.mass_forced;
    }

    // Variable initialization
    let k_ani_forced =0;
    let c_ani_forced =0 ;
    let m_ani_forced =0;
    // let t_end_ani =100 ;
    let t_init_ani_forced =0 ;
    let t_end_ani_forced= 100;
    let v_0_ani_forced =0;
    let r_0_ani_forced =0;
    const n_ani_forced = 1000 ; // number of points

    let interval_ani_forced= ( t_end_ani_forced-t_init_ani_forced) /(n_ani_forced-1) ;  // creates time intervals for the for loop

    let r_ani_forced= 0; // displacement array
    let t_ani_forced=0;
    let g_s=0;
    function newPosition_forced() { // gets values from the sliders in the HTML (value is called by the ID of the slider in the HTML file)
        k_ani_forced = document.getElementById("SpringForced").value;
        R_forced = document.getElementById("Force").value;
        //c_ani_forced = document.getElementById("DampingForced").value;
        m_ani_forced = document.getElementById("MassForced").value;
        // Initial displacement and velocity
        v_0_ani_forced = document.getElementById("IniVeloForced").value;
        r_0_ani_forced = document.getElementById("IniDispForced").value;
        let omega_ani_forced= Math.sqrt(k_ani_forced/m_ani_forced);

        // g_s= R_forced/(k_ani_forced-Math.pow(omega_ani_forced,2));
        // r_ani_forced=g_s*Math.sin(omega_ani_forced*t_ani_forced);
        //if (t_ani_forced === 0 ) {
        // r_ani_forced = (v_0_ani_forced / omega_ani_forced) * Math.sin(omega_ani_forced * t_ani_forced) + r_0_ani_forced * Math.cos(omega_ani_forced * t_ani_forced);
        //v_ani_forced = (v_0_ani_forced / omega_ani_forced) * omega_ani_forced * Math.cos(omega_ani_forced * t_ani_forced) - r_0_forced * omega_ani_forced * Math.sin(omega_ani_forced * t_ani_forced);
        //}
        //else
        r_ani_forced = (v_0_ani_forced / omega_ani_forced) * Math.sin(omega_ani_forced * t_ani_forced) + r_0_forced * Math.cos(omega_ani_forced * t_ani_forced);
        let  v_ani_forced = (v_0_ani_forced / omega_ani_forced) * omega_ani_forced * Math.cos(omega_ani_forced * t_ani_forced) - r_0_forced * omega_ani_forced * Math.sin(omega_ani_forced * t_ani_forced);

        console.log(r_ani_forced);
        t_ani_forced += interval_ani_forced; //time counter, incremented at each iteration
        r_array_forced.push(r_ani_forced); // .push will add a value to an array. It adds the value of the new displacement to an array
        t_array_forced.push(t_ani_forced); // same as above but for time
        v_array_forced.push(v_ani_forced);
        //animate the graphs using the arrays above
        Plotly.animate(div="graphmoving", {
            data: [{x: r_array_forced, y: t_array_forced}],
            traces: [0],
            layout: {}
        }, {
            transition: {duration: 1},
            frame: {duration: 1, redraw: false}
        });
        Plotly.relayout( 'graphmoving', {
            // 'xaxis.autorange': true,
            'xaxis.range': [-1.15, 1.15],
            'yaxis.autorange': true });





        return r_ani_forced;
    }

    // The main function that is called on every animation frame.
    // It calculates and updates the current position of the box.
    function updatePosition_forced() {
        state_forced.position_forced = newPosition_forced();
        if (state_forced.position_forced > 1.5) { state_forced.position_forced = 1; } // make sure the mass stays inside the canvas
        if (state_forced.position_forced < -1.5) { state_forced.position_forced = -1; } // same but for the left hand side of the wall
    }


    return {
        resetStateToInitialConditions_forced: resetStateToInitialConditions_forced,
        updatePosition_forced: updatePosition_forced,
        initialConditions_forced: initialConditions_forced,
        state_forced: state_forced,
    };

})();

////////////////////////////////////////////////////////
// FREE VIBRATIONS ANIMATION
let ani; // this needs to exist in order for the simulation to be controlled (pause button etc..)
// Start the simulation

// The method is called 60 times per second
function animat() {

    physics.updatePosition();
    graphics.drawScene(physics.state.position);

}

function start() {
    graphics.init(function() {
        // Use the initial conditions for the simulation
        physics.resetStateToInitialConditions();

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
            graphics.fitToContainer();
            graphics.drawScene(physics.state.position);
        });

        // Start the animation sequence
        ani = setInterval(animat,interval*500);
    });
}
function pause(){ //pause function (linked to pause button in HTML)
    clearInterval(ani);
    clearInterval(ani_forced)
}

////////////////////////////////////////////
// FORCED VIBRATIONS ANIMATION

let ani_forced; // this needs to exist in order for the simulation to be controlled (pause button etc..)
// Start the simulation

// The method is called 60 times per second
function animat_forced() {

    physics_forced.updatePosition_forced();
    graphics.drawScene(physics_forced.state_forced.position_forced);

}

function start_forced() {
    graphics.init(function() {
        // Use the initial conditions for the simulation
        physics_forced.resetStateToInitialConditions_forced();

        // Redraw the scene if page is resized
        window.addEventListener('resize', function(event){
            graphics.fitToContainer();
            graphics.drawScene(physics_forced.state_forced.position_forced);
        });

        // Start the animation sequence
        ani_forced = setInterval(animat_forced,interval*500);
    });
}
/*
function pause_forced(){ //pause function (linked to pause button in HTML)
    clearInterval(ani_forced)
}
*/
