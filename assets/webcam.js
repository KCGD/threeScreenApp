function InitWebcam() {
    const videoElement = document.getElementById("webcamWrapper");
    const webcamCanvasWrapper = document.getElementById("webcamCanvasWrapper");
    let detectionLoop;

    //import models
    console.log("Importing models...");
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(`http://localhost:${gModelServerPort}/assets/Face-Detection-JavaScript/models`),
        faceapi.nets.faceLandmark68Net.loadFromUri(`http://localhost:${gModelServerPort}/assets/Face-Detection-JavaScript/models`),
        faceapi.nets.faceRecognitionNet.loadFromUri(`http://localhost:${gModelServerPort}/assets/Face-Detection-JavaScript/models`),
        faceapi.nets.faceExpressionNet.loadFromUri(`http://localhost:${gModelServerPort}/assets/Face-Detection-JavaScript/models`)
    ]).then(_startVideo);

    function _startVideo() {
        navigator.getUserMedia (
            {video: {}},
            stream => videoElement.srcObject = stream,
            err => console.error(error)
        )

        //video event listner
        videoElement.addEventListener('play', function() {
            const canvas = faceapi.createCanvasFromMedia(videoElement);
            webcamCanvasWrapper.append(canvas);
            console.info(`INFO | VIDEO | Dimensions: ${videoElement.innerWidth}x${videoElement.innerHeight}`);
            const videoSize = {width: 640, height:480};

            //detection loop
            detectionLoop = setInterval(async function() {
                const detectedFaces = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                //clear canvas
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                //resize results to video
                const resizedDetections = faceapi.resizeResults(detectedFaces, videoSize);

                //draw detection results
                faceapi.draw.drawDetections(canvas, resizedDetections);
            }, gRecognitionUpdateRate)
        })
    }
}