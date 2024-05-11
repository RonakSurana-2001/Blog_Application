const mongoose = require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,"title is required"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        require:[true,'user id is required']
    }
})


module.exports=mongoose.model("blog",blogSchema)