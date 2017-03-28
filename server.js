//DEPENDENCIES
//=================================================================================
//REQUIRE:
//express
var express = require("express");
//body-parser
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


var db = require("./models");
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json" }));

app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

// Static directory
app.use(express.static("./public"));

// Routes =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



