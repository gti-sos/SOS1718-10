/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
/*global protractor*/

var fs = require("fs");
var path = require("path");
var config = require("./motoConfig")


describe('Add pilot', function() {
    it('should add a new pilot', function() {
        browser
            .get(config.getAppUrl()+"/#!/motogp-stats")
            .then(function() {
                element.all(by.repeater('pilot in pilots')).then(function(initialPilots) {

                    element(by.model('newPilot.year')).sendKeys(2020);
                    element(by.model('newPilot.pilot')).sendKeys('paco-lee');
                    element(by.model('newPilot.country')).sendKeys('spain');
                    element(by.model('newPilot.score')).sendKeys('500');
                    element(by.model('newPilot.age')).sendKeys('24');

                    element(by.buttonText('Add')).click().then(function() {
                        element.all(by.repeater('pilot in pilots')).then(function(finalPilots) {
                            expect(finalPilots.length).toBeGreaterThan(initialPilots.length);
                        });
                    });
                });
            });
    });

});
