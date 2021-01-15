let chart;

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
    let userLat = position.coords.latitude;
    let userLon = position.coords.longitude;
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
        marker.on('click', getSightingInfo);
        markers.addLayer(marker);
    }
    chart.addLayer(markers);
}

async function getSightingInfo() {
    let response = await fetch('./sighting?id=' + this.options.sightingId);
    let sighting = await response.json();
    let modalContent = `
        <p>Latitude: ${sighting.Latitude}</p>
        <p>Longitude: ${sighting.Longitude}</p>
    `;
    console.log(sighting);
    document.getElementById('sightingModal').style.display = 'block';
    modalContent;
    document.getElementById('modalText').innerHTML = modalContent;
}

async function showClosestSightings() {
    let center = chart.getBounds().getCenter();
    let userLat = center.lat;
    let userLon = center.lng;

    let response = await fetch(`./nearestSighting?limitAmount=10&userLat=${userLat}&userLon=${userLon}`);
    let sightings = await response.json();
    console.log(sightings);

    // need to loop through here
    let tableContent = `
        <div>
            <table class="w3-table">
                <tr>
                    <th>Lat</th>
                    <th>Lon</th>
                    <th>Dist</th>
                </tr>
                <tr>
                    <td>42.1234</td>
                    <td>-70.4321</td>
                    <td>12 nm</td>
                </tr>
            </table>
        </div>
    `;
    
    document.getElementById('nearestSighting').style.display = 'block';
    document.getElementById('nearestSightingData').innerHTML = tableContent;
}

function showMobileNav() {
    var x = document.getElementById("demo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}