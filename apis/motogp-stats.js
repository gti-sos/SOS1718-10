var exports = module.exports = {};

exports.register = function(app, dbp, BASE_API_PATH) {

    /////////////////////////////////////// INICIALIZAR EL CONJUNTO ///////////////////////////////////////////////////////////////////////
    app.get(BASE_API_PATH + "/motogp-stats/loadInitialData", function(req, res) {
        if (checkApiKeyFunction(request, response) == true) {
            var inicializacion = [{
                    "year": 2017,
                    "pilot": "marc-marquez",
                    "country": "spain",
                    "score": 298,
                    "age": 24
                },
                {
                    "year": 2016,
                    "pilot": "marc-marquez",
                    "country": "spain",
                    "score": 298,
                    "age": 23
                },
                {
                    "year": 2015,
                    "pilot": "jorge-lorezo",
                    "country": "spain",
                    "score": 330,
                    "age": 28
                },
                {
                    "year": 2014,
                    "pilot": "marc-marquez",
                    "country": "spain",
                    "score": 362,
                    "age": 21
                },
                {
                    "year": 2013,
                    "pilot": "marc-marquez",
                    "country": "spain",
                    "score": 334,
                    "age": 20
                },
                {
                    "year": 2012,
                    "pilot": "jorge-lorezo",
                    "country": "spain",
                    "score": 350,
                    "age": 25
                },
                {
                    "year": 2011,
                    "pilot": "casey-stoner",
                    "country": "australia",
                    "score": 350,
                    "age": 25
                },
                {
                    "year": 2010,
                    "pilot": "jorge-lorezo",
                    "country": "spain",
                    "score": 383,
                    "age": 23
                },
                {
                    "year": 2009,
                    "pilot": "valentino-rossi",
                    "country": "italy",
                    "score": 306,
                    "age": 30
                }
            ];

            /// BUSCAMOS EN LA BASE DE DATOS Y OBTENEMOS UN ARRAY
            dbp.find({}).toArray(function(err, motogpStats) {
                /// SI HAY ALGUN ERROR EN EL SERVIDOR, LANZAR ERROR
                if (err) {
                    res.sendStatus(500); /// Internal server error
                }
                else {
                    /// SI HAY ELEMENTOS EN EL ARRAY, DEVOLVER QUE HAY DATOS EN LA BASE DE DATOS
                    if (motogpStats.length > 0) {
                        console.log(' INFO: dbp has ' + motogpStats.length + ' results ');
                        res.sendStatus(409); //Already Data
                    }
                    else {
                        /// SI LA BASE DE DATOS ESTÁ VACÍA LA INICIALIZAMOS
                        dbp.insert(inicializacion);
                        res.sendStatus(201); //created!
                        console.log(" INFO: DataBase initialized. ");
                    }
                }
            });

        }
    });

    ///////////////////////////////////////// GET AL CONJUNTO DE RECURSOS /////////////////////////////////////////////

    app.get(BASE_API_PATH + "/motogp-stats", (req, res) => {
        /// Date() es para que cuando hagamos un get nos muestre la fecha y hora del servidor
        /// y despues la coletilla GET /motogp-stats
        console.log(Date() + " - GET /motogp-stats");
        dbp.find({}).toArray(function(err, motogpStats) {
            if (err) {
                console.error("WARNING: Error getting fata from DB");
                res.sendStatus(500); /// Internal server error
            }
            else {
                res.send(motogpStats.map((m) => {
                    delete m._id;
                    return m;
                }));
            }

        });

    });

    /////////////////////////////////////////////////// GET a un recurso ////////////////////////////////////////////////////////////////////
    app.get(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
        var year = req.params.year;
        if (!year) {
            console.log("WARNING: New GET request to /motogp-stats/:year without season, sending 400...");
            res.sendStatus(400); /// bad request
        }
        else {
            console.log(Date() + " - GET /motogp-stats/" + year);
            dbp.find({ "year": parseInt(year) }).toArray(function(err, filteredMotogpStats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); /// internal server error
                }
                else {
                    if (filteredMotogpStats.length > 0) {
                        console.log(" INFO: Sending motogp-stats: " + JSON.stringify(filteredMotogpStats[0], 2, null));
                        res.send(filteredMotogpStats.map((m) => {
                            delete m._id;
                            return m;
                        })[0]);

                    }
                    else {
                        console.log("WARNING: There are not any contact with motogp-stats" + year);
                        res.sendStatus(404); /// not found
                    }
                }
            });

        }

    });

    /////////////////////////////////// POST AL CONJUNTO DE RECURSOS (AÑADE UN NUEVO RECURSO) /////////////////////////////////////////////////
    app.post(BASE_API_PATH + "/motogp-stats", (req, res) => {
        var newPilot = req.body;
        if (!newPilot) {
            console.log("WARNING: New POST request to /motogp-stats/ without motogp-stats, sending 400...");
            res.sendStatus(400); /// bad request
        }
        else {
            console.log("INFO: New POST request to /motogp-stats with body: " + JSON.stringify(newPilot, 2, null));
            if (!newPilot.year || !newPilot.pilot || !newPilot.country || !newPilot.age || !newPilot.score) {
                console.log("WARNING: The newPilot " + JSON.stringify(newPilot, 2, null) + "is not well-formed, sending 422...");
                res.sendStatus(422); /// unprocessable entity
            }
            else {
                dbp.find({ "year": newPilot.year }).toArray((err, filteredPilots) => {
                    if (err) {
                        console.log("WARNING: Error getting data from DB");
                        res.sendStatus(500); /// internal server error
                    }
                    else { /// MIRAMOS QUE NO ESTE YA EN LA BASE DE DATOS
                        if (filteredPilots.length > 0) {
                            console.log("WARNING: The pilot " + JSON.stringify(newPilot, 2, null) + "already exists, sending 409...");
                            res.sendStatus(409);
                        }
                        else {
                            console.log("INFO: Adding pilot " + JSON.stringify(newPilot, 2, null));
                            dbp.insert(newPilot);
                            res.sendStatus(201); /// Created
                        }
                    }
                });
            }
        }
    });

    ////////////////////////////////////// PUT AL CONJUNTO DE RECURSOS (405 METODO NO PERMITIDO) /////////////////////////////////////////
    app.put(BASE_API_PATH + "/motogp-stats", (req, res) => {
        console.log(Date() + " - PUT /motogp-stats");
        /// Method not allowed
        res.sendStatus(405);
    });

    ///////////////////////////////////// DELETE al conjunto de recursos /////////////////////////////////////////////////////////////////
    app.delete(BASE_API_PATH + "/motogp-stats", (req, res) => {
        console.log(Date() + " - DELETE /motogp-stats");
        dbp.remove({}, { multi: true }, function(err, result) {
            var numRemoved = JSON.parse(result)
            if (err) {
                console.error("WARNING: Error removing data from DB");
                res.sendStatus(500);
            }
            else {
                if (numRemoved.n > 0) {
                    console.log("INFO: All the motogp-stats (" + numRemoved + ") have been succesfully deleted, sending 204 ...");
                    res.sendStatus(204); /// no content
                }
                else {
                    console.log("WARNING: There are no contacts to delete");
                    res.sendStatus(404); /// not found
                }
            }
        });
    });

    ///////////////////////////////////////// DELETE de un recurso //////////////////////////////////////////////////////////////////
    app.delete(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
        var yearToRemove = req.params.year;
        if (!yearToRemove) {
            console.log("WARNIN: New GET request to /motogp-stats/:year without season, sending 400...");
            res.sendStatus(400); /// bad request
        }
        else {
            console.log(Date() + " - DELETE /motogp-stats/" + yearToRemove);
            dbp.remove({ "year": parseInt(yearToRemove) }, {}, (err, result) => {
                var numRemoved = JSON.parse(result);
                if (err) {
                    console.error("WARNING: Error removing data from DB");
                    res.sendStatus(500); /// Internal server error
                }
                else {
                    console.log("INFO: pilot removed: " + numRemoved);
                    if (numRemoved.n == 1) {
                        console.log("INFO: the pilot with season" + yearToRemove * " has been succesfully deleted, sending 2014...");
                        res.sendStatus(204); /// no content
                    }
                    else {
                        console.log("WARNING: There are no pilots to delete");
                        res.sendStatus(404); /// not found
                    }
                }
            });
        }
    });

    ///////////////////////////////////////// POST A UN RECURSO (405 MÉTODO NO PERMITIDO) ////////////////////////////////////////////////////
    app.post(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
        var year = req.params.year;
        console.log(Date() + " - POST /motogp-stats/" + year);
        res.sendStatus(405);
    });

    ///////////////////////////////////////// PUT A UN RECURSO (ACTUALIZA EL RECURSO) ///////////////////////////////////////////////////////
    app.put(BASE_API_PATH + "/motogp-stats/:year", (req, res) => {
        var year = req.params.year;
        var updatePilot = req.body;

        console.log(Date() + " - PUT /motogp-stats/" + year);

        if (!updatePilot) {
            console.log("WARNING: New PUT requst to /motogp-stats/ without builder, sending 400..");
            res.sendStatus(400); ///bad request
            return;
        }
        else {
            console.log("INFO: New PUT request to /motogp-stats/" + year + "with data" + updatePilot);
            if (updatePilot.year != year) {
                console.log("WARNING: New PUT request to /motogp-stats/ with diferent season, sending 400..");
                res.sendStatus(409); /// conflict
            }
            else {
                dbp.find({ "year": parseInt(year) }).toArray((err, filteredPilots) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); /// internal server error
                        return
                    }
                    else {
                        if (filteredPilots.length > 0) {
                            dbp.update({ "year": parseInt(year) }, updatePilot);
                            res.sendStatus(200); /// Modifica!
                        }
                        else {
                            console.log("WARNING: there are not any contact with pilot" + year);
                            res.sendStatus(404); /// not found
                        }
                    }
                });
            }
        }
    });
}
