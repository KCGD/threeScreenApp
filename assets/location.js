function InitLocation () {
    let location;
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

    return (location);
}