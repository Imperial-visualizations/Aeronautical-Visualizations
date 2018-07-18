$(window).on('load',function(){
  // var dom = {
  //   intface: $("#interface"),
  //   loadSpinner: $("#loading-spinner"),
  //   elementInput: $("#element"),
  //   magInput: $("#displacementMag"),
  //   modeInput: $("#modeIndex")
  // },
  //
  //     plt = {
  //       layout: {
  //         xaxis: {
  //         range: [-5, 30],
  //         showgrid: true,
  //         zeroline: true,
  //         showline: false,
  //         autotick: true,
  //         ticks: '',
  //         showticklabels: false
  //         },
  //         yaxis: {
  //           autorange: true,
  //           showgrid: true,
  //           zeroline: false,
  //           showline: false,
  //           autotick: true,
  //           ticks: '',
  //           showticklabels: false
  //         },
  //           showlegend:false
  //       }
  //     }
  //
  //     maths = {
  //       mag: 1,
  //       mode: 5,
  //       element: 20,
  //
  //       data: [],
  //       x: [],
  //       y: [],
  //       origin: [],
  //       setElement: function(element){
  //         this.element = element;
  //       },
  //       setMode: function(mode){
  //         this.mode = mode;
  //       },
  //       setMag: function(mag){
  //         this.mag = mag;
  //       },
  //       let elementIndex = element - 1;
  //       getPlotData: function(){
  //         return this.data[this.elementIndex];
  //       }
  //     };

  $.when(
    $.getJSON("https://rawgit.com/Imperial-visualizations/Aeronautical-Visualizations/master/Hang/Rod_Vibration/data.json")
  ).then(function(data){
    data1 = data;
    console.log(data1.ModeShape_1[0])
  },showJSONLoadError);

  function init(allShapes){
    maths.allShapes = allShapes;
    endLoadingScreen();
    Plotly.plot(div = 'graphRod',deepCopy(maths.getPlotData()),layout = plt.layout);
    dom.elementInput.on("change",handleElementSlider);
    dom.modeInput.on("change",handleModeSlider);
    dom.magInput.on("change",handleMagSlider);
  }

  function handleElementSlider(){
    maths.element(element.val());
    dom.elementInput.html(element.val());
  }

  function handleModeSlider(){
    maths.mode(mode.val());
    dom.modeInput.html(mode.val());
  }

  function handleMagSlider(){
    maths.mag(mag.val());
    dom.magInput.html(mag.val());
  }

  function endLoadingScreen(){
    dom.loadSpinner.fadeOut(0);
  }

  function showJSONLoadError(){
    dom.loadSpinner.children(".spinner-span").html("Error: Failed to load JSON");
    dom.loadSpinner.children("div").fadeOut(0);
  }

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getObjKeys(obj) {
    return Object.keys(obj);
  }
  function getObjKeysAsInts(obj) {
    return Object.keys(obj).map(Number);
  }
  function getObjValues(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }

})
