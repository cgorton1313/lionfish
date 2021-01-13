let chart;
let userLat;
let userLon;

getUserPosition();

function getUserPosition() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(loadChart, showError);
    } else {
        showError();
    }
}

function loadChart(position, zoomLevel = 13) {
    // use zoom level 10 if geo is on
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
    chart = L.map('chart', {
        minZoom: 0,
        maxZoom: 20
    }).setView([userLat, userLon], zoomLevel);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(chart);
    L.marker([userLat, userLon]).addTo(chart);
    getSightings().then(putSightingsOnChart);
    document.getElementById("locationMessage").setAttribute('class', 'w3-hide');
}

function findFish() {
    getNearestFish().then(putNearestInTable);
}

function putNearestInTable(sightings) {
    let dataTable = '<table>';
    dataTable += '<tr><th>Latitude</th><th>Longitude</th></tr>';
    for (let sighting of sightings) {
        dataTable += `<tr><td>${sighting.Latitude.toFixed(4)}</td>`;
        dataTable += `<td>${sighting.Longitude.toFixed(4)}</td></tr>`;
    }
    dataTable += '</table>';
    let messageDiv = document.getElementById('locationMessage');
    messageDiv.setAttribute('class', 'w3-show w3-container w3-panel');
    messageDiv.innerHTML = dataTable;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
    let position = { coords: { latitude: 27, longitude: -80 } };
    loadChart(position, 10); // if user doesn't have or allow geo, show default position and zoom
}

async function getNearestFish() {
    let response = await fetch(`./nearestSightings?lat=${userLat}&lon=${userLon}`);
    let sightings = await response.json();
    return sightings;
}

async function getSightings() {
    let response = await fetch('./sightings');
    let sightings = await response.json();
    return sightings;
}

function putSightingsOnChart(sightings) {
    let markers = L.markerClusterGroup({
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: false,
        removeOutsideVisibleBounds: true
    });
    for (let i = 0; i < sightings.length; i++) {
        let marker = L.marker([sightings[i].Latitude, sightings[i].Longitude], { sightingId: sightings[i].sighting_id });
        marker.on('click', doSomething);
        markers.addLayer(marker);
    }
    chart.addLayer(markers);
}

function doSomething() {
    console.log(this.options.sightingId);
}