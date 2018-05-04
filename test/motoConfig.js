exports.config = {
    
    seleniumAddress: 'http://localhost:8910' ,
    
    specs: ['T01-loadDataMotoGP.js', 'T02-addPilot.js'],
    
    capabilities:{
        
        'browserName' : 'phantomjs'
    }
}