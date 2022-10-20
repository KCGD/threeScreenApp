window.onload = function() {
    const swipeElement = document.getElementById("swipeElement");
    window["swipeElement"] = new Swipe(swipeElement, {
        startSlide:0,
        draggable:true,
        continuous:false,
        stopPropagation: false,
        callback: function(index, element){},
        transitionEnd: function(index, element){}
    });
    //initialize pages
    InitCalculator();

    //location stuff
    const currentLocation = InitLocation();
    if(currentLocation.lat && currentLocation.long) {
        //document.getElementById("locationText").innerHTML = `${currentLocation.lat}, ${currentLocation.long}`;
        InitMap(currentLocation.lat, currentLocation.long);
    } else {
        let locationDebugText = document.getElementById("locationDebugText");
        locationDebugText.innerHTML = JSON.stringify(currentLocation);
        locationDebugText.style.display = "block";
    }

    //webcam
    front.send("initModelServer", gModelServerPort);
    front.on("initModelServerSuccess", function() {
        InitWebcam();
    })
}