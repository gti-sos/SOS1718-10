var express = require("express");
var bodyParser = require("body-parser");


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
app.use("/", express.static(__dirname + "/public"));
app.use("/secure", express.static(__dirname + "/public/security"));
app.use("/buses", express.static(__dirname + "/public/buses"));
app.use("/builders", express.static(__dirname + "/public/builders"));
app.use("/motogp-stats", express.static(__dirname + "/public/motogp"));
app.use("/buses/secure", express.static(__dirname + "/public/security/buses_security"));
app.use("/builders/secure", express.static(__dirname + "/public/security/builders_security"));
app.use("/motogp-stats/secure", express.static(__dirname + "/public/security/motogp_security"));

////////CONEXION BASE DE DATOS//////////////////////////////////////////////////
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbbuses:12345@ds121118.mlab.com:21118/sos1718-10-sandbox";

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_SECURE = "/api/v1/security";

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
