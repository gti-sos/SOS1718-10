/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var fs = require("fs");
var path = require("path");
var config = require("./motoConfig")

describe('Data is loaded', function() {
   it('should show some pilots', function() {
      browser
         .get(config.getAppUrl()+"/#!/motogp-stats")
         .then(function() {
            element.all(by.repeater('pilot in pilots'))
               .then(function(pilots) {
                  expect(pilots.length).toBeGreaterThan(0);
               });

         });

   });
});
