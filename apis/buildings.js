var exports = module.exports ={};

exports.register = function(app, dbd, BASE_API_PATH){


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
    
}