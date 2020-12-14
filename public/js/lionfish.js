let chart = L.map('chart', {
    minZoom: 0,
    maxZoom: 20
}).setView([30, -80], 10);

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
}).addTo(chart);

getUserPosition();

function getUserPosition() {
    if (navigator.geolocation) {
    console.log("Geolocation is supported by this browser.");
    } else {
    console.log("Geolocation is not supported by this browser.");
    }
    }

