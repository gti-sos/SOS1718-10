/*global element*/
/*global by*/
/*global browser*/
/*global expect*/

describe('Add pilot', function(){
    it('should add a new builder', function(){
        browser.get('htpps://sos1718-10.herokuapp.com/#!/motogp-stats');
        
        element.all(by.repeater('pilot in pilots')).then(function(initialPilots){
            
            element(by.model('newPilot.year')).sendKeys(2019);
            element(by.model('newPilot.pilot')).sendKeys('paco-lee')
            element(by.model('newPilot.country')).sendKeys('spain');
            element(by.model('newPilot.score')).sendKeys('500');
            element(by.model('newPilot.age')).sendKeys('24');
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('pilot in pilots')).then(function(pilots){
                    expect(pilots.length).toEqual(initialPilots.length+1)
                });
            });
            
        });
    });
});