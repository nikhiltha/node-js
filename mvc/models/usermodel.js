//import mongoose to use its functionalities with require keyword..........
var mongoose = require('mongoose');
//declare schema.........
var Schema = mongoose.Schema;
const validator=require('validator')
//create schema............
var user = new Schema({
  


    Title:
    {
      type:String
    },
//firstname of the user ............
  First_Name: 
   {   
       type:String
      
   },

   Last_Name:
   {
       type:String
   },

   //email of the admin for confirmation to register....
   
      email: {
        type: String,
        trim: true,
        lowercase: true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("email not valid")
            }
        }
            
    },
    

//password which is set by the admin 
   password:
   {
     type:String,
     required:true
     
    },


    D_O_B:
    {
      type:String
    },

    address:
    {
          type:String
    },

     
//contact to the user............
    phone_Number: 
    {
      type: String,
      
  
    },

    status:
    {
      type:String,
      enum:['active','inactive'],
      default:'active'
    }

},{timestamps:true}
);


 var Model=mongoose.model('userModel',user);
 module.exports=Model;