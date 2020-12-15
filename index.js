const config = require(__dirname + '/config.js');
const lionfishData = require(__dirname + '/lionfishData.js');
const express = require('express');
const path = require('path');

const app = express();

console.log(config);

// send all the static stuff
app.use(express.static(path.join(__dirname + '/public')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/sighting*', async function (req, res) {
    res.json(lionfishData.getData());
});

app.listen(config.app.port, () => {
    console.log(`Lionfish server listening on port ${ config.app.port }`);
});