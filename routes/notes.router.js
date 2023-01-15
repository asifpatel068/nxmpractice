const express=require("express");
const {NoteModel}=require("../model/notes.model")

const noteRoute=express.Router()

noteRoute.use(express.json())

noteRoute.post("/create",async(req,res)=>{
    
    try{
        const data =req.body
        const note=new NoteModel(data);
        await note.save()
        console.log(note)
        res.send(note)
    }catch(err){
        console.log(err)
    }
})

noteRoute.get("/",async(req,res)=>{
    try{
        const data =req.query
        const note= await NoteModel.find(data)
        
        console.log(note)
        res.send(note)
    }catch(err){
        console.log(err)
    }
})

noteRoute.patch("/:id",async(req,res)=>{
      const data =req.body
      const id =req.params.id
      const note=await NoteModel.findOne({"_id":id})
      const userID_in_note=note.userID
      const userID_making_req=req.body.userID

    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not autorized"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:id},data)
            res.send("Data Updated")
        }

    }
    catch(err){
        console.log(err)
        res.send("Somthing went wrong")
    }
})

noteRoute.put("/:id",async(req,res)=>{
    try{
        const data =req.body
        const id =req.params.id
        const note= await NoteModel.findOneAndReplace({_id:id},data)
        
        console.log(note)
        res.send("Data Updated")
    }catch(err){
        console.log(err)
    }
})


noteRoute.delete("/:id",async(req,res)=>{
    try{
        
        const id =req.params.id
        const note= await NoteModel.findByIdAndDelete({_id:id})
        console.log(note)
        res.send("Data Deleted")
    }catch(err){
        console.log(err)
    }
})



module.exports={
    noteRoute
   
}
