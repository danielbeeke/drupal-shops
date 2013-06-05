$(function() {

  L.Icon.Default.imagePath = 'images';

  var map = L.map('map', {
    attributionControl: false
  }).setView([51.505, -0.09], 13);

  L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-vyofok3q/{z}/{x}/{y}.png').addTo(map);

  var features = new L.geoJson;

  var url = "https://docs.google.com/spreadsheet/pub?key=0Au2cOawuTPZWdDM2YWwzWU40a0tKbWlIVW00S3pyaFE&output=html";
  var googleSpreadsheet = new GoogleSpreadsheet();
  googleSpreadsheet.url(url);
  googleSpreadsheet.load(function(result) {
    $.each(result.items, function(index, company) {
      if (company.lat && company.long) {
        L.marker([company.lat, company.long]).addTo(features);
      }
    });

    features.addTo(map);
    var bounds = features.getBounds();
    map.fitBounds(bounds);
  });

});