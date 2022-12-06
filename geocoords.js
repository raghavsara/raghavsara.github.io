var map1 = L.map('map').setView([17.291038, 78.762219], 15);

L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map1);

$.getJSON("foo.geojson",function(data){
    // L.geoJson function is used to parse geojson file and load on to map
    L.geoJson(data).addTo(map1);
    });

  


        $.getJSON("foo.geojson",function(data){
            // add GeoJSON layer to the map once the file is loaded
            var datalayer = L.geoJson(data ,{
            onEachFeature: function(feature, featureLayer) {
            featureLayer.bindPopup(feature.properties.name);
            }
            }).addTo(map1);
            map1.fitBounds(datalayer.getBounds());
            });

            var loadMap = function (id) {
                
                var map = map1;
                //var tile_url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
                var layer = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']});
                map.addLayer(layer);
                
            
                map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
                    .on('locationfound', function(e){


                        var marker = L.marker([e.latitude, e.longitude]).bindPopup('Click to know your ward no');
                        
                        map.addLayer(marker);
                        
                    })
                   .on('locationerror', function(e){
                        console.log(e);
                        alert("Location access denied.");
                    });
            };
            
            loadMap('map');

/*
            $.getJSON("foo.geojson", function(data) {
                for (i = 0; i < data.features.length; i++) { 
                    
                    var lng = function(e){ return e.latitude};
                    var lat = function(e){ return e.longitude};
                    var Line1 = data.features[i].properties.addressLine1;
                                var Line2 = data.features[i].properties.addressLine2;
                                var MCDs = L.marker([lat,lng]).bindPopup("&ltb&gtAddress: &lt/b&gt" + Line1 + "&lt/br&gtRegion: " + Line2);
                    mcd.addLayer(MCDs);
                } 
            });
            mcd.addTo(map);        */  
