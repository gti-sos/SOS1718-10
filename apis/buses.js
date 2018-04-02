var exports = module.exports ={};

exports.register = function(app, db, BASE_API_PATH){


////////////////////VICTOR//////////////////////////////////////////////////////

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

    
    //BUSCAMOS EN LA ABSE DE DATOS Y OBETENEMOS UN ARRAY
    db.find({}).toArray(function(err, buses){
       //SI HAY ALGUN ERROR EN EL SERVIDOR, LANZAR ERROR
       if(err){
           res.sendStatus(500);
       }else{
           //SI HAY ELEMENTOS EN EL ARRAY, DEVOLVER QUE HAY DATOS EN LA BASE DE DATOS
           if(buses.length > 0){
               console.log('INFO: db has ' + buses.length + ' results ');
               res.sendStatus(409);//Already Data
           }else{
               //SI LA BASE DE DATOS ESTÁ VACÍA LA INICIALIZAMOS
               db.insert(inicializacion);
               res.sendStatus(201); //created!
               console.log("INFO: DataBase initialized.");
           }
       }
    });
});              

/////////////////////////////////////////GET AL CONJUNTO DE RECURSOS/////////////////////////////////////////////
app.get(BASE_API_PATH + "/buses", (req, res) => {
    //Date() es para que cuando hagamos un get nos muestre la fecha y hora del servidor 
    //y despues la coletilla GET /buses
    console.log(Date() + " - GET /buses");
    db.find({}).toArray(function(err, buses){
        if(err){
            console.error("WARNING: Error getting data from DB");
            res.sendStatus(500);//Internal server error
        }else{
            res.send(buses);
        }
    });
});

//GET a un recurso
app.get(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
     if (!community) {
        console.log("WARNING: New GET request to /buses/:community without season, sending 400...");
        res.sendStatus(400); // bad request
    }else{
        console.log(Date() + " - GET /buses/" + community);
        db.find({community:community}).toArray(function (err, filteredbuses){
           if(err){
                console.error('WARNING: Error getting data from DB');
                res.sendStatus(500); // internal server error
           }else{
               if(filteredbuses.length > 0){
                   var buses = filteredbuses[0];
                   console.log("INFO: Sending buses: " + JSON.stringify(buses, 2, null));
                   res.send(buses);
                   res.sendStatus(200);
               }else{
                   console.log("WARNING: There are not any contact with bus " + community);
                   res.sendStatus(404); // not found
               }
           }
        });
    }
});

//////////////////////////////////////POST AL CONJUNTO DE RECURSOS(AÑADE UN NUEVO RECURSO)/////////////////////////////////////////////
app.post(BASE_API_PATH + "/buses", (req, res) => {
    var newBuses = req.body;
    if (!newBuses) {
        console.log("WARNING: New POST request to /buses/ without buses, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /buses with body: " + JSON.stringify(newBuses, 2, null));
        if(!newBuses.community || !newBuses.year || !newBuses.month || !newBuses.occupation || !newBuses.transported-traveler|| !newBuses.country){
            console.log("WARNING: The newBuses " + JSON.stringify(newBuses, 2, null) + "is not well-formed, sending 422...");
            res.sendStatus(422); //unprocessable entity
        }else{
            db.find({}).toArray(function (err, buses){
                if(err){
                    console.log("WARNING: Error getting data from DB");
                    res.sendStatus(500);//internal server error
                }else{//MIRAMOS QUE NO ESTE YA EN LA BASE DE DATOS
                    var busesBeforeInsertion = buses.filter((bus)=>{
                        return (bus.community.localeCompare(newBuses.community, "en", {'sensitivity' : 'base'}) == 0);
                    });
                    if(busesBeforeInsertion.length > 0){
                        console.log("WARNING: The bus " + JSON.stringify(newBuses, 2, null) + " already exists, sending 409...");
                        res.sendStatus(409);
                    }else{
                        console.log("INFO: Adding bus " + JSON.stringify(newBuses, 2, null));
                        db.insert(newBuses);
                        res.sendStatus(201);//Created
                    }
                }
            });
        }
    }
});

/////////////////////////////////POST A UN RECURSO (405 MÉTODO NO PERMITIDO)////////////////////////////////////////////////////////
app.post(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
    console.log(Date() + " - POST /buses/" + community);
    res.sendStatus(405);
});

/////////////////////////////////////PUT AL CONJUNTO DE RECURSOS(405 METODO NO PERMITIDO)//////////////////////////////////////////
app.put(BASE_API_PATH + "/buses", (req, res) => {
    console.log(Date() + " - PUT /buses");
    //Method not allowed
    res.sendStatus(405);
});

///////////////////////////////////DELETE al conjunto de recursos////////////////////////////////////////////////////
app.delete(BASE_API_PATH + "/buses", (req, res) => {
    console.log(Date() + " - DELETE /buses");
    db.remove({}, {multi:true}, function(err, result){
        var numRemoved = JSON.parse(result);
        if(err){
            console.error("WARNING: Error removing data from DB");
            res.sendStatus(500);
        }else{
            if(numRemoved.n>0){
                console.log("INFO: All the buses (" + numRemoved + ") have been succesfully deleted, sending 204...");
                res.sendStatus(204);//no content
            }else{
                 console.log("WARNING: There are no contacts to delete");
                res.sendStatus(404); // not found
            }
        }
    });
});

//////////////////////////////////////////////DELETE de un recurso//////////////////////////////////////////////////////////////////////////////
app.delete(BASE_API_PATH + "/buses/:community", (req, res) => {
    var communityToRemove = req.params.community;
    if (!communityToRemove) {
        console.log("WARNING: New GET request to /buses/:community without season, sending 400...");
        res.sendStatus(400); // bad request
    }else{
        console.log(Date() + " - DELETE /buses/" + communityToRemove);
        db.remove({community:communityToRemove},{},function(err, result){
            var numRemoved= JSON.parse(result);
            if (err){
                console.error("WARNING: Error removing data from DB");
                res.sendStatus(500);//Internal server error
            }else{
                console.log("INFO: bus removed: " + numRemoved);
                if (numRemoved.n === 1) {
                    console.log("INFO: The bus with season " + communityToRemove + " has been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no buses to delete");
                    res.sendStatus(404); // not found
                }
            }
        });
    }
});



///////////////////////////////////PUT A UN RECURSO (ACTUALIZA EL RECURSO)////////////////////////////////////////////////////
app.put(BASE_API_PATH + "/buses/:community", (req, res) => {
    var community = req.params.community;
    var bus = req.body;

    console.log(Date() + " - PUT /buses/" + community);
    
    //db.update({"community": bus.community}, bus, (err,numUpdate)=>{
        //console.log("Update " + numUpdate);
    //})

    if (community != bus.community) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    initialbuses = initialbuses.map((c) => {
        if (c.community == bus.community)
            return bus;
        else
            return c;
    });

    res.sendStatus(200);
});
    
}




////////////////////////////////////////////////////////////////////////////////


