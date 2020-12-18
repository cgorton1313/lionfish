const config = require('./config.js');
const mysql = require('mysql');
const util = require('util'); // for promisify

async function getSightings() {
    let sql = 'SELECT Latitude, Longitude, sighting_id FROM `penguinh_lionfish`.`sightings`';
    let result = await getQueryData(sql);
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
        getSightings
        }     


// var sightingsInfo = [
//     {latitude:42.4072, longitude:71.3824, id:1},
//     {latitude:43.1939, longitude:71.5724, id:2},
//     {latitude:41.6032, longitude:73.0877, id:3}
// ]

// function getSightings() {
//     return sightingsInfo;
// }

// module.exports = {
//     getSightings
// }