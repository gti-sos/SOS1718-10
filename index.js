var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");


/////////////////////////MÓDULOS DE APIS//////////////////////////
///////API DAVID///////////////////
var apiBuilders = require("./apis/builders.js");
///////API PACO/////////////////////
var apiMotogpStats = require(__dirname + "/apis/motogp-stats.js");
///////API VICTOR//////////////////
var apiBuses = require(__dirname + "/apis/buses.js");

var security = require("./security.js")

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname + "/public")));
app.use("/secure", express.static(path.join(__dirname + "/public/security")));
app.use("/buses", express.static(path.join(__dirname + "/public/public_apis/buses")));
app.use("/buses/front", express.static(path.join(__dirname + "/public/public_apis/buses/front-end")));
app.use("/builders", express.static(path.join(__dirname + "/public/public_apis/builders")));
app.use("/builders/front", express.static(path.join(__dirname + "/public/public_apis/builders/front-end")));
app.use("/motogp-stats", express.static(path.join(__dirname + "/public/public_apis/motogp")));
app.use("/motogp-stats/front", express.static(path.join(__dirname + "/public/public_apis/motogp/front-end")));
app.use("/buses/secure", express.static(path.join(__dirname + "/public/security/security_apis/buses_security")));
app.use("/buses/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/buses_security/front-end_security")));
app.use("/builders/secure", express.static(path.join(__dirname + "/public/security/security_apis/builders_security")));
app.use("/builders/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/builders_security/front-end_security")));
app.use("/motogp-stats/secure", express.static(path.join(__dirname + "/public/security/security_apis/motogp_security")));
app.use("/motogp-stats/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/motogp_security/front-end_security")));


////////CONEXION BASE DE DATOS//////////////////////////////////////////////////
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbbuses:12345@ds121118.mlab.com:21118/sos1718-10-sandbox";

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_V2 = "/api/v2";
var BASE_API_PATH_SECURE = "/api/v1/security";

var express = require('express');  
var request = require('request');

/////////// PROXY PACO-LEE

var paths='/proxyFGG';
var apiServerHost = 'https://sos1718-10.herokuapp.com';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


/////////// PROXY BUILDERS

var pathsBuilders='/proxyBuilders';

app.use(pathsBuilders, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB: " + err);
        process.exit(1);
    }
    console.log("Connected to DB");

    var database = mlabs.db("sos1718-10-sandbox")
    var db = database.collection("buses");
    var dbd = database.collection("builders");
    var dbp = database.collection("motogp-stats");


    /////////////////////////////////////////////CONEXIÓN CON MÓDULOS///////////////////////////////////////////////////////
    apiBuilders.register(app, dbd, BASE_API_PATH, security.checkApiKeyFunction);
    apiMotogpStats.register(app, dbp, BASE_API_PATH, security.checkApiKeyFunction);
    apiBuses.register(app, db, BASE_API_PATH, security.checkApiKeyFunction);

    app.listen(port, () => {
        console.log("Server Ready on port" + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e + "!");
    });

    console.log("Server setting up....");
});


////////////////////////////////////////////////////////////////////////////////
