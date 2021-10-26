var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');

process.chdir("swagger/lifeplus/");

var root = YAML.load(fs.readFileSync('index.yaml').toString());
var options = {
  filter        : ['relative', 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.load(res.text));
    }
  }
};
resolve(root, options).then(function (results) {
  var jresult = JSON.stringify(results.resolved, null, 2);
  
  console.log(jresult);
  fs.writeFile("../../docs/lifeplus_server.json", jresult, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The api documentation was updated!");
  });
});
