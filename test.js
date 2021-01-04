const lionfishData = require(__dirname + '/lionfishData.js');

test();
console.log('done');
async function test() {
let result = await lionfishData.getSighting(req.query.id);
console.log(result);
}