import React, { useEffect ,useContext} from 'react'
import { useState } from 'react'
import axios from 'axios';
import BlogCard from '../Components/BlogCard.js'
import loginContext from '../context/loginContext'

function UserBlogs() {

    const [blogs, setBlogs] = useState([]);
    const {  setIslogin } = useContext(loginContext);
    setIslogin(true)
    const getUserBlogs = async () => {
        const userIdPart = localStorage.getItem('userId')
        try {
            const{data} = await axios.get(`https://blog-application-96st.onrender.com/blog/user-blog/${userIdPart}`)
            if (data.success) {
                setBlogs(data.userBlog.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserBlogs()
    }, [])

    return (
        <div>
            {
                blogs && blogs.length>0 ? (
                    blogs.map((blog) => {
                        return <BlogCard
                            key={blog._id}
                            id={blog._id}
                            isUser={localStorage.getItem("userId")===blog.user}
                            title={blog.title}
                            description={blog.description}
                            image={blog.image}
                            username={blog.user.username}
                        />
                    })
                ): (<h1 style={{textAlign:"center"}}>No Blogs to show</h1>)
            }
        </div>
    )
}

export default UserBlogs