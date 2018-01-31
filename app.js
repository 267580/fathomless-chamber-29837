var express = require('express');
var app = express();
var db = require('./db');

var RecordController = require('./RecordController');
app.use('/records', RecordController);

app.set('json spaces', 4); //intendancja dla json-a

module.exports = app;
