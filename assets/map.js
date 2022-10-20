function InitMap(lat, long) {
    if(!gDisableMap) {
        var tmap;
        var gMarker;
    
        tt.setProductInfo('map for location app', '1.0.0');
        tmap = tt.map({
            key: '5YqSma2OneYs4deCyul3GOi4QT4OG3Zi',
            container: 'mapFrame'
        });
    
        var scale = new tt.ScaleControl({
            maxWidth: 80,
            unit: 'imperial'
        });
        tmap.addControl(scale);
        scale.setUnit('metric');
    
        var nav = new tt.NavigationControl({});
        tmap.addControl(nav, 'top-right');
    
        gMarker = new tt.Marker().setLngLat([long, lat]).addTo(tmap);
    
        //error with tomtom where the first run wont actually center the map
        //usually works after the second or third run
        setInterval(function() {    
            tmap.setCenter([long, lat]);
            tmap.setZoom(15);
        }, 2000);
    } else {
        let locationDebugText = document.getElementById("locationDebugText");
        locationDebugText.innerHTML = "Map Disabled.<br>Rule: gDisableMap";
        locationDebugText.style.display = "block";
    }
}