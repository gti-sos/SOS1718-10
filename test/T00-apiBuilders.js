/*global browser*/
/*global by*/
/*global element*/
/*global expect*/
var newman = require('newman');
var path = require('path');

describe('Api should works', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"test","sos1718-builders-backend-tests.postman_collection.json")),
        reporters: "cli"
    }, function(err){
        if(err){
            throw err;
            
        }else{
            console.log("Collection run complete!");
        }
    });
        
});