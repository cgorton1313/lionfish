const config = require('./config.js');
const mysql = require('mysql');
const util = require('util'); // for promisify

async function getSightings() {
    let sql = 'SELECT Latitude, Longitude, sighting_id FROM `penguinh_lionfish`.`sightings`';
    let result = await getQueryData(sql);
    return result;
}

async function getSighting(id) {
    //let sql = 'SELECT * FROM `penguinh_lionfish`.`sightings` WHERE sighting_id = '+ id;
    let sql = `SELECT sighting_id, SpecimenNumber, Country, State, Locality, Latitude, Longitude, Source, Accuracy, DrainageName, HUC8Number, Year, Month, Day, Status, Comments, record_type FROM sightings WHERE sighting_id =  `+ id;
    let result = await getQueryData(sql);
    return result[0];
}

async function get10ClosestSightings(userLat, userLon) {
    let sql = ` SELECT sighting_id, Latitude, Longitude, ROUND((((acos(sin((${userLat} * pi()/180)) * sin((Latitude * pi()/180)) + cos((${userLat} * pi()/180)) * cos((Latitude * pi()/180)) * cos(((${userLon} - Longitude) * pi()/180)))) * 180/pi()) * 60), 2) as distance FROM penguinh_lionfish.sightings ORDER BY distance LIMIT 10`
    let result = await getQueryData(sql);
    //sort distance and then get the 10 closest
    return result;
}

// this function will connect to the database, query, disconnect, and return the query result
async function getQueryData(sql) {
    // this statement uses the values from config.js
    // it's common to keep usernames, passwords, etc., in a config file
    let connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });

    // standard connect operation with some error handling
    connection.connect(function (err) {
        if (err) {
            console.info('error when connecting to db:', err);
        } else {
            console.info('Connected to database ' + config.db.database + ' as user ' + config.db.user);
        }
    });

    // this is magic. don't ask.
    let query = util.promisify(connection.query).bind(connection); // node native promisify

    // try to query the database, handle errors if they happen
    let result;
    try {
        result = await query(sql);
    } catch (err) {
        console.info(err);
        result = '{Error}';
    }

    // it's important to close the database connection
    connection.end();

    return result;
}

module.exports = {
    getSighting, getSightings, get10ClosestSightings
}