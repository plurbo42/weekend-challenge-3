var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todo = require('./routes/todo')

var port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.listen(port, function(){
    console.log('listening on port ', port);
});

app.use('/todo', todo);