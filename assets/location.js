function InitLocation () {
    let location;

    //location api will fail if in dev environment. Automatically switch to cached response
    try {
        location = app.location.get();
    } catch (e) {
        console.log(e);
        location = {
            "error":false,
            "latitude":40,
            "longitude":-130,
            "cached":true
        }
    }

    //i know redefining the object for return is redundant, didnt feel like writing out "latitude" and "longitude" everywhere
    return ({
        "error":location.error,
        "lat":location.latitude,
        "long":location.longitude
    });
}