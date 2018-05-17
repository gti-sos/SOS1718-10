/*global browser*/

exports.config = {
    
    seleniumAddress: 'http://localhost:8910' ,
    
    specs: ['T01-loadDataMotoGP.js', 'T02-addPilot.js'],
    
    capabilities:{
        
        'browserName' : 'phantomjs'
   },

    params: {
        host: 'localhost',
        port: '8080'
    }

};

exports.getAppUrl = function() {
    return "http://" + browser.params.host + ":" + browser.params.port;
};
