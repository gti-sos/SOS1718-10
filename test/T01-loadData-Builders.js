/*global browser*/
/*global by*/
/*global element*/
/*global expect*/
var fs = require('fs');
var path = require('path');
var config = require("./configBuilders");

describe('Data is loaded', function(){
    it('should show some builders', function(){
        browser.
            get(config.getAppUrl() + "/#!/builders")
            .then(function(){
                element.all(by.repeater('builder in builders'))
                .then(function (builders) {
                    expect(builders.length).toBeGreaterThan(0);
                    
                });
            });
    });
});