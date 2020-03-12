//import dbconnection file using require keyword of global object..make in db connection file...
require("./dbconnection.js");

//import express module using require keyword....
var express= require ('express');
var app = express();

//import body-parser using require keyword...
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('uploads/'));
//import routes.js file in server file by require keyword....
var routes = require("./MVC/ROUTES/adminroute.js");
var routes1=require("./MVC/ROUTES/userroute.js");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(routes);
app.use(routes1);
app.use((req,res,next) =>
{
    const err=new err();
    err.message='mongo error';
    err.status=400;
    next(err);
    

})

app.use((req,res,next) =>
{
    const err=new err();
    err.message='authorzation error';
    err.status=401.1;
    next(err);
})






app.listen(9000);
console.log("server is running..........");


