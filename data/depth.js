const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = 'data/NAS-Data-Download.csv';

csv().fromFile(csvFilePath).then(function (data) {
doSomething(data);
}); 

function doSomething(data) {
    // for (i = 0; i < data.length; i++) {
    //     if (data.inculdes('depth')) {
    //         console.log(data);
    //     }
    // }

    // for (i = 0; i < data.day.length; i++) {
    //     x += data.day[i] + "<br>";
    //   }

      console.log(data);
}