
var jwt = require('jsonwebtoken');

const a=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.send("Please Login First")
        }
    }else{
        res.send("Please Login First")
    }
}

module.exports={
    a
}