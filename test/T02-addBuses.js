var fs = require("fs");
var path = require("path");
var config = require("./busesConfig")




describe('Add buses', function () {
    it('should add a new bus', function(){
        browser.get(config.getAppUrl()+"/#!/buses");
        
        element.all(by.repeater('bus in buses')).then(function(initialBuses){
            
            element(by.model('newBuses.community')).sendKeys('miami');
            element(by.model('newBuses.year')).sendKeys('2020');
            element(by.model('newBuses.month')).sendKeys('november');
            element(by.model('newBuses.occupation')).sendKeys('9');
            element(by.model('newBuses.transportedTraveler')).sendKeys('23423');
            element(by.model('newBuses.country')).sendKeys('Spain');
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('bus in buses')).then(function(buses){
                    expect(buses.length).toEqual(initialBuses.length+1);
                });
                    
            });
        });
    });
});