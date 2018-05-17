/*global browser*/
/*global by*/
/*global element*/
/*global expect*/

var fs = require("fs");
var path = require("path");
var config = require("./motoConfig")

describe ('Data is loaded', function(){
    it('should show some pilots', function(){
        browser.get(config.getAppUrl()).then(function(){
            element.all(by.repeater('pilot in pilots')).then(function(pilots){
                browser.takeScreenshot().then(function(png){
                    
                    var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01-motogp.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
                
                expect(pilots.length).toBeGreaterThan(0);
                
            });
        });
        
    });
});