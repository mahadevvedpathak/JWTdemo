require('use-strict');
var connect = require('connect');
var app = connect();
var path = require('path');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var port = process.env.PORT || 4000;



// Define the web folder connect and router
var public = connect();
var assets = connect();

var app = require('./api/api');


public.use(serveStatic('public'));
app.use('/',public);

assets.use(serveStatic('assets'));
app.use('/assets',assets);


global.appRoot = path.resolve(__dirname);

app.listen(port);
console.log('Magic happens at port : ' + port);