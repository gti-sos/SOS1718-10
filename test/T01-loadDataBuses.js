var fs = require("fs");
var path = require("path");
var config=require('./busesConfig');


describe('Data is loaded', function() {
    it('should show some buses', function() {
        browser.get(config.getAppUrl()+"/#!/buses").then(function() {
            element.all(by.repeater('bus in buses')).then(function(buses) {
                expect(buses.length).toBeGreaterThan(0);

            });

        });


    });

});
