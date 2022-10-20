//map control
const gDisableMap = true;

//facial detection update interval
const gRecognitionUpdateRate = 2000;

//facial detection model server
const gModelServerPort = 3335;

//standardize getUserMedia call
navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);