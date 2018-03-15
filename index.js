var express=require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";



var app=express();
app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));

app.get("/hello",(req,res)=>{
    res.send("Hello world!");
});

app.get("/time",(req,res)=>{
    console.log("new request to /time");
    res.send(new Date());
});


/////////////////////////////////API DAVID//////////////////////////
var initialBuildings = [{
        "name": "pablo",
        "phone": 12345
    },
    {
        "name": "pepe",
        "phone": 6789
    }
];



app.get(BASE_API_PATH + "/buildings/loadInitialData", function (req, res){
     var inicializacion = [{
        "name": "pablo",
        "phone": 12345
    },
    {
        "name": "pepe",
        "phone": 6789
    }];
    initialBuildings=inicializacion;
        console.log("INFO: Initializing data.");
     res.send(initialBuildings);
     res.sendStatus(201); //created!
     console.log("INFO: Data initialized.");
                 
});              

app.get(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - GET /buildings");
    res.send(initialBuildings);
});

app.post(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - POST /buildings");
    var contact = req.body;
    initialBuildings.push(contact);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - PUT /buildings");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - DELETE /buildings");
    initialBuildings = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/buildings/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - GET /buildings/" + name);

    res.send(initialBuildings.filter((c) => {
        return (c.name == name);
    })[0]);
});

app.delete(BASE_API_PATH + "/buildings/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - DELETE /buildings/" + name);

    initialBuildings = initialBuildings.filter((c) => {
        return (c.name != name);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/buildings/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + " - POST /buildings/" + name);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/buildings/:name", (req, res) => {
    var name = req.params.name;
    var contact = req.body;

    console.log(Date() + " - PUT /buildings/" + name);
    
    //db.update({"name": contact.name}, contact, (err,numUpdate)=>{
        //console.log("Update " + numUpdate);
    //})

    if (name != contact.name) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialBuildings = initialBuildings.map((c) => {
        if (c.name == contact.name)
            return contact;
        else
            return c;
    });

    res.sendStatus(200);
});









app.listen(port,()=>{
    console.log("Server Ready on port" +port+ "!");
}).on("error",(e)=>{
    console.log("Server NOT READY:" +e+ "!");
});

//console.log(cool());
console.log("Server setting up....");
//l03