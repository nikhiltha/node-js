const Model=require('../MODELS/usermodel.js');
const jwt=require("jsonwebtoken")
const Bcrypt = require("bcryptjs");

module.exports.userSignup =function  (req,res,next) 
    {
        console.log(req.body)
        Model.findOne({email:req.body.email})
        .exec()
        .then(user =>
            {
                if(user)
                   {
                       return res.status(409).json({
                           message:"mail already exists.."
                       });
                   }
                    else  
                      {
                          Bcrypt.hash(req.body.password,10,(err,hash)=>
                          {
                              if(err){return res.status(500).json({
                                  error:err
                              });
                            }
                              else 
                                 {
                                     const userModel =new Model({
                                        // _id:new mongoose.Types.ObjectId(),
                                        Title:req.body.Title,
                                         First_Name:req.body.First_Name,
                                         Last_Name:req.body.Last_Name,
                                         email:req.body.email,
                                         password:hash ,
                                         D_O_B:req.body.D_O_B,
                                         address:req.body.address,
                                         phone_Number:req.body.phone_Number                                      
                                     });

                                      userModel
                                      .save()
                                      .then(result =>{
                                          console.log(result);
                                          res.status(201).json({
                                              message:"user created"
                                          });
                                      })
                                      .catch(err =>{
                                          console.log(err);
                                          res.status(500).json({
                                              error:err
                                          });
                                      })

                                 }
                          })
                      }
            })

    }





    
module.exports.userLogin=function (request,response,next)
{
    console.log("welcome to login");
    // console.log(request.body.email);
    // console.log(request.body.password);
    Model.find({email: request.body.email})

    .exec()
  
    .then(user =>
        {
           
            if(user.length <1)
            {
                return response.status(409).json({
                    message:"mail not found.."
                });
            }
            Bcrypt.compare(request.body.password,user[0].password,(err,result)=>
            {
                if(err)
                {
                    return response.status(401).json(
                    {message:"auth failed"})
                }
                if(result)
                {
                    const token =jwt.sign(
                          {
                            email:user[0].email,
                            user_id:user[0]._id
                          },
                  
                        "securitytoken",
                               {
                                   expiresIn:"1h"
                               }
                    );
                    console.log(result)
                    return response.status(200).json(
                        {message:"login success",
                        token:token})
                }
                response.status(401).json(
                    {message:"password not match.."});
            });
        })
        
    .catch(err =>{
        console.log(err);
        response.status(500).json({
            error:err
        })
    })
 
}


