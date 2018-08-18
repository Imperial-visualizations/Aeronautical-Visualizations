let shapes = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/d4cc8a00/trussDeformedShape.json',function(shape){
shapes=shape
});

// graph 2.1 initial plot

var ele_nod_x = [], ele_nod_y = [];
var nod_coor_x = [], nod_coor_y = [];
nod_coor_x = [0, 5, 5, 10, 10, 15];
nod_coor_y = [0, 7.5, 0, 7.5, 0, 0];
var x = [], y =[], xd = [], yd = [];
x = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];
var layout = {
  autosize: false,
  width: 800,
  height: 500,
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 4
  },
  xaxis: {
    range: [-2,18],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,9],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 4.5,
      y: 7.5,
      xref: 'x',
      yref: 'y',
      text: 'F',
      showarrow: false,
      arrowhead: 2,
      ax: -40,
      ay: 0
    }
  ]
}
let shape = {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

var data1 = [shape];

Plotly.newPlot('graph1', data1, layout)

function handleForce(){
    let forceMag = parseFloat($("#forceMag").val());
    $("#forceDisplay").html(forceMag);
    //CHANGE MODE MAX
    let new_max = parseFloat($('input#element').val())+1;
    $('input#modeIndex').attr('max',new_max)
    $('#sliderMax').html(new_max)
    // data1 = []; x1 = [];
    updatePlot1(forceMag);
}

let coord = new Array(2);

function updatePlot1(forceMag){
    let force = 1e6/20*forceMag;
    // console.log(forceMag)
    let coord = shapes['deformedCoord_' + forceMag];
    // console.log(coord)
    xd = [coord[0][0], coord[0][1], coord[0][3], coord[0][5], coord[0][4], coord[0][3], coord[0][2], coord[0][4], coord[0][1], coord[0][2], coord[0][0]];
    yd = [coord[1][0], coord[1][1], coord[1][3], coord[1][5], coord[1][4], coord[1][3], coord[1][2], coord[1][4], coord[1][1], coord[1][2], coord[1][0]];
    shape = {
      x: xd,
      y: yd,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: Math.random()*50,
        size: 10
      },
      line: {
          dash: 'dot'
      },
      connectgaps: false
    }; 
    data1 = [shape];
    layout = {
      autosize: false,
      width: 800,
      height: 500,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      xaxis: {
        range: [-2,18],
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: false,
        ticks: '',
        showticklabels: false
      },
      yaxis: {
        range: [-2,9],
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: false,
        ticks: '',
        showticklabels: false
      },
      showlegend:false,
      annotations: [
        {
          x: 4.5 + (forceMag/10),
          y: coord[1][1],
          xref: 'x',
          yref: 'y',
          text: 'F',
          showarrow: false,
          arrowhead: 2,
          ax: -40 - (forceMag*1.5),
          ay: 0
        }
      ]
    }
    Plotly.react('graph1',data1,layout)  
}

// plot for 2.2

let shapesBasic = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/f79cd992/deformedBasic.json',function(shape){
shapesBasic=shape
});

let x2a = [], x2b = [], y2a = [], y2b = [];
x2a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], nod_coor_x[2]];
y2a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], nod_coor_y[2]];

x2b = [nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y2b = [nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];


var layout2 = {
    autosize: false,
    width: 800,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,9],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 4.5,
      y: 7.5,
      xref: 'x',
      yref: 'y',
      text: 'F',
      showarrow: false,
      arrowhead: 2,
      ax: -40,
      ay: 0
    }
  ]
}
let trace2a = {
    x: x2a,
    y: y2a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

let trace2b = {
    x: x2b,
    y: y2b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

var data2 = [trace2a, trace2b];

Plotly.newPlot('graph2', data2, layout2)

let coordBasic = new Array(2);

function updatePlot2(forceMag){
    // let force = 1e6/20*forceMag;
    // console.log(forceMag)
    let coordBasic = shapesBasic['deformedBasicCoord_' + forceMag];
    // console.log(coordBasic)
    x2a = [coordBasic[0][0], coordBasic[0][1], coordBasic[0][3], coordBasic[0][5], coordBasic[0][4], coordBasic[0][3]];
    y2a = [coordBasic[1][0], coordBasic[1][1], coordBasic[1][3], coordBasic[1][5], coordBasic[1][4], coordBasic[1][3]];

    x2b = [coordBasic[0][2], coordBasic[0][4], coordBasic[0][1], coordBasic[0][2], coordBasic[0][0]];
    y2b = [coordBasic[1][2], coordBasic[1][4], coordBasic[1][1], coordBasic[1][2], coordBasic[1][0]];

    
    trace2a = {
      x: x2a,
      y: y2a,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: Math.random()*50,
        size: 10
      },
      line: {
        dash: 'dot'
        },
      connectgaps: false
    }; 

    trace2b = {
      x: x2b,
      y: y2b,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: Math.random()*50,
        size: 10
      },
      line: {
        dash: 'dot'
    },
      connectgaps: false
    }; 

    data2 = [trace2a, trace2b];

    layout2 = {
      autosize: false,
      width: 800,
      height: 500,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      xaxis: {
        range: [-2,18],
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: false,
        ticks: '',
        showticklabels: false
      },
      yaxis: {
        range: [-2,9],
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: false,
        ticks: '',
        showticklabels: false
      },
      showlegend:false,
      annotations: [
        {
          x: 4.5 + (forceMag/10),
          y: coordBasic[1][1],
          xref: 'x',
          yref: 'y',
          text: 'F',
          showarrow: false,
          arrowhead: 2,
          ax: -40 - (forceMag*1.5),
          ay: 0
        }
      ]
    }

    Plotly.react('graph2',data2,layout2)  
}

// plot for 2.3
let shapesVirtual = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/0ab56e2c/deformedRedund.json',function(shape){
  shapesVirtual=shape
});

let x3a = [], x3b = [], y3a = [], y3b = [];

// x3a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 5+(10/3)];
// y3a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], 5];
x3a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 5+(10/3)];
y3a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], 5];

// x3b = [5+(5/3), nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
// y3b = [2.5, nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];
x3b = [5+(5/3), nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y3b = [2.5, nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

var layout3 = {
    autosize: false,
    width: 800,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,9],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 7.9,
      y: 4.35,
      xref: 'x',
      yref: 'y',
      text: '',
      showarrow: false,
      arrowhead: 2,
      ax: 15,
      ay: -30
    },
    {
        x: 7.2,
        y: 3.3,
        xref: 'x',
        yref: 'y',
        text: '',
        showarrow: false,
        arrowhead: 2,
        ax: -15,
        ay: 30
      }
  ]
}
let trace3a = {
    x: x3a,
    y: y3a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

let trace3b = {
    x: x3b,
    y: y3b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

var data3 = [trace3a, trace3b];

Plotly.newPlot('graph3', data3, layout3)

function updatePlot3(x){
  let coordVirtual = shapesVirtual['deformedRedundCoord_' + x];
  // console.log(coordVirtual)
  x3a = [coordVirtual[0][0], coordVirtual[0][1], coordVirtual[0][3], coordVirtual[0][5], coordVirtual[0][4], coordVirtual[0][3]];
  y3a = [coordVirtual[1][0], coordVirtual[1][1], coordVirtual[1][3], coordVirtual[1][5], coordVirtual[1][4], coordVirtual[1][3]];

  x3b = [coordVirtual[0][2], coordVirtual[0][4], coordVirtual[0][1], coordVirtual[0][2], coordVirtual[0][0]];
  y3b = [coordVirtual[1][2], coordVirtual[1][4], coordVirtual[1][1], coordVirtual[1][2], coordVirtual[1][0]];

  trace3a = {
    x: x3a,
    y: y3a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    line: {
      dash: 'dot'
      },
    connectgaps: false
  }; 
  trace3b = {
    x: x3b,
    y: y3b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    line: {
      dash: 'dot'
  },
    connectgaps: false
  }; 
  data3 = [trace3a, trace3b];
  layout3 = {
    autosize: false,
    width: 800,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
    xaxis: {
      range: [-2,18],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-2,9],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend:false,
    annotations: [
      {
        x: coordVirtual[0][3],
        y: coordVirtual[1][3],
        xref: 'x',
        yref: 'y',
        text: '1',
        showarrow: false,
        arrowhead: 2,
        ax: 15,
        ay: -30
      },
      {
        x: coordVirtual[0][2],
        y: coordVirtual[1][2],
        xref: 'x',
        yref: 'y',
        text: '1',
        showarrow: false,
        arrowhead: 2,
        ax: -15,
        ay: 30
      }
    ]
  }

  Plotly.react('graph3',data3,layout3)  
}

function handleVirtual(){
  let x = parseFloat($("#x").val());
  let forceMag = parseFloat($("#forceMag").val());
  $("#xDisplay").html(x);
  updatePlot3(x);
  updatePlot4(x,forceMag);
}

function calY(x){
  return 1.5*x-7.5;
}

function gradient(x1,y1,x2,y2){
  return (x2-x1)/(y2-y1);
}

function handleForce(){
  let forceMag = parseFloat($("#forceMag").val());
  $("#forceDisplay").html(forceMag);
  let x = parseFloat($("#x").val());
  //reset x
  // let x = parseFloat($("#x").val());
  // $('input#x').attr('val',1)
  // $('#value').html(1)
  // data1 = []; x1 = [];
  updatePlot1(forceMag);
  updatePlot2(forceMag);
  updatePlot4(x,forceMag);
}



// plot for 3.4

let shapesCom = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/295cf428/deformedCom.json',function(shape){
  shapesCom=shape
});

let x4a = [], x4b = [], y4a = [], y4b = [];
x4a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 10-2.5*gradient(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2])];
y4a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], 7.5-3*gradient(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2])];

x4b = [5+2.5*gradient(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2]), nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y4b = [2.5*gradient(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2]), nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

var layout4 = {
    autosize: false,
    width: 800,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,9],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 7.9,
      y: 4.35,
      xref: 'x',
      yref: 'y',
      text: '',
      showarrow: false,
      arrowhead: 2,
      ax: 15,
      ay: -30
    },
    {
        x: 7.2,
        y: 3.3,
        xref: 'x',
        yref: 'y',
        text: '',
        showarrow: false,
        arrowhead: 2,
        ax: -15,
        ay: 30
      }
  ]
}
let trace4a = {
    x: x4a,
    y: y4a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

let trace4b = {
    x: x4b,
    y: y4b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: false
}; 

var data4 = [trace4a, trace4b];

Plotly.newPlot('graph4', data4, layout4)

function updatePlot4(x,forceMag){
  let coord = shapes['deformedCoord_' + forceMag];
  // let coordBasic = shapesBasic['deformedBasicCoord_' + forceMag];
  // let coordVirtual = shapesVirtual['deformedRedundCoord_' + x];
  let coordComForce = shapesCom['deformedRedundCoord_' + forceMag];
  // console.log(coordComForce)
  let coordComCom = coordComForce[x];

  if (x===10){
    x4a = [coordComCom[0], coordComCom[1], coordComCom[3], coordComCom[5], coordComCom[4], coordComCom[3], coordComCom[2]];
    y4a = [coordComCom[6+0], coordComCom[6+1], coordComCom[6+3], coordComCom[6+5], coordComCom[6+4], coordComCom[6+3],coordComCom[8]];

    x4b = [coordComCom[2], coordComCom[4], coordComCom[1], coordComCom[2], coordComCom[0]];
    y4b = [coordComCom[6+2], coordComCom[6+4], coordComCom[6+1], coordComCom[6+2], coordComCom[6+0]];

  }else{
    x4a = [coordComCom[0], coordComCom[1], coordComCom[3], coordComCom[5], coordComCom[4], coordComCom[3]];
    y4a = [coordComCom[6+0], coordComCom[6+1], coordComCom[6+3], coordComCom[6+5], coordComCom[6+4], coordComCom[6+3]];

    x4b = [coordComCom[2], coordComCom[4], coordComCom[1], coordComCom[2], coordComCom[0]];
    y4b = [coordComCom[6+2], coordComCom[6+4], coordComCom[6+1], coordComCom[6+2], coordComCom[6+0]];
  }

  trace4a = {
    x: x4a,
    y: y4a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    line: {
      dash: 'dot'
      },
    connectgaps: false
  }; 

  trace4b = {
    x: x4b,
    y: y4b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    line: {
      dash: 'dot'
  },
    connectgaps: false
  }; 

  data4 = [trace4a, trace4b];

  layout4 = {
    autosize: false,
    width: 800,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
    xaxis: {
      range: [-2,18],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-2,9],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend:false,
    // annotations: [
    //   {
    //     x: 4.5 + (forceMag/10),
    //     y: coordBasic[1][1],
    //     xref: 'x',
    //     yref: 'y',
    //     text: 'F',
    //     showarrow: false,
    //     arrowhead: 2,
    //     ax: -40 - (forceMag*1.5),
    //     ay: 0
    //   }
    // ]
  }

  Plotly.react('graph4',data4,layout4)  
}

/** --------------------------- Function for modal ---------------------------- **/

//Get modal element
let modal = document.getElementById("guideModal");
let modalContent = document.getElementsByClassName("modalContent");

//Listen for outside click
window.addEventListener("click", outsideClick);

//Function to open modal
function openModal(){
    modal.style.display = "block";
    modalContent[0].style.display = "block";
    modalContent[1].style.display = "none";
    modalContent[2].style.display = "none";
    modalContent[3].style.display = "none";
    modalContent[4].style.display = "none";
}

function scrollToTop(){
    //Scroll to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollToBottom(){
    //Scroll to top
    document.body.scrollTop = 1000; // For Safari
    document.documentElement.scrollTop = 1000; // For Chrome, Firefox, IE and Opera
}

//Function to close modal
function closeModal(){
    modal.style.display = "none";
}

//Function to close modal if outside click
function outsideClick(e){
    if(e.target === modal){
        modal.style.display = "none";
        currentSlide(1);
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
function navShow(){document.getElementById("instructions").style.left = "30px";}
navShow();

//Hide nav bar
function navHide(){document.getElementById("instructions").style.left = "5px";
    document.getElementById("instructions").style.transitionDuration = "1s";}

//Set timeout in milliseconds
setTimeout(function() {
    navHide();
}, 3000);

// function handleX(){
//     let x = parseFloat($("#x").val());
//     $("#xDisplay").html(x);
//     updatePlot2(x)
// }

// function calY(x){
//     return 1.5*x-7.5;
// }

// function updatePlot2(x){
//     x4a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 15-x];
//     y4a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], calY(15-x)];
    
//     x4b = [x, nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
//     y4b = [calY(x), nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

//     trace4a = {
//         x: x4a,
//         y: y4a,
//     }; 
    
//     trace4b = {
//         x: x4b,
//         y: y4b,
//     };

//     data4 = [trace4a, trace4b];
    
//     Plotly.react('graph4', data4, layout4)
// }

// function handleForce(){
//     let forceMag = parseFloat($("#forceMag").val());
//     $("#forceDisplay").html(forceMag);
//     //CHANGE MODE MAX
//     let new_max = parseFloat($('input#element').val())+1;
//     $('input#modeIndex').attr('max',new_max)
//     $('#sliderMax').html(new_max)
//     data1 = []; x1 = [];
//     updatePlot1(forceMag);
// }

/****************************
 * Custom range slider with labels
 */

var sheet = document.createElement('style'),  
$rangeInput = $('.range input'),
prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {  
var curVal = el.value,
    val = (curVal - 1) * 16.666666667,
    style = '';

// Set active label
$('.range-labels li').removeClass('active selected');

var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

curLabel.addClass('active selected');
curLabel.prevAll().addClass('selected');

// Change background gradient
for (var i = 0; i < prefs.length; i++) {
  style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
  style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
}

return style;
}

$rangeInput.on('input', function () {
sheet.textContent = getTrackStyle(this);
});

// Change input value on label click
$('.range-labels li').on('click', function () {
var index = $(this).index();

$rangeInput.val(index + 1).trigger('input');

});