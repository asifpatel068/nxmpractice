const express =require("express")
var cors = require('cors')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const {connection}=require("./config/db")
const {noteRoute}=require("./routes/notes.router")
const {userRoute}=require("./routes/user.router")
const {a}=require("./middleware/authenticate.middleware")
const app=express()

app.use(cors())
app.use(express.json())

app.use("/user",userRoute)
app.use(a)
app.use("/note",noteRoute)


app.get("/",async(req,res)=>{
    res.send("Home Page")
  
})

// app.get("/data",async(req,res)=>{
//     const token=req.headers.Authorization
    
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Invalid Token")
//             console.log(err) 
//         }else{
//              res.send("Data...")
//            // bar
//         }
        
//       });

// })

// app.get("/cart",async(req,res)=>{
//     const token=req.query.token
//     if(token=="abc123"){
//       res.send("cart Page")   
//     }else{
//         res.send("login first")
//     }
  
// })

// app.get("/contact",async(req,res)=>{
//     res.send("contact Page")
  
// })




app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to db")
    }catch(err){
        console.log(err)
        console.log("Not connected to db")
    }
    console.log("Server is Running")
})