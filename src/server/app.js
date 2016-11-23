var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var bodyParser = require("body-parser");

/**
 * Using additional modules
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/**
 * server port listening
 */
app.listen(8000);
