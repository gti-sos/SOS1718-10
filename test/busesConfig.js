exports.config={
    
    seleniumAddress:'http://localhost:8910',
    
    specs:['T01-loadDataBuses.js','T02-addBuses.js'],
    
    capabilities:{
        'browserName':'phantomjs'
    }
    
}