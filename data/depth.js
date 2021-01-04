const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = 'puller/NAS-Data-Download-11-02-2020-74078/NAS-Data-Download.csv';

csv().fromFile(csvFilePath).then(function (data) {
doSomething(data);
});

function doSomething(data) {
  console.log(data);
    // for (i = 0; i < data.length; i++) {
    //     if (data.inculdes('depth')) {
    //         console.log('there is depth');
    //     }
    // }

    // for (i = 0; i < data.day.length; i++) {
    //     x += data.day[i] + "<br>";
    //   }
  // for (var i=0; i<data.length; i++) {
  //     if (data[i].match(str)) return i;
  // }
}