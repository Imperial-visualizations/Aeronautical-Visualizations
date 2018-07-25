/*
----          Slider Section        ----
adjust maximum range of modal shapes based on number of elements.

display natural frequency.


*/
const sliderVals = [4, 8, 16, 32, 64, 128, 256, 512]; //Slider values

let elemInput = document.getElementById('nElem'),
    elemOutput = document.getElementById('elementDisplay'),
    modeInput = document.getElementById('nMode'),
    modeOutput = document.getElementById('modeDisplay'),
    freqOutput = document.getElementById('natFreqDisp')
    ;


let numElems = 0;
let new_max = 0;
elemInput.oninput = function(){
    elemOutput.innerHTML = sliderVals[this.value];
    numElems = sliderVals[this.value];
    new_max = numElems+1;
    $('input#nMode').attr('max',new_max)
    $('#modeSliderMax').html(new_max)
};


const modalFrequencies = [21, 33, 1000, 124124, 64345, 1283241, 25324216, 512123412]; //Slider values
modeInput.oninput = function(){
    modeOutput.innerHTML = this.value;
    freqOutput.innerHTML = modalFrequencies[this.value];
};




/*
// define the layout of the 3d plot and the default viewing angle
let layoutFullAircraft={
            autosize: false,
            width: 980,
            height: 420,
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
*/

/*
var layoutF = {
    autosize: false,
    width: 500,
    height: 290,
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
    width: 500,
    height: 290,
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
*/
