/*global browser*/
/*global by*/
/*global element*/
/*global expect*/

var fs = require("fs");
var path = require("path");

describe ('Data is loaded', function(){
    it('should show some pilots', function(){
        browser.get('https://sos171810fgg-sandbox-sos171810fgg.c9users.io').then(function(){
            element.all(by.repeater('pilot in pilots')).then(function(pilots){
                browser.takeScreenshot().then(function(png){
                    
                    var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                    stream.write(new Buffer(png,'base64'));
                    stream.end();
                });
                
                expect(pilots.length).toBeGreaterThan(0);
                
            });
        });
        
    });
});