// initialize node coordinates
let x = [], origin = [];
y = new Array(25).fill(0);
yv = new Array(25).fill(-1)
for (let i = 0; i < 25; i++) {
  x[i] = 10*i/25;
  origin[i] = 10*i/25;
}
// input mode shapes for 24-element rod
let allShapes = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/d5af58de/jsonModeShape.json',function(allShape){
allShapes=allShape
});
// set color gradient
let colors= [];
for(i=0;i<25;i++){
  // colors.push('rgb('+(i*10).toString()+','+(266-(i*5)).toString()+',170)')
  colors.push(3*i)
}
// plot nodes with color gradient
var nodePlot = {
  x: x,
  y: yv,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: colors,
    size: 10
  },
  connectgaps: true
};
// graph layout
var layout = {
  xaxis: {
    range: [-1,11],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,1],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false
}

var data = [nodePlot];

// adding line plots for elements with color gradient
let xSegment = new Array(24), trace = new Array(24);
for (let i = 0; i < 24; i++) {
  xSegment[i] = new Array(2);
  xSegment[i][0] = x[i];
  xSegment[i][1] = x[i+1];
  trace[i] = {
    x: xSegment[i],
    y: [0,0],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: i*5,
      width: 4
    }
  };
  data.push(trace[i]);
}

Plotly.plot('graphRod', data, layout); // initial plot

dt = 0.00001; t = 0; n = 5;

$('.start.button').on('click',()=>{
  $('.start.button').addClass('active');}).on('click',() =>{
  $('.pause.button').removeClass('active');})

$('.pause.button').on('click',()=>{
  $('.pause.button').addClass('active');}).on('click',() =>{
  $('.start.button').removeClass('active');})

$('.start.button').on('click',begin_animation)

function handleElement(){
  let elementNumber = parseFloat($("#element").val());
  $("#element").on("input",reset(elementNumber));
  // .on('change',getShape(elementNumber));
  $("#elementDisplay").html(elementNumber);
  //CHANGE MODE MAX
  let new_max = parseFloat($('input#element').val())+1;
  $('input#modeIndex').attr('max',new_max)
  $('#sliderMax').html(new_max)

  updatePlot1(elementNumber);
}

let anim;

function reset(element){
  for (let i = 0; i < element+1; i++) {
  x[i] = 10*i/(element);
  }
}


function begin_animation(){

  function shakeAnime (){
    // FETCH INFORMATION
    let elementNumber = $("#element").val();
    $("#element").on("change",reset(elementNumber));
    $("#elementDisplay").html(elementNumber);

    let shape = allShapes['ModeShape_' + elementNumber]

    let mode = $("#modeIndex").val();
    $("#ModeDisplay").html(mode);
    $("#modeIndex").on("change",reset(elementNumber));

    let e = $('#EInput').val();
    // $("#dispMag").html(mag);

    let rho = $('#rhoInput').val();
    // $("#dispMag").html(mag);

    let a = $('#aInput').val();
    // $("#dispMag").html(mag);

    let col = $('#colInput').val();
    // $("#dispMag").html(mag);


    // for(i=0;i<col;i++){
    //   colors.push('rgb('+(i*10).toString()+','+(266-(i*5)).toString()+',170)')
    //   // colors.push(3*col)
    // }

    // console.log(colors)

    let new_max = parseFloat($('input#element').val())+1;
    $('input#modeIndex').attr('max',new_max)
    $('#sliderMax').html(new_max)

    function reset(element) {
      for (let i = 0; i < element+1; i++) {
      x[i] = 10*i/(element);
      yv[i] = -1;
      }
    };
    dt = 0.00001 * 24/elementNumber;
    function computeNode () {

      for (let i = 0; i < elementNumber + 1; i++) {
        // if ($('#start').html().toString()=='Pause'){
        //         t = t + dt;
        // }
        t = t+dt;
        x[i] = x[i]+ shape[mode-1][i] * Math.sin(108*t) * 3/(0.1*a)/e/rho;
        yv[i] = -1 + shape[mode-1][i] * Math.sin(108*t) * 3/rho/e/(0.1*a);
        y[i] = 1;
        // yShape[i] = shape[mode-1][i] * Math.sin(108*t);
      }
    };

    for (let i = 0; i < elementNumber+1; i++) {
      origin[i] = 10*i/(elementNumber);
    }

    var verPlot = {
      x: origin,
      y: yv,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: colors,
        size: 10
      },
      connectgaps: true
    };

    data = [verPlot];

    function computeSegment () {
      for (let i = 0; i < elementNumber; i++) {
        xSegment[i] = new Array(2);
        xSegment[i][0] = x[i];
        xSegment[i][1] = x[i+1];
        trace[i] = {
          x: xSegment[i],
          y: [0,0],
          type: 'scatter',
          mode: 'lines',
          opacity: 1,
          line: {
            color: col*5,
            width: 4
          }
        };
        data.push(trace[i]);
      }
    }

    computeNode();
    computeSegment();

    let len = data.length,traceindex=[];

    // HIDE UNUSED SEGMENT
    for (var i = 0; i <25-len; i++) {
      data.push({opacity: 0,})
    }
    for (var i = 0; i < data.length; i++) {
      traceindex.push(i)
    }

    Plotly.animate('graphRod',{data: data, trace: traceindex},
      { transition: {duration: 0},
        frame: {
          duration: 10,
          redraw: false
        }
      }
    );
    return;
  }

  // anim= setInterval(shakeAnime,70);

  // DISPLAY BETWEEN START/PAUSE
  if ($(this).html().toString()=="Start"){
    anim = setInterval(shakeAnime,10);
    $(this).text("Pause")
  }else{
    $(this).text("Start")
    clearInterval(anim)
  };

  // $('.reset.button').on('click',{
  //   $("#element").val() = '24'
  //   // $("#modeIndex").val() = toString(1)
  // }).on('click',(){
  //   clearInterval(anim)
  //   $(this).text("Start")
  // });
}

$(document).ready(function(){
  $("#dispMag").hide();
});

// $(document).ready(function(){
//   $(".show.button").click(function(){
//     $("#modePlot").toggle();
//   });
// });

// var loadSpinner = $("#loading-spinner");
//
// function endLoadingScreen() {
//   loadSpinner.fadeOut(0);
// }
