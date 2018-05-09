var fs = require("fs");
var path = require("path");


describe('Data is loaded', function() {
    it('should show some buses', function() {
        browser.get('https://sos1718-10.herokuapp.com/buses/front/#!/').then(function() {
            element.all(by.repeater('bus in buses')).then(function(buses) {

                browser.takeScreenshot().then(function(png) {
                    var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T01-buses.png'));
                    stream.write(new Buffer(png, 'base64'));
                    stream.end();

                });

                expect(buses.length).toBeGreaterThan(0);

            });

        });


    });

});
