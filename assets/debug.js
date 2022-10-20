//registers debug messages

function InitDebug() {
    front.on("ServerError404", function(path) {
        console.error(`ERROR | MODEL SERVER | Faled to find: ${path}`);
    })
}