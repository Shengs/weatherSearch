// Set up app and modules
var express = require("express");
var path = require('path');
var http = require('http');
var app = express();

// Setup Server
var server = http.createServer(app);

// Use angular components in public folder
app.use(express.static('public'));

// Initial the Index view
app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/public/pages/index.html'));
});

// Set up access port
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});