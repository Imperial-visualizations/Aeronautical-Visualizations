"use strict"; //Use strict javascript
/******************************************************************************
----          Slideshow Section        ----
add the ability to change the plot via a slide show
*******************************************************************************/

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  if (slideIndex === 2)
  {
      slides[slideIndex-1].style.display = "grid"
  }
  else {
      slides[slideIndex-1].style.display = "block";
  }
}

/******************************************************************************
-------                        Slider Section                            -------
adjust maximum range of modal shapes based on number of elements.
*******************************************************************************/

//Get html element Ids
let elemInput = document.getElementById('nElem'),
    elemOutput = document.getElementById('elementDisplay'),
    modeInput = document.getElementById('nMode'),
    modeOutput = document.getElementById('modeDisplay');


let numElems = 0;

//Void function to adjust slider to display adjusted output
const sliderVals = [4, 8, 16, 32, 64, 128, 256, 512]; //Slider values for elemnts
elemInput.oninput = function(){
    elemOutput.innerHTML = sliderVals[this.value]; //Output the adjusted value
    numElems = sliderVals[this.value]; //Set number of elements equalt to this
    $('input#nMode').attr('max',numElems+1); //Change the maximum value of the mode slider
    $('#modeSliderMax').html(numElems+1); //Change the display at the end of the slider
};

elemInput.oninput(); //Default value as specified in html

let nMode = 0; //Users desired modal shape

//Void function for outputing the mode shape
modeInput.oninput = function(){
    modeOutput.innerHTML = this.value;
    nMode = this.value;
};

modeInput.oninput(); //Default value as specified in html
nMode =7  ;
/******************************************************************************
-------                        Populate x & y                            -------
Based on the number of elements update the plot x and y
*******************************************************************************/

numElems = 8;
function popCoords(n){
  let fuselageX = new Array(n/2 + 1); //Preallocate memory
  let fuselageY = new Array(n/2 + 1);
  let fuselageZ = new Array(n/2 + 1);
  let wingX = new Array(n/2 + 1);
  let wingY = new Array(n/2 + 1);
  let wingZ = new Array(n/2 + 1);

  const beamLength = 2.032; //Length of the fuselage and the beam
  const elemLength = beamLength/(0.5*numElems); //Length of an element
  for (let i = 0; i <= n/2; i++) //Populate fuselage and wing
  {
    fuselageY[i] = -(i*elemLength);
  };

  for (let i = 0; i <=n/2; i++)
  {
    wingY[i] = -(beamLength/2 + Math.abs((n/4 - i)) * elemLength * Math.cos(Math.PI/3)); //X coordinate of wing
    wingX[i] = (n/4 - i) * elemLength * Math.sin(Math.PI/3); //Y coordinate of wing
  }

  fuselageX.fill(0);
  fuselageZ.fill(0);
  wingZ.fill(0);

  return [fuselageX, fuselageY, fuselageZ, wingX, wingY, wingZ]
}
let Coords = popCoords(8);
let fuselageX = Coords[0];
let fuselageY = Coords[1];
let fuselageZ = Coords[2];
let wingX = Coords[3]
let wingY = Coords[4]
let wingZ = Coords[5]


/******************************************************************************
-------                     Create initial 3D plot                       -------
Based on the number of elements update the plot x and y
*******************************************************************************/
// define the layout of the 3d plot and the default viewing angle
const layout3d={
            autosize: false,
            width: 1100,
            height: 500,
            margin: {
                l: 0, r: 0, b: 0, t: 0, pad: 0
            },
            scene: {
                aspectratio:{x:2,y:2.75,z:1},
                aspectmode: "manual",
                camera:{eye:{x:1.75, y:0.75},
                        up:{x:0, y:0, z:1}},
                xaxis: {
                    range: [-1., 1], autorange: false, title:'x', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                yaxis: {
                    range: [-2.1, 0], autorange: false, title:'y', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                zaxis: {
                    range: [-1, 1], autorange: false, title:'z', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 1,
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
            x: fuselageX,
            y: fuselageY,
            z: fuselageZ,
            showscale: false,
            name: 'Fuselage',
            line: {shape: 'spline'},
            marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }};

let trace3Daircraft2 ={
            type: 'scatter3d',
            x: wingX,
            y: wingY,
            z: wingZ,
            showscale: false,
            name: 'Wings',
            line: {shape: 'spline'},
            marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }};

Plotly.plot('fullAircraft', [trace3Daircraft1, trace3Daircraft2], layout3d);

/******************************************************************************
-------                     Create initial 2D plotS                      -------
Plot the 2d projecttion of the wing and fuselage.
*******************************************************************************/
var traceAircraftV = {
              x: fuselageY,
              y: fuselageZ,
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }

            };
var traceAircraftH = {
              x: wingX,
              y: wingZ,
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }

            };
var layoutF = {
    autosize: false,
    width: 550,
    height: 500,
    margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0
    },
    xaxis: {range: [-2.1, 0.1], autorange: false},
    yaxis: {range: [-1, 1], autorange: false},
    showlegend:false
}

var layoutW = {
    autosize: false,
    width: 550,
    height: 500,
    margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0
    },
    xaxis: {range: [-1, 1], autorange: false},
    yaxis: {range: [-1, 1], autorange: false},
    showlegend:false
}

Plotly.newPlot('wing', [traceAircraftV], layoutF);
Plotly.newPlot('fuselage', [traceAircraftH], layoutW);

/******************************************************************************
-------                find the eigenvector and freq.                    -------
Based on nMode and nElem, find the eigenvector
*******************************************************************************/
let eightElems = [[1,0.616945,0.233891,-0.149164,-0.532218,-0.130692,0.0515996,0.0331275,-0.167636],[-0.0219658,0.0282656,0.0784971,0.128729,0.17896,1,0.539249,-0.332023,-0.742543],[0.0414734,0.244014,0.446555,0.649096,0.851637,0.298192,0.372374,0.723278,1],[-0.00176443,-0.00158187,-0.00139931,-0.00121675,-0.00103419,-0.00543648,-0.0034179,0.000801841,0.00300299],[-0.000137256,-8.34325E-5,-2.96094E-5,2.42137E-5,7.80368E-5,-6.96535E-5,-4.96314E-5,4.42357E-5,0.000118081],[-3.74798E-5,-3.33807E-5,-2.92816E-5,-2.51826E-5,-2.10835E-5,-8.01106E-5,-5.46961E-5,2.31915E-7,2.97455E-5],[-0.0542888,-0.0922562,-0.139107,-0.385605,-0.80398,1,0.125094,0.125094,1],[-2.44258E-15,-5.05349E-16,8.49309E-16,4.27225E-16,-6.37012E-16,1.01122E-15,-1.93153E-15,3.89289E-15,-6.07111E-15],[1,0.204783,-0.228178,0.0208954,0.644559,0.268764,-0.204932,-0.204932,0.268764],[2.46708E-14,3.36438E-15,-7.11939E-15,2.89467E-15,2.07834E-14,1.60278E-14,-2.46062E-14,2.92503E-15,-4.60566E-16],[3.23411E-14,1.32187E-14,2.1626E-14,1.37618E-14,-2.68236E-14,1,-0.955453,0.955453,-1],[2.49105E-13,-2.09949E-13,-2.72626E-13,-1.16132E-13,5.19945E-14,-3.65044E-13,3.15752E-13,4.41147E-13,-1.17287E-13],[0.915462,-0.360064,-0.51657,-0.224828,0.0525547,-0.529661,1,1,-0.529661],[0.69143,-0.546123,-0.10523,1,-0.835497,0.0172642,-0.0977217,-0.0977217,0.0172642],[-1.71359E-13,5.4404E-15,-8.98556E-15,-2.01696E-13,1.49849E-13,-9.02363E-14,-2.02512E-14,3.08807E-14,7.71884E-14],[-1.72973E-12,2.40995E-12,-6.76187E-13,8.26486E-13,-4.40978E-13,-9.67219E-14,8.69135E-14,1.28687E-13,-1.73759E-14],[-0.69525,1,-0.26892,0.329966,-0.183586,-0.016418,0.0521315,0.0521315,-0.016418],[-1.68216E-12,2.1224E-12,-6.30813E-13,6.63617E-13,-3.42488E-13,-1.98978E-13,-2.52906E-14,1.38046E-13,7.0505E-14],[-1.5151E-13,7.66821E-13,-2.63318E-14,1.67143E-13,-1.17034E-13,3.20217E-13,2.31263E-13,-2.68516E-15,-2.4246E-13],[-4.12447E-14,1.25922E-13,1.0738E-14,-7.38944E-14,2.44259E-14,-9.11765E-5,0.000785524,-0.000785524,9.11765E-5],[-0.000406092,0.00138021,0.000121447,-0.000802772,0.000228234,2.06832E-5,-0.000175741,-0.000175741,2.06832E-5],[1.22174E-13,9.61834E-14,4.24E-14,-7.83205E-14,-2.49739E-13,-2.26673E-13,3.80405E-14,-3.35866E-13,1.51886E-13],[5.91229E-14,1.47937E-15,-2.42521E-14,-5.53063E-14,-9.93571E-14,-6.39729E-5,0.000558401,-0.000558401,6.39729E-5],[-3.53006E-14,2.80929E-14,1.24564E-13,2.31573E-13,4.0663E-13,4.59868E-13,2.42878E-13,-2.46485E-13,-2.4914E-13],[-4.68236E-15,1.4663E-14,1.85182E-15,-1.12126E-14,3.52744E-15,-1.39984E-13,1.19441E-12,-1.19975E-12,1.40309E-13],[0.000129668,-0.000464916,-4.36902E-5,0.000275149,-7.59193E-5,-7.09938E-6,6.13858E-5,6.13858E-5,-7.09938E-6],[3.25994E-15,-1.35095E-14,-2.13698E-15,8.11971E-15,-2.89721E-15,3.54964E-6,-3.08407E-5,3.08407E-5,-3.54964E-6],[5.9585E-13,-4.82381E-13,-4.31199E-13,-5.86804E-13,-1.19173E-12,-2.92686E-12,-1.5333E-12,3.79964E-13,1.23201E-12],[-2.72731E-13,-6.51623E-13,-2.60526E-13,1.01152E-13,2.47384E-13,-8.28724E-13,-4.28622E-13,1.14589E-13,7.34534E-13],[-3.09067E-12,6.98054E-13,-1.01218E-12,-2.061E-12,-1.61378E-12,-7.5701E-12,-4.19494E-12,9.96743E-13,4.57344E-12],[-1.18291E-12,-1.2906E-12,-6.78847E-13,7.23453E-15,-2.78707E-13,-4.69812E-12,-2.46364E-12,2.01287E-12,3.8252E-12],[-1.07131E-12,1.91902E-13,-6.61864E-13,-1.19124E-12,-6.00696E-13,-3.56808E-12,-2.05283E-12,2.40811E-13,2.09728E-12],[-1.21646E-14,6.74276E-14,6.54683E-15,-3.59366E-14,1.24651E-14,3.12617E-5,-0.000245653,0.000245653,-3.12617E-5],[-0.000287556,0.000952369,8.92204E-5,-0.000567272,0.000171168,1.65777E-5,-0.000125202,-0.000125202,1.65777E-5],[5.74622E-14,6.91494E-14,-1.08168E-13,-3.89539E-13,-4.87815E-13,7.33495E-13,3.30626E-13,-5.58406E-13,-1.30057E-12],[3.3932E-14,-1.75207E-13,-5.63127E-15,1.00351E-13,-3.1975E-14,-8.79223E-13,6.56123E-12,-6.54051E-12,8.95504E-13],[-4.62345E-14,1.22936E-13,1.89225E-14,-7.05408E-14,2.09955E-14,-1.59668E-5,0.000113979,-0.000113979,1.59668E-5],[-6.56069E-13,3.30131E-13,-1.89587E-13,-1.32672E-13,2.01053E-14,-2.54047E-13,5.0948E-13,2.47259E-13,-9.25837E-14],[-8.27841E-14,1.39156E-13,2.67042E-14,-2.20364E-14,1.47158E-14,6.83546E-14,-1.53734E-13,-1.36327E-14,1.59284E-14],[-8.8237E-13,1.84759E-12,-8.26778E-13,-5.86255E-13,3.67365E-13,-8.31358E-13,1.75584E-12,5.55308E-13,-3.30022E-13],[-0.0001398,0.000239436,-7.65321E-5,0.000146377,-8.56088E-5,1.28025E-7,-3.27512E-7,-3.27512E-7,1.28026E-7],[7.11497E-10,-1.21833E-9,3.8945E-10,-7.44912E-10,4.35533E-10,-6.73343E-13,1.70587E-12,1.54942E-12,-7.0798E-13],[0.000151779,-0.000256905,8.33432E-6,0.000149685,-8.85793E-5,5.44092E-6,-1.22694E-5,-1.22694E-5,5.44092E-6],[1.1246E-5,-1.84313E-5,-3.07128E-5,1.12785E-5,-6.91291E-6,-2.52101E-5,5.22558E-5,5.22558E-5,-2.52101E-5],[1.10813E-13,-3.29337E-13,1.46396E-12,2.3056E-13,-1.32164E-13,2.56437E-5,-5.25242E-5,5.25242E-5,-2.56437E-5],[2.0839E-13,-5.80883E-13,-1.27793E-13,4.67312E-13,-2.88216E-13,-2.23052E-13,4.65333E-13,-1.3833E-13,1.53039E-13],[-1.87017E-13,4.10171E-15,-1.22683E-13,-1.38014E-14,-1.36182E-14,-3.4352E-13,4.94958E-13,7.51854E-14,-1.75096E-14],[-6.76295E-14,1.03356E-13,-2.48961E-13,-1.41413E-13,1.22955E-13,-2.72331E-13,5.82072E-13,2.90825E-13,-1.01328E-13]];

//let sixteenElems =



let eigVector = eightElems[nMode-1];
let eigVectorF = eigVector.slice(0,5);
let eigVectorW = eigVector.slice(5,7);
eigVectorW.push(eigVector[2])
eigVectorW = eigVectorW.concat(eigVector.slice(7,9));
let w=Array.apply(null, Array(48)).map(Number.prototype.valueOf,30);
w.map(function(x){return x*2*Math.PI});

/******************************************************************************
-------                   Function to animate the 3D plot                -------
Animate the 3d plot
*******************************************************************************/
let anim3d;
let t3=0;
let dt=0.00009;
function animate3D (){
        function compute3D () {
          // change the z coordinate by multiplying the eigenvector with a sine function
          for (var i = 0; i <= numElems/2; i++) {
            fuselageZ[i]=eigVectorF[i]*Math.sin(w[nMode-1]*t3)
            wingZ[i]=eigVectorW[i]*Math.sin(w[nMode-1]*t3)
            t3=t3+dt;
          }

        }

          compute3D();
          // plot the 3d aircraft with the required changes
           Plotly.animate('fullAircraft', {
            data: [{
            z: fuselageZ,}, {
            z: wingZ,}]
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

/******************************************************************************
-------                   Function to animate the 2D plots                -------
Animate the 2d plots
*******************************************************************************/
let anim;
function animate2D (){

          Plotly.animate('wing', {
            data: [{y:fuselageZ}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
         Plotly.animate('fuselage', {
            data: [{y:wingZ}]
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
/******************************************************************************
-------                   Plot the fequency diagram                     -------
Plot the modal frequency versus number of elements
*******************************************************************************/
const numElemArray = [4,8, 16, 32, 64, 128, 256, 512]
let modalFrequencies = [16.5, 17, 18.5, 19, 19.1, 19.1, 19.3, 19.2]

let layoutFreq =  {
    autosize: false,
    width: 1100,
    height: 500,
    margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0
    },
    xaxis: {autorange: true, type:'log'},
    yaxis: {autorange: true},
    showlegend:false
}

var frequencyTrace = {
              x: numElemArray,
              y: modalFrequencies,
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 3,
                      }
                  }

Plotly.newPlot('freqPlot', [frequencyTrace], layoutFreq);

/******************************************************************************
-------                   Start/Pause Animation                          -------
Plot the modal frequency versus number of elements
*******************************************************************************/


$('input#start').on('click',begin_animation)

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
