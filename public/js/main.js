var ws;

function initWs() {
    var url = "ws://localhost:60001";
    ws = new WebSocket(url);

    ws.onopen = function() {
        console.log("WebSocket open.");
    };

    ws.onmessage = function(event) {
        console.log(event.data);
        
        var text = $("#textarea").val();
        $("#textarea").val(text + event.data + "\n");
    };

    ws.onclose = function() {
        console.log("WebSocket closed.");
    };   
}

$(document).ready(function() {
    initWs();
});

function send() {
    var input = $("#input").val();
    if(input != undefined && input != "") {
        ws.send(input);
        $("#input").val("");
    }
}