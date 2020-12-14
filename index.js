const config = require(__dirname + '/config.js');
const express = require('express');
const path = require('path');

const app = express();

// send all the static stuff
app.use(express.static(path.join(__dirname + '/public')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(config.app.port, () => {
    console.log(`Lionfish server listening on port ${ config.app.port }`);
});

app.get('/sighting*', async function (req, res) {
    res.json([{ name: "Bob" }]);
});