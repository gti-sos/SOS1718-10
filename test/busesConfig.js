exports.config={
    
    seleniumAddress:'http://localhost:8910',
    
    specs:['T00-apiBuses.js' ,'T01-loadDataBuses.js','T02-addBuses.js'],
    
    capabilities:{
        'browserName':'phantomjs'
    },
    
    params:{
        host:'localhost',
        port:'8080'
    }
    
};

exports.getAppUrl=function(){
    return "http://"+browser.params.host+":"+browser.params.port;
}