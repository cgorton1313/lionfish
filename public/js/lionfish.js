let chart = L.map('chart', {
    minZoom: 0,
    maxZoom: 20
}).setView([30, -80], 10);

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
}).addTo(chart);

getUserPosition();




function getUserPosition() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(loadChart, showError);
    } else {
    console.log("Geolocation is not supported by this browser.");
    }
    }

    function loadChart(position, zoomLevel = 10) { 
        // use zoom level 10 if geo is on
        let userLat = position.coords.latitude;
        let userLon = position.coords.longitude;
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
            let position = { coords: { latitude: 35, longitude: -71 } };
            loadChart(position, 4); // if user doesn't have or allow geo, show default position and zoom
            }
            
            