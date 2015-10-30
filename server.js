//Lets require/import the HTTP module
var express = require('express');
var serveStatic = require('serve-static');

//Lets define a port we want to listen to
const PORT=3000;

//start server
var app = express();
app.use(serveStatic('app', {'index': ['index.html', 'index.htm']}));
app.listen(PORT);