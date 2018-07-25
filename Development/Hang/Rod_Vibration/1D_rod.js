/*
const math = require('math.js')

const E = 1;
const A = 1;
const L = 1;

const basic = [
  [1, -1],
  [-1, 1]
]

const local_k = math.mutiply(basic, E*A/L);

let K_glo = [];

function assemble (local, element) {
  let K_glo = [];
  return K_glo
}

K_glo = [
  [1, -1, 0],
  [-1, 2, -1],
  [0, -1, 1]
]

function boundary (u, v) {
  let K = [];
  return K
};

K = [
  [2, -1],
  [-1, 1]
]
const F1 = 1;
const F2 = 5;
const F = [F1, F2];

const K_inv = numeric.inv(K);
let u = [];

u = numeric.dot(K_inv, F);
*/
TESTER = document.getElementById('tester');

Plotly.plot( TESTER, [{
    x: [0,1,2],
    y: [0,0,0] }], {
    margin: { t: 0 } } );

/* Current Plotly.js version */
console.log( Plotly.BUILD );
