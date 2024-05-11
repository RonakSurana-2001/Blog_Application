const express=require("express")
const blogModel = require("../models/blogModel")
const userModel=require("../models/User")
const mongoose=require("mongoose")

const { route } = require("./user")

const router=express.Router()

router.get("/all-blog",async(req,res)=>{
    try{
        const blogs=await blogModel.find({}).populate("user")
        // console.log(blogs)
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No Blogs Found"
            })
        }
        return res.status(200).send({
            success:true,
            blogCount:blogs.length,
            message:"All blogs lists",
            blogs
        })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while getting blogs",
            error
        })
    }
})

router.post("/create-blog",async(req,res)=>{
    try{
        const {title,description,image,user}=req.body
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:"please provide all field"
            })
        }

        const existingUser=await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }

        const newBlog=new blogModel({
            title,description,image,user
        })
        const session=await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()
        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:'Blog Created',
            newBlog
        })
    } catch(error)
    {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while creating blog",
            error
        })
    }
})

router.get("/get-blog/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const blogs=await blogModel.findById(id)
        if(!blogs){
            return res.status(404).send({
                success:false,
                message:"No Blogs Found"
            })
        }
        return res.status(200).send({
            success:true,
            blogs
        })
    } catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while getting blog",
            error
        })
    }
})

router.post("/update-blog/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,image}=req.body
        const blogs=await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            {new:true}
        )

        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No Blogs Found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"blog updated",
            blogs
        })
    } catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while updating blog",
            error
        })
    }
})

router.delete("/delete-blog/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const blogs=await blogModel.findByIdAndDelete(id).populate("user")
        await blogs.user.blogs.pull(blogs)
        await blogs.user.save()
        return res.status(200).send({
            success:true,
            message:"blog deleted",
        })
    } catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while deleting blog",
            error
        })
    }
})

router.get("/user-blog/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const userBlog=await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"Blogs not found with this id"
            })
        }
        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog
        })
    } catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while deleting blog",
            error
        })
    }
})

module.exports=router