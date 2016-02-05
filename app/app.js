var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");

//Setup
var dir = __dirname + "./../public";
app.use(express.static(dir));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//Auth routes
var router = express.Router();
require("./routes")(router);
app.use("/", router);

//Chat stuff
require("./chat");

//Launch
var port = 60000
app.listen(process.env.PORT || port);
console.log("Server running on port " + port);
