
// Store all the things we'll use from matter.js in some variables
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// Create an engine
let engine = Engine.create();
let world = engine.world; // Reference the world and store it in a variable

// Create a render
let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 650, // changes width of the animation
            height: 500, // changes height of the animation
            showAngleIndicator: true
        }
    });

// Create some bodies
//let circle = Bodies.circle(50, 160, 5); // Creates a circular body
//let polygon = Bodies.polygon(40, 60, 7, 5); // Creates a regular polygon with 7 sides
let rectangle = Bodies.rectangle(100, 95, 10, 10); // Creates a rectangular body
let ground = Bodies.line(101, 100, 1100, 2, { isStatic: true }); // creates the ground
let left_wall = Bodies.rectangle(0,0, 2, 100);

// Add the bodies to the world
World.add(world, [rectangle, ground, left_wall]);

// Run the engine
Engine.run(engine);

// Render everything
Render.run(render);