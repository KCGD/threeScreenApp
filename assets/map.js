function InitMap(lat, long) {
    // const mapOpts = {
    //     zoom: 16,
    //     center: new google.maps.LatLng(lat, long)
    // }
    const mapElement = document.getElementById("mapFrame");
    mapElement.innerHTML = (`<iframe class="mapFrame" src="https://maps.google.com/maps?q=${lat},${long}&amp;z=15&amp;output=embed"></iframe>`);
}