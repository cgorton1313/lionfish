const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = 'puller/NAS-Data-Download-11-02-2020-74078/NAS-Data-Download.csv';

csv().fromFile(csvFilePath).then(function (data) {
doSomething(data);
});
