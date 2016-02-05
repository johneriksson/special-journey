var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 60001 });

function broadcast(message) {
    wss.clients.forEach(function(client) {
        client.send(message);
    });
}

wss.on("connection", function(ws) {
    ws.on("message", function(message) {
        console.log(message);
        broadcast(message);
    });
});