//map control
const gDisableMap = true;

//facial detection update interval
const gRecognitionUpdateRate = 100;

//facial detection model server
const gModelServerPort = 8770;

//enable or disable debugging console
const gEnableConsole = true;

//enable or disable facial recognition
const gEnableFacialRecognition = true;

//standardize getUserMedia call
navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);