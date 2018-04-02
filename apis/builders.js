var exports = module.exports ={};

exports.register = function(app, dbd, BASE_API_PATH){



///////////////////////////////////////7/INICIALIZAR EL CONJUNTO////////////////////////////////////////////////////////////////
app.get(BASE_API_PATH + "/builders/loadInitialData", function (req, res){
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
    },
    
    {
    	"country": "germany",
    	"year": 1998, 
    	"builder": "mercedes",
    	"pole": 12,
    	"victory":9
    },
    
    {
    	"country": "italy",
    	"year": 1999, 
    	"builder": "ferrari",
    	"pole": 3,
    	"victory":6
    }];
    
    //BUSCAMOS EN LA ABSE DE DATOS Y OBETENEMOS UN ARRAY
    dbd.find({}).toArray(function(err, builders){
       //SI HAY ALGUN ERROR EN EL SERVIDOR, LANZAR ERROR
       if(err){
           res.sendStatus(500);
       }else{
           //SI HAY ELEMENTOS EN EL ARRAY, DEVOLVER QUE HAY DATOS EN LA BASE DE DATOS
           if(builders.length > 0){
               console.log('INFO: DBD has ' + builders.length + ' results ');
               res.sendStatus(409);//Already Data
           }else{
               //SI LA BASE DE DATOS ESTÁ VACÍA LA INICIALIZAMOS
               dbd.insert(inicializacion);
               res.sendStatus(201); //created!
               console.log("INFO: DataBase initialized.");
           }
       }
    });
});              

/////////////////////////////////////////GET AL CONJUNTO DE RECURSOS/////////////////////////////////////////////
app.get(BASE_API_PATH + "/builders", (req, res) => {
    //Date() es para que cuando hagamos un get nos muestre la fecha y hora del servidor 
    //y despues la coletilla GET /builders
    console.log(Date() + " - GET /builders");
    dbd.find({}).toArray(function(err, builders){
        if(err){
            console.error("WARNING: Error getting data from DB");
            res.sendStatus(500);//Internal server error
        }else{
            res.send(builders);
        }
    });
});

//GET a un recurso
app.get(BASE_API_PATH + "/builders/:year", (req, res) => {
    var year = req.params.year;
     if (!year) {
        console.log("WARNING: New GET request to /builders/:year without season, sending 400...");
        res.sendStatus(400); // bad request
    }else{
        console.log(Date() + " - GET /builders/" + year);
        dbd.find({year:year}).toArray(function (err, filteredBuilders){
           if(err){
                console.error('WARNING: Error getting data from DB');
                res.sendStatus(500); // internal server error
           }else{
               if(filteredBuilders.length > 0){
                   var builders = filteredBuilders[0];
                   console.log("INFO: Sending builders: " + JSON.stringify(builders, 2, null));
                   res.send(builders);
                   res.sendStatus(200);
               }else{
                   console.log("WARNING: There are not any contact with builder " + year);
                   res.sendStatus(404); // not found
               }
           }
        });
    }
});

//////////////////////////////////////POST AL CONJUNTO DE RECURSOS(AÑADE UN NUEVO RECURSO)/////////////////////////////////////////////
app.post(BASE_API_PATH + "/builders", (req, res) => {
    var newBuilder = req.body;
    if (!newBuilder) {
        console.log("WARNING: New POST request to /builders/ without builders, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /builders with body: " + JSON.stringify(newBuilder, 2, null));
        if(!newBuilder.country || !newBuilder.year || !newBuilder.builder || !newBuilder.pole || !newBuilder.victory){
            console.log("WARNING: The newBuilder " + JSON.stringify(newBuilder, 2, null) + "is not well-formed, sending 422...");
            res.sendStatus(422); //unprocessable entity
        }else{
            dbd.find({}).toArray(function (err, builders){
                if(err){
                    console.log("WARNING: Error getting data from DB");
                    res.sendStatus(500);//internal server error
                }else{//MIRAMOS QUE NO ESTE YA EN LA BASE DE DATOS
                    var builderBeforeInsertion = builders.filter((builder)=>{
                        return (builder.year.localeCompare(newBuilder.year, "en", {'sensitivity' : 'base'}) == 0);
                    });
                    if(builderBeforeInsertion.length > 0){
                        console.log("WARNING: The builder " + JSON.stringify(newBuilder, 2, null) + " already exists, sending 409...");
                        res.sendStatus(409);
                    }else{
                        console.log("INFO: Adding builder " + JSON.stringify(newBuilder, 2, null));
                        dbd.insert(newBuilder);
                        res.sendStatus(201);//Created
                    }
                }
            });
        }
    }
});

/////////////////////////////////POST A UN RECURSO (405 MÉTODO NO PERMITIDO)////////////////////////////////////////////////////////
app.post(BASE_API_PATH + "/builders/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - POST /builders/" + year);
    res.sendStatus(405);
});

/////////////////////////////////////PUT AL CONJUNTO DE RECURSOS(405 METODO NO PERMITIDO)//////////////////////////////////////////
app.put(BASE_API_PATH + "/builders", (req, res) => {
    console.log(Date() + " - PUT /builders");
    //Method not allowed
    res.sendStatus(405);
});

///////////////////////////////////DELETE al conjunto de recursos////////////////////////////////////////////////////
app.delete(BASE_API_PATH + "/builders", (req, res) => {
    console.log(Date() + " - DELETE /builders");
    dbd.remove({}, {multi:true}, function(err, result){
        var numRemoved = JSON.parse(result);
        if(err){
            console.error("WARNING: Error removing data from DB");
            res.sendStatus(500);
        }else{
            if(numRemoved.n>0){
                console.log("INFO: All the builders (" + numRemoved + ") have been succesfully deleted, sending 204...");
                res.sendStatus(204);//no content
            }else{
                 console.log("WARNING: There are no contacts to delete");
                res.sendStatus(404); // not found
            }
        }
    });
});

//////////////////////////////////////////////DELETE de un recurso//////////////////////////////////////////////////////////////////////////////
app.delete(BASE_API_PATH + "/builders/:year", (req, res) => {
    var yearToRemove = req.params.year;
    if (!yearToRemove) {
        console.log("WARNING: New GET request to /builders/:year without season, sending 400...");
        res.sendStatus(400); // bad request
    }else{
        console.log(Date() + " - DELETE /builders/" + yearToRemove);
        dbd.remove({year:yearToRemove},{},function(err, result){
            var numRemoved= JSON.parse(result);
            if (err){
                console.error("WARNING: Error removing data from DB");
                res.sendStatus(500);//Internal server error
            }else{
                console.log("INFO: builder removed: " + numRemoved);
                if (numRemoved.n === 1) {
                    console.log("INFO: The builder with season " + yearToRemove + " has been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no builders to delete");
                    res.sendStatus(404); // not found
                }
            }
        });
    }
});



///////////////////////////////////PUT A UN RECURSO (ACTUALIZA EL RECURSO)////////////////////////////////////////////////////
app.put(BASE_API_PATH + "/builders/:year", (req, res) => {
    var year = req.params.year;
    var builder = req.body;

    console.log(Date() + " - PUT /builders/" + year);
    
    //db.update({"year": builder.year}, builder, (err,numUpdate)=>{
        //console.log("Update " + numUpdate);
    //})

    if (year != builder.year) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialBuilders = initialBuilders.map((c) => {
        if (c.year == builder.year)
            return builder;
        else
            return c;
    });

    res.sendStatus(200);
});
    
}