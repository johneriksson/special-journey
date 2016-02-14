(function ($) {
    var ws;
    
    function appendToChat(username, timestamp, message) {
        $("#textarea").append("<p class='message-info'>" + username + " @ " + timestamp + "</p>");
        $("#textarea").append("<p class='message'>" + message + "</p>");
    }
    
    function convertTimestamp(UNIX_timestamp) {
        var fullDate = new Date(UNIX_timestamp * 1000);
        var hour = fullDate.getHours() < 10 ? "0" + fullDate.getHours() : fullDate.getHours();
        var min = fullDate.getMinutes() < 10 ? "0" + fullDate.getMinutes() : fullDate.getMinutes();
        var sec = fullDate.getSeconds() < 10 ? "0" + fullDate.getSeconds() : fullDate.getSeconds();
        
        var timestamp = hour + ":" + min + ":" + sec;
    }
    
    function initWs() {
        var url = "ws://localhost:60001";
        ws = new WebSocket(url);
        
        ws.onopen = function () {
            console.log("WebSocket open.");
        };
        
        ws.onmessage = function (event) {
            var timestamp = convertTimestamp(event.timestamp);
            var username = event.username;
            var message = event.data;
            
            appendToChat(username, timestamp, message);
        };
        
        ws.onclose = function () {
            console.log("WebSocket closed.");
        };
    }
    
    $(document).ready(function () {
        initWs();
        
        $("#send").on("click", function() {
            var input = $("#input").val();
            if (input != undefined && input != "") {
                ws.send(input);
                $("#input").val("");
            } 
        });
    });
})(jQuery);