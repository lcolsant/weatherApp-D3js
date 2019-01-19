

var express = require("express");

const port = process.env.PORT || 8000;


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