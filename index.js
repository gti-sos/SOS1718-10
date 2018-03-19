var express=require("express");
var bodyParser = require("body-parser");
//var DataStore = require("nedb");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";



var app=express();
app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));


/////////////////////////////////API DAVID/////////////////////////////////////
var initialBuildings = [
	{
		"country": "italy",
		"year":2004,
		"builder":"ferrari",
		"pole":18,
		"victory":15
    },
    
    {	"country":"germany",
    	"year":2015,
    	"builder":"mercedes",
    	"pole":18, 
    	"victory":16},
    {
    	"country": "uk",
    	"year": 1996, 
    	"builder": "williams",
    	"pole": 12,
    	"victory":12
    }];


app.get(BASE_API_PATH + "/buildings/loadInitialData", function (req, res){
     var inicializacion = [{
		"country": "italy",
		"year":2004,
		"builder":"ferrari",
		"pole":18,
		"victory":15
    },
    
    {	"country":"germany",
    	"year":2015,
    	"builder":"mercedes",
    	"pole":18, 
    	"victory":16},
    
    {
    	"country": "uk",
    	"year": 1996, 
    	"builder": "williams",
    	"pole": 12,
    	"victory":12
    }];
    
    initialBuildings=inicializacion;
        console.log("INFO: Initializing data.");
     //res.send(initialBuildings);
     res.sendStatus(201); //created!
     console.log("INFO: Data initialized.");
                 
});              

app.get(BASE_API_PATH + "/buildings", (req, res) => {
    //Date() es para que cuando hagamos un get nos muestre la fecha y hora del servidor 
    //y despues la coletilla GET /buildings
    console.log(Date() + " - GET /buildings");
    res.send(initialBuildings);
});

app.post(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - POST /buildings");
    var builder = req.body;
    res.sendStatus(201);
    initialBuildings.push(builder);
    
});

app.put(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - PUT /buildings");
    //Method not allowed
    res.sendStatus(405);
});

//DELETE al conjunto de recursos
app.delete(BASE_API_PATH + "/buildings", (req, res) => {
    console.log(Date() + " - DELETE /buildings");
    initialBuildings = [];
    res.sendStatus(200);
});

//GET a un recurso
app.get(BASE_API_PATH + "/buildings/:year", (req, res) => {
    var year = req.params.year;
     if (!year) {
        console.log("WARNING: New GET request to /buildings/:year without season, sending 400...");
        res.sendStatus(400); // bad request
    }else{
        console.log(Date() + " - GET /buildings/" + year);
        res.send(initialBuildings.filter((c) => {
            return (c.year == year);
        })[0]);
    }
});
//DELETE de un recurso
app.delete(BASE_API_PATH + "/buildings/:year", (req, res) => {
    var year = req.params.year;
    if (!year) {
        console.log("WARNING: New GET request to /buildings/:year without season, sending 400...");
        res.sendStatus(400); // bad request
    }else{
        console.log(Date() + " - DELETE /buildings/" + year);
    
        initialBuildings = initialBuildings.filter((c) => {
            return (c.year != year);
        });
        res.sendStatus(200);
    }
});

app.post(BASE_API_PATH + "/buildings/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - POST /buildings/" + year);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/buildings/:year", (req, res) => {
    var year = req.params.year;
    var builder = req.body;

    console.log(Date() + " - PUT /buildings/" + year);
    
    //db.update({"year": builder.year}, builder, (err,numUpdate)=>{
        //console.log("Update " + numUpdate);
    //})

    if (year != builder.year) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialBuildings = initialBuildings.map((c) => {
        if (c.year == builder.year)
            return builder;
        else
            return c;
    });

    res.sendStatus(200);
});

/////////////////////////////////API PACO-LEE///////////////////////////////////


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



app.get(BASE_API_PATH + "/motogp-stats/loadInitialData", function (req, res){
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

app.get(BASE_API_PATH + "/motogp-stats", (req, res) => {
    console.log(Date() + " - GET /motogp-stats");
    res.send(initialMotogpStats);
});

app.post(BASE_API_PATH + "/motogp-stats", (req, res) => {
    console.log(Date() + " - POST /motogp-stats");
    var motogp = req.body;
    initialMotogpStats.push(motogp);
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/motogp-stats", (req, res) => {
    console.log(Date() + " - PUT /motogp-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/motogp-stats", (req, res) => {
    console.log(Date() + " - DELETE /motogp-stats");
    initialMotogpStats = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - GET /motogp-stats/" + year);

    res.send(initialMotogpStats.filter((c) => {
        return (c.year == year);
    })[0]);
});

app.delete(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - DELETE /motogp-stats/" + year);

    initialMotogpStats = initialMotogpStats.filter((c) => {
        return (c.year != year);
    });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - POST /motogp-stats/" + year);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
    var year = req.params.year;
    var motogp = req.body;

    console.log(Date() + " - PUT /motogp-stats/" + year);
    
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



app.get(BASE_API_PATH + "/buses/loadInitialData", function (req, res){
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

    initialBuses=inicializacion;
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




app.listen(port,()=>{
    console.log("Server Ready on port" +port+ "!");
}).on("error",(e)=>{
    console.log("Server NOT READY:" +e+ "!");
});

//console.log(cool());
console.log("Server setting up....");
