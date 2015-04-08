var express = require('express');
var app = express();

var rootDir = __dirname;

app.get('/build/(*)', function(req, res) {
  var path = rootDir + '/build/' + req.params[0];
  res.sendFile(path);
});

app.get('/source/(*)', function(req, res) {
  var path = rootDir + '/source/' + req.params[0];
  res.sendFile(path);
});


app.get('/bower_components/(*)', function(req, res) {
  var path = rootDir + '/bower_components/' + req.params[0];
  res.sendFile(path);
});

app.get('*', function(req, res) {
  res.sendFile(rootDir + '/source/index.html');
});


port = 3000;

var server=app.listen(port,function(){
  console.log("We have started our server on port " + port);
});
