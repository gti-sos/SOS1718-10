/*global browser*/


exports.config = {

    seleniumAddress: 'http://localhost:8910', //dirección del navegador al que (protractor) le va a lanzar las pruebas (phantomjs)

    specs: ['T00-loadApiMotogp.js', 'T01-loadDataPilot.js', 'T02-addPilots.js'], // array con los test a lanzar

    capabilities: { // tipo de navegador que voy a usar
        'browserName': 'phantomjs'
    },

    params: {
        host: 'localhost',
        port: '8080'
    }

};

exports.getAppUrl = function() {
    return "http://" + browser.params.host + ":" + browser.params.port;
};
