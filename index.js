var express = require("express");
var bodyParser = require("body-parser");


/////////////////////////MÓDULOS DE APIS//////////////////////////
///////API DAVID///////////////////
var apiBuilders = require("./apis/builders.js");
///////API PACO/////////////////////
var apiMotogpStats = require("./apis/motogp-stats.js");
///////API VICTOR//////////////////
var apiBuses = require ("./apis/buses.js");



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

   /* db.find({}).toArray((err, buses) => {
        if (buses.lenght == 0) {
            console.log("Empty DB");
            db.insert(initialBuses);

        }
        else {
            console.log("DB initialized with " + buses.lenght + "buses");
        }
    });*/

    /////////////////////////////////////////////CONEXIÓN CON MÓDULOS///////////////////////////////////////////////////////
    apiBuilders.register(app, dbd, BASE_API_PATH);
    apiMotogpStats.register(app, dbp, BASE_API_PATH);
    apiBuses.register(app, db, BASE_API_PATH);
    
     app.listen(port, () => {
        console.log("Server Ready on port" + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e + "!");
    });
    
    console.log("Server setting up....");
});

////////////////////VICTOR//////////////////////////////////////////////////////

var initialBuses = [{
        "community": "madrid",
        "year": 2018,
        "month": "november",
        "occupation": 9.3,
        "transported-traveler": "42792",
        "country": "spain"

    },
    {
        "community": "cataluña",
        "year": 2018,
        "month": "december",
        "occupation": 6.4,
        "transported-traveler": "24492",
        "country": "spain"
    },
    {
        "community": "andalucia",
        "year": 2018,
        "month": "january",
        "occupation": 1.2,
        "transported-traveler": "147350",
        "country": "spain"

    },
    {
        "community": "murcia",
        "year": 2018,
        "month": "february",
        "occupation": 0.4,
        "transported-traveler": "1408",
        "country": "spain"
    },
    {
        "community": "extremadura",
        "year": 2018,
        "month": "january",
        "occupation": 1.7,
        "transported-traveler": "917",
        "country": "spain"
    }

];



app.get(BASE_API_PATH + "/buses/loadInitialData", function(req, res) {
    var inicializacion = [{
            "community": "madrid",
            "year": 2018,
            "month": "november",
            "occupation": 9.3,
            "transported-traveler": "42792",
            "country": "spain"

        },
        {
            "community": "cataluña",
            "year": 2018,
            "month": "december",
            "occupation": 6.4,
            "transported-traveler": "24492",
            "country": "spain"
        },
        {
            "community": "andalucia",
            "year": 2018,
            "month": "january",
            "occupation": 1.2,
            "transported-traveler": "147350",
            "country": "spain"

        },
        {
            "community": "murcia",
            "year": 2018,
            "month": "february",
            "occupation": 0.4,
            "transported-traveler": "1408",
            "country": "spain"
        },
        {
            "community": "extremadura",
            "year": 2018,
            "month": "january",
            "occupation": 1.7,
            "transported-traveler": "917",
            "country": "spain"
        }

    ];

    initialBuses = inicializacion;
    console.log("INFO: Initializing data.");
    res.send(initialBuses);
    res.sendStatus(201); //created!
    console.log("INFO: Data initialized.");

});

app.get(BASE_API_PATH + "/buses", (req, res) => {
    console.log(Date() + " - GET /buses");
    res.send(initialBuses);
});

app.post(BASE_API_PATH + "/buses", (req, res) => {
    console.log(Date() + " - POST /buses");
    var bus = req.body;
    initialBuses.push(bus);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/buses", (req, res) => {
    console.log(Date() + " - PUT /buses");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/buses", (req, res) => {
    console.log(Date() + " - DELETE /buses");
    initialBuses = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
    console.log(Date() + " - GET /buses/" + community);

    res.send(initialBuses.filter((c) => {
        return (c.community == community);
    })[0]);
});

app.delete(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
    console.log(Date() + " - DELETE /buses/" + community);

    initialBuses = initialBuses.filter((c) => {
        return (c.community != community);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
    console.log(Date() + " - POST /buses/" + community);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
    var contact = req.body;

    console.log(Date() + " - PUT /buses/" + community);



    if (community != contact.community) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialBuses = initialBuses.map((c) => {
        if (c.community == contact.community)
            return contact;
        else
            return c;
    });

    res.sendStatus(200);
});




////////////////////////////////////////////////////////////////////////////////
