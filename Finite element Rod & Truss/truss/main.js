let shapes = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/d4cc8a00/trussDeformedShape.json',function(shape){
shapes=shape
});

// function that opens the theory page in a new tab
$('#theory').click(function() {
    window.open('1-theory.html', '_blank');
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
  width: 400,
  height: 300,
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
      showarrow: true,
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
      color: 'blue',
      size: 10
    },
    line: {
      color: 'black'
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
    console.log(forceMag);
}

let coord = new Array(2);

function updatePlot1(forceMag){
    let force = 1e6/20*forceMag;
    // console.log(forceMag)
    let coord = shapes['deformedCoord_' + forceMag];
    // console.log(coord)
    if (forceMag===1) {
        xd = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
        yd = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];
    }else{
        xd = [coord[0][0], coord[0][1], coord[0][3], coord[0][5], coord[0][4], coord[0][3], coord[0][2], coord[0][4], coord[0][1], coord[0][2], coord[0][0]];
        yd = [coord[1][0], coord[1][1], coord[1][3], coord[1][5], coord[1][4], coord[1][3], coord[1][2], coord[1][4], coord[1][1], coord[1][2], coord[1][0]];
    }
    shape = {
      x: xd,
      y: yd,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: 'blue',
        size: 10
      },
      line: {
          color: 'black'
      },
      connectgaps: false
    }; 
    data1 = [shape];
    layout = {
      autosize: false,
      width: 400,
      height: 300,
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
          showarrow: true,
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

function findY(x1,y1,x2,y2,x){
  let grad=(y2-y1)/(x2-x1);
  return grad*x+y1-grad*x1;
}

let x2a = [], x2b = [], y2a = [], y2b = [], x2c=[],x2d=[],y2c=[],y2d=[];
x2a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3]];
y2a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3]];

x2b = [nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y2b = [nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

x2c = [nod_coor_x[3], nod_coor_x[3]-1];
y2c = [nod_coor_y[3], findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1)];

x2d = [nod_coor_x[2], nod_coor_x[2]+4];
y2d = [nod_coor_y[2], findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4)];

let trace2c = {
  x: x2c,
  y: y2c,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: ['blue','green'],
    size: 10
  },
  line: {
    color: 'green'
},
  connectgaps: false
}; 

let trace2d = {
  x: x2d,
  y: y2d,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: ['blue','red'],
    size: [10,15],
    symbol:['circle','circle-open']
  },
  line: {
    color: 'red'
},
  connectgaps: false
}; 

var layout2 = {
    title: 'd<sub>0</sub> = u<sub>R</sub> - u<sub>L</sub>',
    autosize: false,
    width: 400,
    height: 300,
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
      showarrow: true,
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
      color: 'blue',
      size: 10,
      
    },
    line: {
      color: 'black'
  },
    connectgaps: false
}; 

let trace2b = {
    x: x2b,
    y: y2b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    line: {
      color: 'black'
  },
    connectgaps: false
}; 

var data2 = [trace2a, trace2b, trace2c, trace2d];

Plotly.newPlot('graph2', data2, layout2)

let coordBasic = new Array(2);

function updatePlot2(forceMag){
    // let force = 1e6/20*forceMag;
    // console.log(forceMag)
    let coordBasic = shapesBasic['deformedBasicCoord_' + forceMag];
    // console.log(coordBasic)
    if(forceMag===1){
        x2a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3]];
        y2a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3]];

        x2b = [nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
        y2b = [nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

        x2c = [nod_coor_x[3], nod_coor_x[3]-1];
        y2c = [nod_coor_y[3], findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1)];

        x2d = [nod_coor_x[2], nod_coor_x[2]+4];
        y2d = [nod_coor_y[2], findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4)];

    }else{
        x2a = [coordBasic[0][0], coordBasic[0][1], coordBasic[0][3], coordBasic[0][5], coordBasic[0][4], coordBasic[0][3]];
        y2a = [coordBasic[1][0], coordBasic[1][1], coordBasic[1][3], coordBasic[1][5], coordBasic[1][4], coordBasic[1][3]];

        x2b = [coordBasic[0][2], coordBasic[0][4], coordBasic[0][1], coordBasic[0][2], coordBasic[0][0]];
        y2b = [coordBasic[1][2], coordBasic[1][4], coordBasic[1][1], coordBasic[1][2], coordBasic[1][0]];

        x2c = [coordBasic[0][3], coordBasic[0][3]-1];
        y2c = [coordBasic[1][3], findY(coordBasic[0][3],coordBasic[1][3],coordBasic[0][2],coordBasic[1][2],coordBasic[0][3]-1)];

        x2d = [coordBasic[0][2], coordBasic[0][2]+4];
        y2d = [coordBasic[1][2], findY(coordBasic[0][2],coordBasic[1][2],coordBasic[0][3],coordBasic[1][3],coordBasic[0][2]+4)];
    }
    trace2a = {
      x: x2a,
      y: y2a,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: 'blue',
        size: 10
      },
      line: {
        color: 'black'
    },
      connectgaps: false
    }; 

    trace2b = {
      x: x2b,
      y: y2b,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: 'blue',
        size: 10
      },
      line: {
        color: 'black'
    },
      connectgaps: false
    }; 


    
    // console.log(coordBasic[1][2]+4*(coordBasic[0][3]-coordBasic[0][2])/(coordBasic[1][3]-coordBasic[1][2]))

    trace2c = {
      x: x2c,
      y: y2c,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: ['blue','green'],
        size: 10
      },
      line: {
        color: 'green'
    },
      connectgaps: false
    }; 

    trace2d = {
      x: x2d,
      y: y2d,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: ['blue','red'],
        size: [10,15],
        symbol:['circle','circle-open']
      },
      line: {
        color: 'red'
    },
      connectgaps: false
  }; 

    data2 = [trace2a, trace2b, trace2c, trace2d];

    layout2 = {
        title: 'd<sub>0</sub> = u<sub>R</sub> - u<sub>L</sub>',
      autosize: false,
      width: 400,
      height: 300,
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
          showarrow: true,
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

let x3a = [], x3b = [], y3a = [], y3b = [], x3c=[], y3c=[], x3d=[], y3d=[];

x3a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3]];
y3a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3]];

x3b = [nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y3b = [nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

x3c = [nod_coor_x[3], nod_coor_x[3]-1];
y3c = [nod_coor_y[3], findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1)];

x3d = [nod_coor_x[2], nod_coor_x[2]+4];
y3d = [nod_coor_y[2], findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4)];

let trace3c = {
  x: x3c,
  y: y3c,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: ['blue','green'],
    size: 10
  },
  line: {
    color: 'green'
},
  connectgaps: false
}; 

let trace3d = {
  x: x3d,
  y: y3d,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: ['blue','red'],
    size: [10,15],
    symbol:['circle','circle-open']
  },
  line: {
    color: 'red'
},
  connectgaps: false
}; 

var layout3 = {
    title: 'd<sub>1</sub> = u<sub>R</sub> - u<sub>L</sub>',
    autosize: false,
    width: 400,
    height: 300,
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
        x: nod_coor_x[3]-2,
        y: findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1),
        xref: 'x',
        yref: 'y',
        text: 'unit load (L)',
        showarrow: true,
        arrowhead: 3,
        ax: -21,
        ay: 37.5,
        standoff: 15
      },
      {
        x: nod_coor_x[2]+3,
        y: findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4),
        xref: 'x',
        yref: 'y',
        text: 'unit load (R)',
        showarrow: true,
        arrowhead: 3,
        ax: 21,
        ay: -37.5,
        standoff: 10
      },
  ]
}
let trace3a = {
    x: x3a,
    y: y3a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    line: {
      color: 'black'
  },
    connectgaps: false
}; 

let trace3b = {
    x: x3b,
    y: y3b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    line: {
      color: 'black'
  },
    connectgaps: false
}; 

var data3 = [trace3a, trace3b, trace3c, trace3d];

Plotly.newPlot('graph3', data3, layout3)

function updatePlot3(x){
  let coordVirtual = shapesVirtual['deformedRedundCoord_' + x];
  // console.log(coordVirtual)

  if (x===1){
    x3a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3]];
    y3a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3]];
    
    x3b = [nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
    y3b = [nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];
    
    x3c = [nod_coor_x[3], nod_coor_x[3]-1];
    y3c = [nod_coor_y[3], findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1)];
    
    x3d = [nod_coor_x[2], nod_coor_x[2]+4];
    y3d = [nod_coor_y[2], findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4)];
    
  } else {
    x3a = [coordVirtual[0][0], coordVirtual[0][1], coordVirtual[0][3], coordVirtual[0][5], coordVirtual[0][4], coordVirtual[0][3]];
    y3a = [coordVirtual[1][0], coordVirtual[1][1], coordVirtual[1][3], coordVirtual[1][5], coordVirtual[1][4], coordVirtual[1][3]];
  
    x3b = [coordVirtual[0][2], coordVirtual[0][4], coordVirtual[0][1], coordVirtual[0][2], coordVirtual[0][0]];
    y3b = [coordVirtual[1][2], coordVirtual[1][4], coordVirtual[1][1], coordVirtual[1][2], coordVirtual[1][0]];

    x3c = [coordVirtual[0][3], coordVirtual[0][3]-1];
    y3c = [coordVirtual[1][3], findY(coordVirtual[0][3],coordVirtual[1][3],coordVirtual[0][2],coordVirtual[1][2],coordVirtual[0][3]-1)];
  
    x3d = [coordVirtual[0][2], coordVirtual[0][2]+4];
    y3d = [coordVirtual[1][2], findY(coordVirtual[0][2],coordVirtual[1][2],coordVirtual[0][3],coordVirtual[1][3],coordVirtual[0][2]+4)];  
  
  }

  trace3a = {
    x: x3a,
    y: y3a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    line: {
      color:'black'      
  },
    connectgaps: false
  }; 

  trace3b = {
    x: x3b,
    y: y3b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
  line: {
    color:'black'      
  },
    connectgaps: false
  }; 


  trace3c = {
    x: x3c,
    y: y3c,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: ['blue','green'],
      size: 10
    },
    line: {
      color: 'green'
  },
    connectgaps: false
  }; 
  
  trace3d = {
    x: x3d,
    y: y3d,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: ['blue','red'],
      size: [10,15],
      symbol:['circle','circle-open']
    },
    line: {
      color: 'red'
  },
    connectgaps: false
  }; 

  data3 = [trace3a, trace3b, trace3c, trace3d];
  layout3 = {
    title: 'd<sub>0</sub> = u<sub>R</sub> - u<sub>L</sub>',
    autosize: false,
    width: 400,
    height: 300,
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
            x: coordVirtual[0][3]-1-1/x,
            y: findY(coordVirtual[0][2],coordVirtual[1][2],coordVirtual[0][3],coordVirtual[1][3],coordVirtual[0][2]+4),
            xref: 'x',
            yref: 'y',
            text: 'virtual load x (L)',
            showarrow: true,
            arrowhead: 3,
            ax: -21,
            ay: 37.5,
            standoff: 15
          },
          {
            x: coordVirtual[0][2]+4-1/5/x,
            y: findY(coordVirtual[0][2],coordVirtual[1][2],coordVirtual[0][3],coordVirtual[1][3],coordVirtual[0][2]+4),
            xref: 'x',
            yref: 'y',
            text: 'virtual load x (R)',
            showarrow: true,
            arrowhead: 3,
            ax: 21,
            ay: -37.5,
            standoff: 10
          },
      ]
  }

  Plotly.react('graph3',data3,layout3)  
}

function handleVirtual(){
  
  let virtualForce = parseFloat($("#virtualForce").val());
  let forceMag = parseFloat($("#forceMag").val());
//   $("#xDisplay").html(x);
  updatePlot3(virtualForce);

}

function handleCombine(){
    let x = parseFloat($("#x").val());
    let forceMag = parseFloat($("#forceMag").val());
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
x4a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3]];
y4a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3]];

x4b = [nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y4b = [nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

x4c = [nod_coor_x[3], nod_coor_x[3]-1];
y4c = [nod_coor_y[3], findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1)];

x4d = [nod_coor_x[2], nod_coor_x[2]+4];
y4d = [nod_coor_y[2], findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4)];

let trace4c = {
  x: x4c,
  y: y4c,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: ['blue','green'],
    size: 10
  },
  line: {
    color: 'green'
},
  connectgaps: false
}; 

let trace4d = {
  x: x4d,
  y: y4d,
  type: 'scatter',
  mode: 'markers+lines',
  marker: {
    color: ['blue','red'],
    size: [10,15],
    symbol:['circle','circle-open']
  },
  line: {
    color: 'red'
},
  connectgaps: false
}; 


var layout4 = {
    autosize: false,
    width: 400,
    height: 300,
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
        x: nod_coor_x[3]-1-1,
        y: findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1),
        xref: 'x',
        yref: 'y',
        text: 'virtual load x (R)',
        showarrow: true,
        arrowhead: 3,
        ax: -21,
        ay: 37.5,
        standoff: 15
      },
      {
        x: nod_coor_x[2]+4-1,
        y: findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4),
        xref: 'x',
        yref: 'y',
        text: 'virtual load x (L)',
        showarrow: true,
        arrowhead: 3,
        ax: 21,
        ay: -37.5,
        standoff: 10
      },
  ]
}
let trace4a = {
    x: x4a,
    y: y4a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    line:{
      color: 'black'
    },
    connectgaps: false
}; 

let trace4b = {
    x: x4b,
    y: y4b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    line:{
      color: 'black'
    },
    connectgaps: false
}; 

var data4 = [trace4a, trace4b, trace4c, trace4d];

Plotly.newPlot('graph4', data4, layout4)

function updatePlot4(x,forceMag){
  let coord = shapes['deformedCoord_' + forceMag];
  let coordBasic = shapesBasic['deformedBasicCoord_' + forceMag];
  // let coordVirtual = shapesVirtual['deformedRedundCoord_' + x];
  let coordComForce = shapesCom['deformedRedundCoord_' + forceMag];
  // console.log(coordComForce)
  let coordComCom = coordComForce[x];
  if(forceMag === 1 && x===10){
    x4a = [coordComCom[0], coordComCom[1], coordComCom[3], coordComCom[5], coordComCom[4], coordComCom[3]];
    y4a = [coordComCom[6+0], coordComCom[6+1], coordComCom[6+3], coordComCom[6+5], coordComCom[6+4], coordComCom[6+3]];

    x4b = [coordComCom[2], coordComCom[4], coordComCom[1], coordComCom[2], coordComCom[0]];
    y4b = [coordComCom[8], coordComCom[6+4], coordComCom[6+1], coordComCom[6+2], coordComCom[6+0]];

    x4c = [nod_coor_x[3], nod_coor_x[3]-1];
    y4c = [nod_coor_y[3], findY(nod_coor_x[3],nod_coor_y[3],nod_coor_x[2],nod_coor_y[2],nod_coor_x[3]-1)];
    
    x4d = [nod_coor_x[2], nod_coor_x[2]+4];
    y4d = [nod_coor_y[2], findY(nod_coor_x[2],nod_coor_y[2],nod_coor_x[3],nod_coor_y[3],nod_coor_x[2]+4)];
    
  }else{
    x4a = [coordComCom[0], coordComCom[1], coordComCom[3], coordComCom[5], coordComCom[4], coordComCom[3]];
    y4a = [coordComCom[6+0], coordComCom[6+1], coordComCom[6+3], coordComCom[6+5], coordComCom[6+4], coordComCom[6+3]];

    x4b = [coordComCom[2], coordComCom[4], coordComCom[1], coordComCom[2], coordComCom[0]];
    y4b = [coordComCom[6+2], coordComCom[6+4], coordComCom[6+1], coordComCom[6+2], coordComCom[6+0]];
  
    x4c = [coordComCom[3], coordComCom[3]-x/10];
    y4c = [coordComCom[9], findY(coordComCom[3],coordComCom[9],coordComCom[2],coordComCom[8],coordComCom[3]-x/10)];
    
    x4d = [coordComCom[2], coordComCom[3]-x/10+(x-10)*0.3];
    y4d = [coordComCom[8], findY(coordComCom[2],coordComCom[8],coordComCom[3],coordComCom[9],coordComCom[3]-x/10+(x-10)*0.3)];

}

  trace4a = {
    x: x4a,
    y: y4a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
    // line: {
    //   dash: 'dot'
    //   },
    connectgaps: false
  }; 

  trace4b = {
    x: x4b,
    y: y4b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'blue',
      size: 10
    },
  //   line: {
  //     dash: 'dot'
  // },
    connectgaps: false
  }; 

  trace4c = {
    x: x4c,
    y: y4c,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: ['blue','green'],
      size: 10
    },
    line: {
      color: 'green'
  },
    connectgaps: false
  }; 
  
  trace4d = {
    x: x4d,
    y: y4d,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: ['blue','red'],
      size: [10,15],
      symbol:['circle','circle-open']
    },
    line: {
      color: 'red'
  },
    connectgaps: false
  }; 

  data4 = [trace4a, trace4b, trace4c, trace4d];

  layout4 = {
    autosize: false,
    width: 400,
    height: 300,
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
            x: coordComCom[3]-x/10-1,
            y: findY(coordComCom[3],coordComCom[9],coordComCom[2],coordComCom[8],coordComCom[3]-x/10),
            xref: 'x',
            yref: 'y',
            text: 'virtual load x (L)',
            showarrow: true,
            arrowhead: 3,
            ax: -21,
            ay: 37.5,
            standoff: 15
          },
          {
            x: coordComCom[3]-x/10+(x-10)*0.3-1,
            y: findY(coordComCom[2],coordComCom[8],coordComCom[3],coordComCom[9],coordComCom[3]-x/10+(x-10)*0.3),
            xref: 'x',
            yref: 'y',
            text: 'virtual load x (R)',
            showarrow: true,
            arrowhead: 3,
            ax: 21,
            ay: -37.5,
            standoff: 10
          },
      ]
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
