const mongoose=require("mongoose")

let tempDataSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    user:{
        type:String
    }
})

module.exports=mongoose.model("tempData",tempDataSchema)