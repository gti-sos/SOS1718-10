/*global browser*/

exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    
    specs: ['T01-loadDataMotoGPstats.js', 'T02-addPilotGP.js'],
    
    capabilites:{
        
        'browserName' : 'phantomjs'
    }
    
};