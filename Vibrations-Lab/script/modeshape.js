//The -1/1 factors accountig for the back/front position of the sensor
const accfact=[1, -1, -1, -1, 1, -1, 1, 1, -1];

//position vectors containing the xyz coordinates of each point mass
y=[0,-0.508, -1.016, -1.524, -2.032, -1.016*(Math.sin(Math.PI/6)+1), -1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)+1)];
x=[0,0,0,0,0, -1.016*Math.cos(Math.PI/6), -1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)]
// incremented in the for loop with the eigenvector and a sine function
z=[0, 0, 0, 0, 0, 0, 0, 0, 0]
// the eigenvectors for the mode shapes
xi=[[0.051, -0.054, -0.15, -0.353, -0.639, 1, 0.118, 0.118, 1],[1,  0.198, -0.228,  0.03,  0.708, 0.214, -0.231, -0.231, 0.214],[-0.823, 0.29,  0.494, 0.208, 0.131, 0.545, -1, -1, 0.545],[0.78, -0.62, -0.107,  1, -0.82, 0.025, -0.089, -0.089, 0.025],[-0.87573374885010935,1,-0.2699170241978317,0.3544158096378055,-0.24153902434171154,-0.035645767866736663,0.061189182073798108,0.061189182073798108,-0.035645767866736663],[-1,0.96073121957399066,-0.3675846499086089,-0.47795867491901484,0.452883797527915,0.8124909513726768,0.28100285936623415,0.28100285936623415,0.8124909513726768],[-0.0084215161285740685,-0.0017116884223683652,-0.32231936139084988,0.027405366248597365,-0.038769370623410938,1,0.60373918725054343,0.60373918725054343,1],[-1,0.060948407855320089,-0.08043048929324309,0.0068627094197270611,0.5848929324309331,-0.17865660712304449,-0.21376278708532123,-0.21376278708532123,-0.17865660712304449],[-1,-0.38871691527818175,0.14259497790889325,-0.312437847121231,-0.62839157352391239,-0.033421697760418832,-0.040239401116328025,-0.040239401116328025,-0.033421697760418832],[1,0.60741714075246489,-0.14591937803925081,-0.26409241811132178,-0.36373056994818648,-0.15074285884935271,-0.17298830837228052,-0.17298830837228052,-0.15074285884935271],[1,0.76075715807969524,-0.62295908156968016,-0.30894027834968374,-0.34817599545688382,-0.81115368536196664,-0.84777103365321649,-0.84777103365321649,-0.81115368536196664],[0.976232222871615,1,0.025919694033447148,-0.58825248392752771,-0.528740758969311,0.2033995714007403,0.11399561147169501,0.11399561147169501,0.2033995714007403],[1,0.68762200642947924,0.18457381856242161,0.37183863170048925,0.52468371780068612,0.0080583221883488536,-0.0005552777385511243,-0.0005552777385511243,0.0080583221883488536]];
// the resonance frequencies
w=[15.65, 34.45, 65.2, 106.84, 161.91, 462.13, 510.41, 742.93, 923.12, 1039.6, 1149.2, 1604.9, 2550.6].map(function(x){return x*2*Math.PI})
y3=y;
x3=x;
z3=z;

let mode3;
//show and hide the modal bar
$("#modal").mouseenter(navShow);
$("#modal").mouseleave(navHide);

// function that opens the theory page in a new tab
$('#theory').click(function() {
  window.open('modeshapetheory1.html', '_blank');
});

// function that takes the mode that the student desires to animate
$('select#mode').on('change', getMode)
function getMode(){
 mode3=$("#mode").val();
 $('#omegau').html(w[mode3-1].toFixed(2));
};

//set the time and time incremets for the 2d and 3d simulations
dt=0.00002;
t=0;
t3=0;
n=9;


// define the layout of the 3d plot and the default viewing angle
let layout3d={
            autosize: true,
            margin: {
                l: 0, r: 0, b: 0, t: 1, pad: 5
            },
            scene: {
                aspectmode: "cube",
                camera:{eye:{x:1.25,},},
                xaxis: {
                    range: [-1, 1], autorange: false, title:'x', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                yaxis: {
                    range: [-2.4, 0], autorange: false, title:'y', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                zaxis: {
                    range: [-1, 1], autorange: false, title:'z', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      }
                },
            marker: {
                color: 'rgb(139, 0, 0)',
                size: 10,
                    },
            mode: 'markers',
            hovermode: false,
            font: {
                family: "Fira Sans",
                size: 14
                  },
            legend: {"orientation": "h"}
            };
// set the two traces that need to be plotted, for the fuselage and wings
let trace3Daircraft1 ={
            type: 'scatter3d',
            x: [x3[0],x3[1],x3[2],x3[3],x3[4]],
            y: [y3[0],y3[1],y3[2],y3[3],y3[4]],
            z: [z3[0],z3[1],z3[2],z3[3],z3[4]],
            showscale: false,
            name: 'Fuselage',
            line: {shape: 'spline'},
            marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }};
let trace3Daircraft2 ={
            type: 'scatter3d',
            x: [x3[5],x3[6],x3[2],x3[7],x3[8]],
            y: [y3[5],y3[6],y3[2],y3[7],y3[8]],
            z: [z3[5],z3[6],z3[2],z3[7],z3[8]],
            showscale: false,
            name: 'Wings',
            line: {shape: 'spline'},
            marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }};                      
Plotly.plot('aircraft3D', [trace3Daircraft1, trace3Daircraft2], layout3d);

// button that starts the animation by calling the begin_animation function
$('input#start').on('click',begin_animation)

let anim3d;
function animate3D (){
        function compute3D () {
          // change the z coordinate by multiplying the eigenvector with a sine function
          for (var i = 0; i < n; i++) {
            z3[i]=xi[mode3-1][i]*Math.sin(w[mode3-1]*t3)
            t3=t3+dt;
          }
        }

          compute3D();
          // plot the 3d aircraft with the required changes
           Plotly.animate('aircraft3D', {
            data: [{x: [x3[0],x3[1],x3[2],x3[3],x3[4]],
            y: [y3[0],y3[1],y3[2],y3[3],y3[4]],
            z: [z3[0],z3[1],z3[2],z3[3],z3[4]],}, {x: [x3[5],x3[6],x3[2],x3[7],x3[8]],
            y: [y3[5],y3[6],y3[2],y3[7],y3[8]],
            z: [z3[5],z3[6],z3[2],z3[7],z3[8]],}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
          return;
        }


var traceAircraftV = {
              x: [y[0],y[1],y[2],y[3],y[4]],
              y: z, 
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }
                            
            };
var traceAircraftH = {
              x: [x[5],x[6],x[2],x[7],x[8]], 
              y: z, 
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }
                            
            };
var layout = {
    xaxis: { range:[-2,0], title: 'Fuselage coordinate (m)'},
    yaxis: {range:[-1,1], 
      title:'Eigenvector (normalised)',
      scaleanchor: "x",
    },
    showlegend:false
}

var layout2 = {
    xaxis: {range:[-1,1], title: 'Wing coordinate (m)' },
    yaxis: {range:[-1,1], 
      title:'Eigenvector (normalised)',
      scaleanchor: "x",
    },
    showlegend:false
}
            Plotly.newPlot('graphAircraftV', [traceAircraftV], layout,{displayModeBar:false});
            Plotly.newPlot('graphAircraftH', [traceAircraftH], layout2, {displayModeBar:false});



let anim;
function animate2D (){
        function compute () {

          for (var i = 0; i < n; i++) {
            z[i]=xi[mode3-1][i]*Math.sin(w[mode3-1]*t)
            t=t+dt;
          }
        }

          compute();

          Plotly.animate('graphAircraftV', {
            data: [{x: [y[0],y[1],y[2],y[3],y[4]], y:[z[0],z[1],z[2],z[3],z[4]]}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
         Plotly.animate('graphAircraftH', {
            data: [{x: [x[5],x[6],x[2],x[7],x[8]], y:[z[5],z[6],z[2],z[7],z[8]]}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
          return;
        }

function begin_animation(){

      if ($(this).val().toString()=="Start"){
        anim= setInterval(animate2D,30);
        anim3d= setInterval(animate3D,30);
        $(this).val("Pause")
      }else {
            clearInterval(anim);
            clearInterval(anim3d);
            $(this).val("Start")
        };
  }
  
$(window).on('load',getMode)



function main() {
    $("input[type=range]").each(function () {
        $(this).on('input', function(){
            $("#"+$(this).attr("id") + "Display").text( $(this).val());
            dt=0.00002-$(this).val()*0.00002/100;

        });
    });
    $("select").click(function () {
       var idName = $(this).attr("id");
       if (idName === "mode") {
          var value = $(this).val();
          if( value === "1") {
          } else if ( value === "2") {
          } else if (value === "3") {
          }else if (value === "4") {
          }else if (value === "5") {
          }else if (value === "6") {
          }else if (value === "7") {
          }else if (value === "8") {
          }else {}

      }
   });
  }
$(document).ready = main();




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
let j;
//Function to open modal
$('#modal').click(function(){
  openModal()
  j=0})
$('.nextBtn').click(function(){
  nextModal(j);
  if (j===4)
    {
      currentSlide(2)
    }
  if (j===5)
    {
      currentSlide(1)
    }  
  j++

})
$('.closeBtn').click(closeModal)
$('.closeBtnH').click(closeModal)
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

//Function to close modal
function closeModal(){
    modal.style.display = "none";
}

//Function to close modal if outside click
function outsideClick(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
}

//Function to close current modal and open next modal
function nextModal(n){
    modalContent[n].style.display = "none";
    modalContent[n+1].style.display = "block";
}
/** --------------------------- Function for hiding after few seconds---------------------------- **/
/* Function to make fade out instruction tab after window load */
//Display nav bar
function navShow(){document.getElementById("modal").style.left = "30px";}
navShow();

//Hide nav bar
function navHide(){document.getElementById("modal").style.left = "5px";
    document.getElementById("modal").style.transitionDuration = "1s";}

/* Function to make fade out prev next tabs after window load */
function arrowShow1(){document.getElementById("prev1").style.color = "#006EAF";}
arrowShow1();

function arrowShow2(){document.getElementById("prev2").style.color = "#006EAF";}
arrowShow2();

//Hide nav bar
function arrowHide1(){document.getElementById("prev1").style.color = 'rgb(135,206,250)';}

function arrowHide2(){document.getElementById("prev2").style.color = 'rgb(135,206,250)';}

//Set timeout in milliseconds
setTimeout(function() {
    navHide();
    arrowHide1();
    arrowHide2();
}, 3000);