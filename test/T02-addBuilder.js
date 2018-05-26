describe('Add builder', function () {
    it('should add a new builder', function(){
        browser.get('https://sos1718-10.herokuapp.com/#!/builders');
        
        element.all(by.repeater('builder in builders')).then(function(initialBuilders){
            
            element(by.model('newBuilder.country')).sendKeys('italy');
            element(by.model('newBuilder.year')).sendKeys('2000');
            element(by.model('newBuilder.builder')).sendKeys('ferrari');
            element(by.model('newBuilder.pole')).sendKeys('5');
            element(by.model('newBuilder.victory')).sendKeys('14');
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('builder in builders')).then(function(builders){
                    expect(builders.length).toEqual(initialBuilders.length+1);
                });
                    
            });
        });
    });
});