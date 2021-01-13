const lionfishData = require(__dirname + '/lionfishData.js');

test();

async function test() {
  let result = await lionfishData.get10ClosestSightings(42, -70);
  console.log(result);
}