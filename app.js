//Import third-party
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Reequire db manger
var MongoClient = require('mongodb').MongoClient, assert = require('assert');


// Globals
var url = 'mongodb://localhost:27017/moviesBE';
const doDebug = true;

//---------------------------------------
//App definition
//---------------------------------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});


//---------------------------------------
//POST and GET Methods
//---------------------------------------

//Get Favorites
app.get('/favorites/get', function (req , res) { //request result
	// Connect to db
	MongoClient.connect( url , function (err , connection) {
		var db = connection.db( 'MoviesDB' );

		var collection = db.collection('FavoriteMovies');;

		//get mivies and callback
		collection.find({}).toArray(function(err, movies) {
			res.send(movies);
			connection.close();
		});
	} );
} );

//Add Favorite
app.post('/favorite/add', function (req , res) {
	// Connect db
	MongoClient.connect( url , function (err , connection) {

		var db = connection.db( 'MoviesDB' );

		var movie = {movie: req.body};

		var collection = db.collection('FavoriteMovies');

		collection.insertOne(movie);

		connection.close();
	} );
} );


//RemoveFavorite
app.post('/favorite/remove', function (req , res) { //request result
	// Connect to db
	MongoClient.connect( url , function (err , connection) {

		var db = connection.db( 'MoviesDB' );

		var movie = {movie: req.body};

		var collection = db.collection('FavoriteMovies');

		collection.deleteOne(movie);

		connection.close();

	} );
} );


//Add to History
app.post('/history/add', function (req) { //request result
	// Connect to db
	MongoClient.connect( url , function (err , connection) {
		var db = connection.db( 'MoviesDB' );

		var SearchHistory = {SearchHistory: req.body};

		var collection = db.collection('SearchHistory')

		//only add it, already proved by the page if already exists
		collection.insertOne(favMovie);

		connection.close();

	} );
} );

//Get history
app.get('/history/get', function (req , res) { //request result
	// Connect to db
	MongoClient.connect( url , function (err , connection) {

		var db = connection.db( 'MoviesDB' );

		var collection = db.collection('SearchHistory');

		//get mivies and callback
		collection.find({}).toArray(function(err, result) {
			res.send(result);
			connection.close();
		});
	} );
} );