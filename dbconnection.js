//import mongoose using require keyword........
var mongoose = require('mongoose');
//creating db connection by mongoose.connect.,.......with dbName userInfo....
mongoose.connect('mongodb://localhost/product',{ useUnifiedTopology: true ,useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected to database.....");
});