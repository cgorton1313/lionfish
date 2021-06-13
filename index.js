const config = require(__dirname + '/config.js');
const lionfishData = require(__dirname + '/lionfishData.js');
const express = require('express');
const path = require('path');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: 'lionfish.log',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);

const app = express();

// send all the static stuff
app.use(express.static(path.join(__dirname + '/public')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// returns full list of sightings
app.get('/sightings', async function (req, res) {
    res.json(await lionfishData.getSightings());
});

// returns full data set for a single sighting
app.get('/sighting', async function (req, res) {
    res.json(await lionfishData.getSighting(req.query.id));
});

// returns parameterized number of sightings by proximity
app.get('/nearestSighting', async function (req, res) {
    res.json(await lionfishData.getClosestSightings(req.query.limitAmount, req.query.userLat, req.query.userLon));
});

// starts the app
app.listen(config.app.port, () => {
    log.info(`Lionfish server listening on port ${config.app.port}`);
});
