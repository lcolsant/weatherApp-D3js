

var express = require("express");
// var d3 = require('d3');
// const jsdom = require('jsdom')
// const { JSDOM } = jsdom;

// var document = jsdom.jsdom();
// svg = d3.select(document.body).append('hello world');
// d3.select(document.body).append('hello world');



// var request = require('request');
let port = 8000;
// var api_data;
// var api_forecast;


var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


require('./routes/routes.js')(app);

app.listen(port, function(){
    console.log(`listening on port ${port}.`);
})