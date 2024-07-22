//Agregar mapa Leaflet
var supmap=L.map("imap").setView([-12.08,-77.0],8);

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
    supmap.setView([-12.08,-77.0],8);      
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



// Modal Files

var modalf = document.getElementById("myModalFiles");
var btnf = document.getElementById("btnArellanoFiles");
var spanf = document.getElementById("closef");

btnf.onclick = function() {
  modalf.style.display = "block";
}

spanf.onclick = function() {
  modalf.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalf) {
    modalf.style.display = "none";
  }
}


// Modal Layers

var modall = document.getElementById("myModalLayers");
var btnl = document.getElementById("btnMapLayers");
var spanl = document.getElementById("closel");;

btnl.onclick = function() {
  modall.style.display = "block";  
}

spanl.onclick = function() {
  modall.style.display = "none";  
}

window.onclick = function(event) {
  if (event.target == modall) {
    modall.style.display = "none";
  }
}

// Capas

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
});

var osmPositron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "© CartoDB",
  }
);

var osmDark = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, © <a href="https://carto.com/attributions">CARTO</a>',
  }
);

function changeLayer() {
  var selectedLayer = document.querySelector('input[name="layer"]:checked').value;
  switch (selectedLayer) {
    case 'osmDark':
      supmap.removeLayer(osm);
      supmap.removeLayer(osmPositron);
      osmDark.addTo(supmap);
      break;
    case 'osmPositron':
      supmap.removeLayer(osm);
      supmap.removeLayer(osmDark);
      osmPositron.addTo(supmap);
      break;
    case 'osm':
      supmap.removeLayer(osm);
      supmap.removeLayer(osmDark);
      osm.addTo(supmap);
      break;    
    default:
      break;
  }
  modall.style.display = "none"; 
}
