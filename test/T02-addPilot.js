/*global element*/
/*global by*/
/*global browser*/
/*global expect*/

var config = require("./motoConfig")


describe('Add pilot', function () {
    it('should add a new pilot', function(){
        browser.get(config.getAppUrl());
        
        element.all(by.repeater('pilot in pilots')).then(function(initialPilots){
            
            element(by.model('newPilot.year')).sendKeys(2020);
            element(by.model('newPilot.pilot')).sendKeys('paco-lee');
            element(by.model('newPilot.country')).sendKeys('spain');
            element(by.model('newPilot.score')).sendKeys('500');
            element(by.model('newPilot.age')).sendKeys('24');
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('pilot in pilots')).then(function(pilots){
                    expect(pilots.length).toEqual(initialPilots.length+1);
                });
                    
            });
        });
    });
});