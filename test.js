const lionfishData = require(__dirname + '/lionfishData.js');

test();
console.log('done');
async function test() {
//let result = await lionfishData.getSighting(5); 
let result = await lionfishData.getClosestSightings(6, 100,100);
console.log(result);
}