import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'
import "../styles/registerPage.css"
import toast from 'react-hot-toast';

function BlogDetails() {

    const [blog, setBlog] = useState([])
    const id = useParams().id

    const getBlogDetails = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/blog/get-blog/${id}`)
            if (data?.success) {
                setBlog(data?.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBlog((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:4000/blog/update-blog/${id}`, {
                title: blog.title,
                description: blog.description,
                image: blog.image,
                user: blog.user
            })
            if (data.success) {
                toast.success("Successfully Updated Blog")
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBlogDetails();
    }, [id])

    return (
        <div className='register-container'>
            <div className='register-container-circle'>
                <div className='register-container-header'>
                    EDIT BLOG
                </div>
                <div className='register-container-main'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" placeholder='Title' value={blog.title} onChange={handleChange} />
                        <textarea type="text" name="description" placeholder='Description' value={blog.description} onChange={handleChange} className='description-style' />
                        <input type="text" name="image" placeholder='Image Link' value={blog.image} onChange={handleChange} />
                        <button type='submit'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails