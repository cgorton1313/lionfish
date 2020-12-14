const express = require('express');
const path = require('path');

const app = express();

// send all the static stuff
app.use(express.static(path.join(__dirname + '/public')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(55555, () => {
    console.log("Lionfish server listening on port 55555");
});

app.get('/sighting*', async function (req, res) {
    res.json([{ name: "Bob" }]);
});