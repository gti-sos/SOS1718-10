/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var newman = require("newman");
var path = require("path");


describe('API should work is loaded', function() {

   newman.run({
      collection: require(path.join(process.cwd(),"test","SOS1718-10 motogp-stats.postman_collectionB.json")),
      reporters: "cli"

   }, function(err) {
      if (err)
         throw err;
      else
         console.log("Collection run compete!")
   });

});
