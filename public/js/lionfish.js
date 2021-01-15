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
    let response = await fetch('./sighting?id=' + this.options.sightingId);
    let sighting = await response.json();
    let tableContent = `
        <div>
            <table class="w3-table">
            <tr>
                <th>${this.options.sightingId}</th>
                <th>${sighting.Latitude}</th>
                <th>${sighting.Longitude}</th>
            </tr>
            <tr>
                <td> sighting 1</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 2</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 3</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 4</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 5</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 6</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 7</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 8</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 9</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            <tr>
                <td> sighting 10</td>
                <td>647368</td>
                <td>637289</td>
            </tr>
            </table>
        </div>
    `;
    document.getElementById('table').style.display = 'block';
    // document.getElementById('modalText').innerHTML = modalContent;

}

// <div>
// <table class="w3-table">
//   <tr>
//     <th>sighting</th>
//     <th>lat</th>
//     <th>lon</th>
//   </tr>
//   <tr>
//     <td> sighting 1</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 2</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 3</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 4</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 5</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 6</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 7</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 8</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 9</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
//   <tr>
//     <td> sighting 10</td>
//     <td>647368</td>
//     <td>637289</td>
//   </tr>
// </table>
// </div> */