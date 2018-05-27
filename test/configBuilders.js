/*global browser*/
exports.config = {
    seleniumAddress: 'http://localhost:8910', 
    specs: ['T00-apiBuilders.js','T01-loadData-Builders.js', 'T02-addBuilder.js'], //test
    capabilities: { 
        //Con esto le decimos el navegador que usaremos para ejecutar las pruebas
        'browserName' : 'phantomjs'
    },
    
    params: {
        host: 'localhost',
        port: '8080'
    }
};

exports.getAppUrl = function(){
    return "http://" + browser.params.host + ":" + browser.params.port;
}