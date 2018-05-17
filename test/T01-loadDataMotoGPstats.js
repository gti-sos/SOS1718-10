/*global browser*/
/*global by*/
/*global element*/
/*global expect*/

var fs = require("fs");
var path = require("path");

describe('Data is loaded' , function(){
    it('should show some pilots', function(){
        browser.get('https://sos1718-10.herokuapp.com/#!/motogp-stats').then(function(){
            element.all(by.repeater('pilot in pilots')).then(function(pilots){
                expect(pilots.length).toBeGreaterThan(0);
            });
        });
    });
});