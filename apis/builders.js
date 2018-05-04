var exports = module.exports = {};
var BASE_API_PATH_SECURE = "/api/v1/security";

exports.register = function(app, dbd, BASE_API_PATH, checkApiKeyFunction) {

 ///FUNCION PAGINACION
    var insertar = function(elementos, array, offset, limit) {
        
        var i = offset;
        var j = limit;
        while (j > 0) {
            array.push(elementos[i]);
            j--;
            i++;
        }
        return elementos;
    }


    ////////////////////////////////////////INICIALIZAR EL CONJUNTO////////////////////////////////////////////////////////////////
    app.get(BASE_API_PATH + "/builders/loadInitialData", function(req, res) {
        var inicializacion = [{
                "country": "uk",
                "year": 1996,
                "builder": "williams",
                "pole": 12,
                "victory": 12
            },

            {
                "country": "germany",
                "year": 1998,
                "builder": "mercedes",
                "pole": 12,
                "victory": 9
            },

            {
                "country": "italy",
                "year": 1999,
                "builder": "ferrari",
                "pole": 3,
                "victory": 6
            }, 
            {
                "country": "italy",
                "year": 2004,
                "builder": "ferrari",
                "pole": 18,
                "victory": 15
            },

            {
                "country": "germany",
                "year": 2015,
                "builder": "mercedes",
                "pole": 18,
                "victory": 16
            }];

        //BUSCAMOS EN LA ABSE DE DATOS Y OBETENEMOS UN ARRAY
        dbd.find({}).toArray((err, builders) => {
            //SI HAY ALGUN ERROR EN EL SERVIDOR, LANZAR ERROR
            if (err) {
                res.sendStatus(500);
            }
            else {
                //SI HAY ELEMENTOS EN EL ARRAY, DEVOLVER QUE HAY DATOS EN LA BASE DE DATOS
                if (builders.length > 0) {
                    console.log('INFO: DBD has ' + builders.length + ' results ');
                    res.sendStatus(409); //Already Data
                }
                else {
                    //SI LA BASE DE DATOS ESTÁ VACÍA LA INICIALIZAMOS
                    dbd.insert(inicializacion);
                    res.sendStatus(201); //created!


                    console.log("INFO: DataBase initialized.");
                }
            }
        });
    });

    /////////////////////////////////////////GET AL CONJUNTO DE RECURSOS/////////////////////////////////////////////
    app.get(BASE_API_PATH + "/builders", function(req, res) {
        // if(!checkApiKeyFunction(req, res)) return;
        //Date() es para que cuando hagamos un get nos muestre la fecha y hora del servidor 
        //y despues la coletilla GET /builders
        console.log(Date() + " - GET /builders");

        //variables de búsqueda
        var url = req.query;
        var country = url.country;
        var year = url.year;
        var builder = url.builder;
        var pole = url.pole;
        var victory = url.victory;

        //variables de paginación
        var limit = parseInt(url.limit);
        var offset = parseInt(url.offset);
        var elementos = [];


        if (offset >= 0 && limit > 0) {
            console.log("INFO: New GET request to /builders");
            dbd.find({}).skip(offset).limit(limit).toArray((err, builders) => {
                if (err) {
                    console.error("WARNING 1: Error getting data offset DB");
                    res.sendStatus(500); //Internal server error
                }
                else {
                    var filtered = builders.filter((param) => {
                        if ((country == undefined || param.country == country) && (year == undefined || param.year == year) &&
                            (builder == undefined || param.builder == builder) && (pole == undefined || param.pole == pole) &&
                            (victory == undefined || param.victory == victory)) {
                            return param;
                        }
                    });
                    console.log("haciendo el filter" + filtered);
                }
                if (filtered.length > 0) {
                    elementos = insertar(filtered, elementos, offset, limit);
                    res.send(elementos.map((m)=>{
                        delete m._id;
                        return m;
                    }));
                }
                else {
                    console.log("WARNING 2: Error getting data offset DB");
                    res.sendStatus(404); //Not found
                    return
                }
            });
        }
        else {
            dbd.find({}).toArray(function(err, builders) {
                if (err) {
                    console.error("WARNING: Error getting data offset DB");
                    res.sendStatus(500); //Internal server error
                    return
                }
                else {
                    var filtered = builders.filter((param) => {

                        if ((country == undefined || param.country == country) && (year == undefined || param.year == year) &&
                            (builder == undefined || param.builder == builder) && (pole == undefined || param.pole == pole) &&
                            (victory == undefined || param.victory == victory)) {
                            return param;
                        }
                    });
                }

                if (filtered.length > 0) {
                    console.log("INFO: Sending stat: " + filtered);
                    res.send(filtered.map((m)=>{
                        delete m._id;
                        return m;
                    }));
                }
                else {
                    res.send(builders);
                }
            });
        }
    });

    //GET a un recurso
    app.get(BASE_API_PATH + "/builders/:year", (req, res) => {
        var year = req.params.year;
        if (!year) {
            console.log("WARNING: New GET request to /builders/:year without season, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log(Date() + " - GET /builders/" + year);
            dbd.find({ "year": parseInt(year) }).toArray((err, filteredBuilders) => {
                console.log("MOSTRANDO filteredBuilders" + filteredBuilders);
                if (err) {
                    console.error('WARNING: Error getting data offset DB');
                    res.sendStatus(500); // internal server error
                    return
                }
                else {
                    if (filteredBuilders.length > 0) {
                        console.log("INFO: Sending builders: " + JSON.stringify(filteredBuilders[0], 2, null));
                        res.send(filteredBuilders.map((m) =>{
                            delete m._id;
                            return m;
                        })[0]);
                    }
                    else {
                        console.log("WARNING: There are not any contact with year " + year);
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
        }
        else {
            console.log("INFO: New POST request to /builders with body: " + newBuilder);
            if (!newBuilder.country || !newBuilder.year || !newBuilder.builder || !newBuilder.pole || !newBuilder.victory) {
                console.log("WARNING: The newBuilder " + newBuilder + "is not well-formed, sending 422...");
                res.sendStatus(422); //bad request
            }
            else {
                dbd.find({ "year": newBuilder.year }).toArray((err, filteredBuilders) => {
                    if (err) {
                        console.log("WARNING: Error getting data offset DB");
                        res.sendStatus(500); //internal server error
                    }
                    else { //MIRAMOS QUE NO ESTE YA EN LA BASE DE DATOS
                        if (filteredBuilders.length > 0) {
                            console.log("WARNING: The builder " + newBuilder + " already exists, sending 409...");
                            res.sendStatus(409);
                        }
                        else {
                            console.log("INFO: Adding builder " + newBuilder);
                            dbd.insert(newBuilder);
                            res.sendStatus(201);
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
        dbd.remove({}, { multi: true }, function(err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error("WARNING: Error removing data offset DB");
                res.sendStatus(500);
            }
            else {
                if (numRemoved.n > 0) {
                    console.log("INFO: All the builders (" + numRemoved + ") have been succesfully deleted, sending 204...");
                    res.sendStatus(204); //no content
                }
                else {
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
            console.log("Entra 1");
            console.log("WARNING: New GET request to /builders/:year without season, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log("Entra 2");
            console.log(Date() + " - DELETE /builders/" + yearToRemove);
            dbd.remove({ "year": parseInt(yearToRemove) }, {}, (err, result) => {
                var numRemoved = JSON.parse(result);
                if (err) {
                    console.log("Entra 3");
                    console.error("WARNING: Error removing data offset DB");
                    res.sendStatus(500); //Internal server error
                }
                else {
                    console.log("Entra 4");
                    console.log("INFO: builder removed: " + numRemoved);
                    if (numRemoved.n == 1) {
                        console.log("Entra 5");
                        console.log("INFO: The builder with season " + yearToRemove + " has been succesfully deleted, sending 204...");
                        res.sendStatus(204); // no content
                    }
                    else {
                        console.log("Entra 6");
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
        var updateBuilder = req.body;

        console.log(Date() + " - PUT /builders/" + year);

        if (!updateBuilder || updateBuilder.year != year) {
            console.log("WARNING: New PUT request to /builders/ without builder or with year modified sending 400...");
            res.sendStatus(400); // bad request
            return
        }
        else {
            console.log("INFO: New PUT request to /builders/" + year + " with data " + updateBuilder);
            dbd.find({ "year": parseInt(year) }).toArray((err, filteredBuilders) => {
                if (err) {
                    console.error('WARNING: Error getting data offset DB');
                    res.sendStatus(500); // internal server error
                    return
                }
                else {
                    if (filteredBuilders.length > 0) {
                        dbd.update({ "year": parseInt(year) }, updateBuilder);
                        res.sendStatus(200); //Modified
                    }
                    else {
                        console.log("WARNING: There are not any contact with builder " + year);
                        res.sendStatus(404); // not found

                    }
                }

            });
        }
    });



    ////////////////////////////////////////MÉTODOS PARA APIKEY/////////////////////////////////////

    ////////////////////////////////////////INICIALIZAR EL CONJUNTO////////////////////////////////////////////////////////////////
    app.get(BASE_API_PATH_SECURE + "/builders/loadInitialData", function(req, res) {
        if (checkApiKeyFunction(req, res) == true) {
            var inicializacion = [{
                "country": "uk",
                "year": 1996,
                "builder": "williams",
                "pole": 12,
                "victory": 12
            },

            {
                "country": "germany",
                "year": 1998,
                "builder": "mercedes",
                "pole": 12,
                "victory": 9
            },

            {
                "country": "italy",
                "year": 1999,
                "builder": "ferrari",
                "pole": 3,
                "victory": 6
            }, 
            {
                "country": "italy",
                "year": 2004,
                "builder": "ferrari",
                "pole": 18,
                "victory": 15
            },

            {
                "country": "germany",
                "year": 2015,
                "builder": "mercedes",
                "pole": 18,
                "victory": 16
            }
            ];

            //BUSCAMOS EN LA ABSE DE DATOS Y OBETENEMOS UN ARRAY
            dbd.find({}).toArray((err, builders) => {
                //SI HAY ALGUN ERROR EN EL SERVIDOR, LANZAR ERROR
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    //SI HAY ELEMENTOS EN EL ARRAY, DEVOLVER QUE HAY DATOS EN LA BASE DE DATOS
                    if (builders.length > 0) {
                        console.log('INFO: DBD has ' + builders.length + ' results ');
                        res.sendStatus(409); //Already Data
                    }
                    else {
                        //SI LA BASE DE DATOS ESTÁ VACÍA LA INICIALIZAMOS
                        dbd.insert(inicializacion);
                        res.sendStatus(201); //created!


                        console.log("INFO: DataBase initialized.");
                    }
                }
            });
        }
    });

    /////////////////////////////////////////GET AL CONJUNTO DE RECURSOS/////////////////////////////////////////////
    app.get(BASE_API_PATH_SECURE + "/builders", function(req, res) {
        if (!checkApiKeyFunction(req, res)) return;
        //Date() es para que cuando hagamos un get nos muestre la fecha y hora del servidor 
        //y despues la coletilla GET /builders
        console.log(Date() + " - GET /builders");

        //variables de búsqueda
        var url = req.query;
        var country = url.country;
        var year = url.year;
        var builder = url.builder;
        var pole = url.pole;
        var victory = url.victory;

        //variables de paginación
        var to = parseInt(url.to);
        var offset = parseInt(url.offset);
        var elementos = [];


        if (offset > 0 && to > 0) {
            console.log("INFO: New GET request to /builders");
            dbd.find({}).skip(offset).limit(to).toArray((err, builders) => {
                if (err) {
                    console.error("WARNING 1: Error getting data offset DB");
                    res.sendStatus(500); //Internal server error
                }
                else {
                    var filtered = builders.filter((param) => {
                        if ((country == undefined || param.country == country) && (year == undefined || param.year == year) &&
                            (builder == undefined || param.builder == builder) && (pole == undefined || param.pole == pole) &&
                            (victory == undefined || param.victory == victory)) {
                            return param;
                        }
                    });
                    console.log("haciendo el filter" + filtered);
                }
                if (filtered.length > 0) {
                    elementos = insertar(filtered, elementos, offset, to);
                    res.send(elementos.map((m)=>{
                        delete m._id;
                        return m;
                    }));
                }
                else {
                    console.log("WARNING 2: Error getting data offset DB");
                    res.sendStatus(404); //Not found
                    return
                }
            });
        }
        else {
            dbd.find({}).toArray(function(err, builders) {
                if (err) {
                    console.error("WARNING: Error getting data offset DB");
                    res.sendStatus(500); //Internal server error
                    return
                }
                else {
                    var filtered = builders.filter((param) => {

                        if ((country == undefined || param.country == country) && (year == undefined || param.year == year) &&
                            (builder == undefined || param.builder == builder) && (pole == undefined || param.pole == pole) &&
                            (victory == undefined || param.victory == victory)) {
                            return param;
                        }
                    });
                }

                if (filtered.length > 0) {
                    console.log("INFO: Sending stat: " + filtered);
                    res.send(filtered.map((m)=>{
                        delete m._id;
                        return m;
                    }));
                }
                else {
                    res.send(builders);
                }
            });
        }
    });

    //GET a un recurso
    app.get(BASE_API_PATH_SECURE + "/builders/:year", (req, res) => {
        if (!checkApiKeyFunction(req, res)) return;
        var year = req.params.year;
        if (!year) {
            console.log("WARNING: New GET request to /builders/:year without season, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log(Date() + " - GET /builders/" + year);
            dbd.find({ "year": parseInt(year) }).toArray((err, filteredBuilders) => {
                console.log("MOSTRANDO filteredBuilders" + filteredBuilders);
                if (err) {
                    console.error('WARNING: Error getting data offset DB');
                    res.sendStatus(500); // internal server error
                    return
                }
                else {
                    if (filteredBuilders.length > 0) {
                        var build = filteredBuilders[0];
                        console.log("INFO: Sending builders: " + JSON.stringify(build, 2, null));
                        res.send(build);
                    }
                    else {
                        console.log("WARNING: There are not any contact with year " + year);
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    });

    //////////////////////////////////////POST AL CONJUNTO DE RECURSOS(AÑADE UN NUEVO RECURSO)/////////////////////////////////////////////
    app.post(BASE_API_PATH_SECURE + "/builders", (req, res) => {
        if (!checkApiKeyFunction(req, res)) return;
        var newBuilder = req.body;
        if (!newBuilder) {
            console.log("WARNING: New POST request to /builders/ without builders, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New POST request to /builders with body: " + newBuilder);
            if (!newBuilder.country || !newBuilder.year || !newBuilder.builder || !newBuilder.pole || !newBuilder.victory) {
                console.log("WARNING: The newBuilder " + newBuilder + "is not well-formed, sending 422...");
                res.sendStatus(422); //unprocessable entity
            }
            else {
                dbd.find({ "year": newBuilder.year }).toArray((err, filteredBuilders) => {
                    if (err) {
                        console.log("WARNING: Error getting data offset DB");
                        res.sendStatus(500); //internal server error
                    }
                    else { //MIRAMOS QUE NO ESTE YA EN LA BASE DE DATOS
                        if (filteredBuilders.length > 0) {
                            console.log("WARNING: The builder " + newBuilder + " already exists, sending 409...");
                            res.sendStatus(409);
                        }
                        else {
                            console.log("INFO: Adding builder " + newBuilder);
                            dbd.insert(newBuilder);
                            res.sendStatus(201);
                        }
                    }
                });
            }
        }
    });

    /////////////////////////////////POST A UN RECURSO (405 MÉTODO NO PERMITIDO)////////////////////////////////////////////////////////
    app.post(BASE_API_PATH_SECURE + "/builders/:year", (req, res) => {
        if(!checkApiKeyFunction(req,res))return;
        var year = req.params.year;
        console.log(Date() + " - POST /builders/" + year);
        res.sendStatus(405);
    });

    /////////////////////////////////////PUT AL CONJUNTO DE RECURSOS(405 METODO NO PERMITIDO)//////////////////////////////////////////
    app.put(BASE_API_PATH_SECURE + "/builders", (req, res) => {
        if(!checkApiKeyFunction(req,res))return;
        console.log(Date() + " - PUT /builders");
        //Method not allowed
        res.sendStatus(405);
    });

    ///////////////////////////////////DELETE al conjunto de recursos////////////////////////////////////////////////////
    app.delete(BASE_API_PATH_SECURE + "/builders", (req, res) => {
        if(!checkApiKeyFunction(req,res))return;
        console.log(Date() + " - DELETE /builders");
        dbd.remove({}, { multi: true }, function(err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error("WARNING: Error removing data offset DB");
                res.sendStatus(500);
            }
            else {
                if (numRemoved.n > 0) {
                    console.log("INFO: All the builders (" + numRemoved + ") have been succesfully deleted, sending 204...");
                    res.sendStatus(204); //no content
                }
                else {
                    console.log("WARNING: There are no contacts to delete");
                    res.sendStatus(404); // not found
                }
            }
        });
    });

    //////////////////////////////////////////////DELETE de un recurso//////////////////////////////////////////////////////////////////////////////
    app.delete(BASE_API_PATH + "/builders/:year", (req, res) => {
        if(!checkApiKeyFunction(req,res))return;
        var yearToRemove = req.params.year;
        if (!yearToRemove) {
            console.log("Entra 1");
            console.log("WARNING: New GET request to /builders/:year without season, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log("Entra 2");
            console.log(Date() + " - DELETE /builders/" + yearToRemove);
            dbd.remove({ "year": parseInt(yearToRemove) }, {}, (err, result) => {
                var numRemoved = JSON.parse(result);
                if (err) {
                    console.log("Entra 3");
                    console.error("WARNING: Error removing data offset DB");
                    res.sendStatus(500); //Internal server error
                }
                else {
                    console.log("Entra 4");
                    console.log("INFO: builder removed: " + numRemoved);
                    if (numRemoved.n == 1) {
                        console.log("Entra 5");
                        console.log("INFO: The builder with season " + yearToRemove + " has been succesfully deleted, sending 204...");
                        res.sendStatus(204); // no content
                    }
                    else {
                        console.log("Entra 6");
                        console.log("WARNING: There are no builders to delete");
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    });

    ///////////////////////////////////PUT A UN RECURSO (ACTUALIZA EL RECURSO)////////////////////////////////////////////////////
    app.put(BASE_API_PATH_SECURE + "/builders/:year", (req, res) => {
        if(!checkApiKeyFunction(req,res))return;
        var year = req.params.year;
        var updatedBuilder = req.body;

        console.log(Date() + " - PUT /builders/" + year);

        if (!updatedBuilder || updatedBuilder.year != year) {
            console.log("WARNING: New PUT request to /builders/ without builder or with year modified sending 400...");
            res.sendStatus(400); // bad request
            return
        }
        else {
            console.log("INFO: New PUT request to /builders/" + year + " with data " + updatedBuilder);
            dbd.find({ "year": parseInt(year) }).toArray((err, filteredBuilders) => {
                if (err) {
                    console.error('WARNING: Error getting data offset DB');
                    res.sendStatus(500); // internal server error
                    return
                }
                else {
                    if (filteredBuilders.length > 0) {
                        dbd.update({ "year": parseInt(year) }, updatedBuilder);
                        console.log("auqn da fallo lo modifica");
                        res.sendStatus(200); //Modified
                    }
                    else {
                        console.log("WARNING: There are not any contact with builder " + year);
                        res.sendStatus(404); // not found

                    }
                }

            });
        }
    });




}
