const back = require('androidjs').back;
const path = require('path');
const http = require('http');
const fs = require('fs');

//working vars
let modelServer = null;

//start model server
back.on('initModelServer', function(port) {
	console.log(`[INFO]: Init model server on localhost:${port}`);

	//if modelserver already created, dont recreate it
	if(!modelServer) {
		modelServer = http.createServer(function(req, res) {
			if(req.url) {
				let modelPath = path.join('./assets/Face-Detection-JavaScript/models', path.basename(req.url));
				if(fs.existsSync(modelPath)) {
					const modelStats = fs.statSync(modelPath);
					let readStream = fs.createReadStream(modelPath);
					res.writeHead(200, {'content-length': modelStats.size, 'Access-Control-Allow-Origin':"*"});
					readStream.pipe(res);
	
					readStream.on('end', function() {
						res.end();
					})
				} else {
					console.log(`REQUEST | 404 | ${modelPath}`);
					res.writeHead(404, {'Access-Control-Allow-Origin':"*"});
					res.end(`could not find: ${modelPath}`);
				}
			} else {
				res.writeHead(401, {'Access-Control-Allow-Origin':"*"});
				res.end("malformed request");
			}
		}).listen(port);
	}

	back.send("initModelServerSuccess");
})