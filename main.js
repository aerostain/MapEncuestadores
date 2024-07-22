//Agregar mapa Leaflet
var supmap=L.map("imap").setView([-12.08,-77.0],7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19  
}).addTo(supmap);

// Boton Ubicación
const btnUb = document.getElementById("btnUbic");
var ubic;
btnUb.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;    
    supmap.setView([lat, lon], 15);
    ubic=L.marker([lat,lon]).bindPopup("Estas aquí !").addTo(supmap).openPopup();    
  });
});

// Boton Zoom Inicial
const btnZoomI = document.getElementById("btnZoomIni");

btnZoomI.addEventListener("click", function () {  
    supmap.setView([-12.08,-77.0], 7);      
    if (ubic instanceof L.Layer) {
    ubic.remove();
    }else{
      console.log("No hay marcador de ubicación");
    }
});

//Boton Zoom

document.getElementById('btnZoomIn').addEventListener('click', () => {
  supmap.zoomIn();
});

document.getElementById('btnZoomOut').addEventListener('click', () => {
  supmap.zoomOut();
});




