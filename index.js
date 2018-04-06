var express = require("express");
var bodyParser = require("body-parser");


/////////////////////////MÓDULOS DE APIS//////////////////////////
///////API DAVID///////////////////
var apiBuilders = require( "./apis/builders.js");
///////API PACO/////////////////////
var apiMotogpStats = require( __dirname + "/apis/motogp-stats.js");
///////API VICTOR//////////////////
var apiBuses = require ( __dirname + "/apis/buses.js");



var app = express();
app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/public"));

////////CONEXION BASE DE DATOS//////////////////////////////////////////////////
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbbuses:12345@ds121118.mlab.com:21118/sos1718-10-sandbox";

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

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
    apiBuilders.register(app, dbd, BASE_API_PATH, checkApiKeyFunction);
    apiMotogpStats.register(app, dbp, BASE_API_PATH, checkApiKeyFunction);
    apiBuses.register(app, db, BASE_API_PATH, checkApiKeyFunction);
    
    // APIKEY
var API_KEY = "davvicfra";

// Helper method to check for apikey
var checkApiKeyFunction = (req, res) => {
    if (!req.query.apikey) {
        console.error('WARNING: No apikey was sent!');
        req.sendStatus(401);
        return false;
    }
    if (req.query.apikey !== API_KEY) {
        console.error('WARNING: Incorrect apikey was used!');
        res.sendStatus(403);
        return false;
    }
    return true;
};
    
     app.listen(port, () => {
        console.log("Server Ready on port" + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e + "!");
    });
    
    console.log("Server setting up....");
});


////////////////////////////////////////////////////////////////////////////////
