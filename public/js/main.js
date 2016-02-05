
function initWs() {
    var url = "ws://localhost:60001";
    var ws = new WebSocket(url);

    ws.onopen = function() {
        console.log('The websocket is now open.');
        ws.send('Thanks for letting me connect to you.');
    };

    ws.onmessage = function(event) {
        console.log(event.data);
    };

    ws.onclose = function() {
        console.log('The websocket is now closed.');
    };   
}

$(document).ready(function() {
    initWs();
});