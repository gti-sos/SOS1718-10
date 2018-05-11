/*global browser*/
/*global by*/
/*global element*/
/*global expect*/
describe('Data is loaded', function(){
    it('should show some builders', function(){
        browser.
            get('https://sos1718-10.herokuapp.com/builders/front/#!/')
            .then(function(){
                element.all(by.repeater('builder in builders'))
                .then(function (builders) {
                    expect(builders.length).toBeGreaterThan(0);
                    
                });
            });
    });
});