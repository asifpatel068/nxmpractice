const express=require("express");
const {UserModel}=require("../model/user.model")


var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRoute=express.Router()

userRoute.use(express.json())

userRoute.post("/register",async(req,res)=>{
    const {email,password,name,dob,role,location}=req.body
    try{
        bcrypt.hash(password, 5,async function(err, hash) {
            if(err){
                console.log(err)
            }else{
                const user =new UserModel({email,password:hash,name,dob,role,location})
                await user.save()
                console.log(user);
                res.send("Registered")
            }
            // Store hash in your password DB.
        });
        
    }catch(err){
        res.send("Error in Registered")
        console.log(err);
        
    }
    
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"msg":"Login success","token":token})
                }else{
                     res.send("Wrong Credentials")
                }
            });
        }else{
            res.send("Wrong Credentials")
        }
        
       
    }catch(err){
        res.send("something went wrong")
        console.log(err);
    }
   
})




module.exports={
    userRoute
   
}

