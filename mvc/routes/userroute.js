//import express using require keyword....
var express= require ('express');
//import Router with express to use the functionality of router.....
var router = express.Router();



//define a variable and assign the path of the user_controller in it......
var ctr=require("../CONTROLLER/usercontroller.js");

var userverify=require('../usertoken');

//post api used for register or sign up.......
router.post("/usersignup",ctr.userSignup);

console.log("send to user signup controller..........");

//post api for login..........
router.post("/userlogin",ctr.userLogin);

console.log("send to user login controller........")






//export the router using module.exports for further use of router in other files.....
module.exports = router;