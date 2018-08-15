let x = [], origin = [];
for (let i = 0; i < 25; i++) {
  x[i] = 10*i/25;
  origin[i] = 10*i/25;
}

var layout12 = {
    autosize: true,
      width: 500,
      height: 130,
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
      },
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
      range: [-4,4],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: '',
      showticklabels: false
    },
    showlegend:false
  }
// initial plot for figure 1

var data1 = [];

let segment1 = new Array(24), trace1 = new Array(24);
for (let i = 0; i < 24; i++) {
  segment1[i] = new Array(2);
  segment1[i][0] = x[i];
  segment1[i][1] = x[i+1];
  trace1[i] = {
    x: segment1[i],
    y: [0,0],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: i*5,
      width: 8
    }
  };
  data1.push(trace1[i]);
}


Plotly.newPlot('graphRod', data1, layout12);

function handleElement(){
    let elementNumber = parseFloat($("#element").val());
    // $("#element").on("input",reset(elementNumber));
    // .on('change',getShape(elementNumber));
    $("#elementDisplay").html(elementNumber);

    data1 = []; x1 = [];
    // data2 = []; x2 = [];
    // data3 = []; x3 = [];
    updatePlot1(elementNumber);
    // updatePlot2(elementNumber);
    // updatePlot3(elementNumber);
  }
  
  
  function updatePlot1(element) {
    
    for (let i = 0; i < element+1; i++) {
      x1[i] = 10*i/(element);
    }
    for (let i = 0; i < element; i++) {
      segment1[i] = new Array(2);
      segment1[i][0] = x1[i];
      segment1[i][1] = x1[i+1];
      trace1[i] = {
        x: segment1[i],
        y: [0,0],
        type: 'scatter',
        mode: 'lines',
        line: {
          color: 20*Math.random(),
          width: 6,
          opacity: 1
        }
      };
      data1.push(trace1[i]);
    }
  
    Plotly.react('graphRod',data1,layout12);
  }