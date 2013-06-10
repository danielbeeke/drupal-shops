$(function() {

  var map = L.map('map', {
    attributionControl: false
  }).setView([51.505, -0.09], 13);

  L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-vyofok3q/{z}/{x}/{y}.png').addTo(map);

  var d = new Date();
  var n = d.getTime();

  L.tileLayer('http://tilemill.danielbeeke.nl:20008/tile/drupal_shops/{z}/{x}/{y}.png').addTo(map);

  var features = new L.MarkerClusterGroup({
      iconCreateFunction: function(cluster) {
          return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
      },
      polygonOptions: {
        stroke: false
      }
  });

  var myIcon = L.icon({
      iconUrl: 'images/drupal-marker.png',
      iconRetinaUrl: 'images/drupal-marker@2x.png',
      iconSize: [29, 34],
      iconAnchor: [15, 34],
      popupAnchor: [-3, -20],
      shadowUrl: 'images/drupal-shadow.png',
      shadowRetinaUrl: 'images/drupal-shadow@2x.png',
      shadowSize: [37, 16],
      shadowAnchor: [15, 13]
  });


  var url = "https://docs.google.com/spreadsheet/pub?key=0Au2cOawuTPZWdDM2YWwzWU40a0tKbWlIVW00S3pyaFE&output=html";
  var googleSpreadsheet = new GoogleSpreadsheet();
  googleSpreadsheet.url(url);
  googleSpreadsheet.load(function(result) {
    $.each(result.items, function(index, company) {
      if (company.lat && company.long) {
        L.marker([company.lat, company.long], {
          icon: myIcon
        }).addTo(features).bindPopup(company.id);
      }
    });

    features.addTo(map);
    var bounds = features.getBounds();
    map.fitBounds(bounds);
  });

});