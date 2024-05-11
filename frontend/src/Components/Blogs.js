import { useEffect, useState,useContext } from 'react'
import React from 'react'
import axios from 'axios'
import BlogCard from '../Components/BlogCard.js'
import loginContext from '../context/loginContext'

function Blogs() {

    const [blogs,setBlogs]=useState([])
    const {  setIslogin } = useContext(loginContext);
    setIslogin(true)

    const getAllBlogs = async () => {
        try{
            const { data } = await axios.get("https://blog-application-96st.onrender.com/blog/all-blog");
            if (data?.success) {
                setBlogs(data.blogs)
            }
        } catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllBlogs()
    },[])

    return (
        <div>
            {
                blogs && blogs.map((blog)=>{
                    return <BlogCard 
                    key={blog._id}
                    id={blog._id}
                    isUser={localStorage.getItem("userId")===blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    />
                })
            }
        </div>
    )
}

export default Blogs