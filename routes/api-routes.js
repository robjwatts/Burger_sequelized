var db = require("../models");

// Routes
// =============================================================
module.exports = function(app){

	//GET route
	app.get('/api/burgers', function(req,res){
		// res.json({hi:"hello"});
		db.Burger.findAll({}).then(function(results){
			res.json(results);
			console.log(results);
		});
	});

	app.post('/', function(req,res){
		console.log("Burger Data: ");
		console.log(req.body);
		db.Burger.create({
			burger_name: req.body.burger_name, 
			devoured: req.body.complete,
			createdAt:req.body.createdAt,
			updatedAt:req.body.updatedAt,
		}).then(function(dbBurger){
			res.redirect("/")
		});
	});

	app.put("/:id", function(req,res){
		console.log("Updated: ");
		db.Burger.update({
			burger_name: req.body.burger_name, 
			devoured: req.body.complete,
		},{
			where:{
				id:req.params.id
			}
		}).then(function(results){
			res.json(dbBurger);
		});
	});

	app.put("/:id", function(req,res){
		console.log("Updated: ");
		db.Burger.update({
			burger_name: req.body.burger_name, 
			devoured: req.body.complete,
		},{
			where:{
				id:req.params.id
			}
		}).then(function(results){
			res.json(dbBurger);
		});
	})
};