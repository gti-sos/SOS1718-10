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

/////////////////////////////////API PACO-LEE//////////////////////////
var initialMotogpStats = [
		{	
			"year" : 2017,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 298,
			"age" : 24
		},
		{
			"year" : 2016,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 298,
			"age" : 23
		},
		{	
			"year" : 2015,
			"pilot" : "jorge-lorezo",
			"country" : "spain",
			"score" : 330,
			"age" : 28
		},
		{	
			"year" : 2014,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 362,
			"age" : 21
		},
		{	
			"year" : 2013,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 334,
			"age" : 20
		},
		{	
			"year" : 2012,
			"pilot" : "jorge-lorezo",
			"country" : "spain",
			"score" : 350,
			"age" : 25
		},
		{	
			"year" : 2011,
			"pilot" : "casey-stoner",
			"country" : "australia",
			"score" : 350,
			"age" : 25
		},
		{	
			"year" : 2010,
			"pilot" : "jorge-lorezo",
			"country" : "spain",
			"score" : 383,
			"age" : 23
		},
		{	
			"year" : 2009,
			"pilot" : "valentino-rossi",
			"country" : "italy",
			"score" : 306,
			"age" : 30
		}
	];



app.get(BASE_API_PATH + "/motogpStats/loadInitialData", function (req, res){
     var inicializacion = [
     	{	
			"year" : 2017,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 298,
			"age" : 24
		},
		{
			"year" : 2016,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 298,
			"age" : 23
		},
		{	
			"year" : 2015,
			"pilot" : "jorge-lorezo",
			"country" : "spain",
			"score" : 330,
			"age" : 28
		},
		{	
			"year" : 2014,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 362,
			"age" : 21
		},
		{	
			"year" : 2013,
			"pilot" : "marc-marquez",
			"country" : "spain",
			"score" : 334,
			"age" : 20
		},
		{	
			"year" : 2012,
			"pilot" : "jorge-lorezo",
			"country" : "spain",
			"score" : 350,
			"age" : 25
		},
		{	
			"year" : 2011,
			"pilot" : "casey-stoner",
			"country" : "australia",
			"score" : 350,
			"age" : 25
		},
		{	
			"year" : 2010,
			"pilot" : "jorge-lorezo",
			"country" : "spain",
			"score" : 383,
			"age" : 23
		},
		{	
			"year" : 2009,
			"pilot" : "valentino-rossi",
			"country" : "italy",
			"score" : 306,
			"age" : 30
		}
	];
    initialMotogpStats=inicializacion;
        console.log("INFO: Initializing data.");
     res.send(initialMotogpStats);
     res.sendStatus(201); //created!
     console.log("INFO: Data initialized.");
                 
});              

app.get(BASE_API_PATH + "/motogpStats", (req, res) => {
    console.log(Date() + " - GET /motogpStats");
    res.send(initialMotogpStats);
});

app.post(BASE_API_PATH + "/motogpStats", (req, res) => {
    console.log(Date() + " - POST /motogpStats");
    var motogp = req.body;
    initialMotogpStats.push(motogp);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/motogpStats", (req, res) => {
    console.log(Date() + " - PUT /motogpStats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/motogpStats", (req, res) => {
    console.log(Date() + " - DELETE /motogpStats");
    initialMotogpStats = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/motogpStats/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - GET /motogpStats/" + year);

    res.send(initialMotogpStats.filter((c) => {
        return (c.year == year);
    })[0]);
});

app.delete(BASE_API_PATH + "/motogpStats/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - DELETE /motogpStats/" + year);

    initialMotogpStats = initialMotogpStats.filter((c) => {
        return (c.year != year);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/motogpStats/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - POST /motogpStats/" + year);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/motogpStats/:year", (req, res) => {
    var year = req.params.year;
    var motogp = req.body;

    console.log(Date() + " - PUT /motogpStats/" + year);
    
    //db.update({"year": motogp.year}, motogp, (err,numUpdate)=>{
        //console.log("Update " + numUpdate);
    //})

    if (year != motogp.year) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialMotogpStats = initialMotogpStats.map((c) => {
        if (c.year == motogp.year)
            return motogp;
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