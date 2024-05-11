import React, { useState,useContext } from 'react'
import "../styles/registerPage.css"
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';
import loginContext from '../context/loginContext'

function CreateBlog() {
    const {  setIslogin } = useContext(loginContext);
    setIslogin(true)
    const navigate = useNavigate()
    const [blogInfo, setblogInfo] = useState({
        title: "",
        description: "",
        image: "",
        user:""
    })

    const handleChange = (e) => {
        setblogInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://blog-application-96st.onrender.com/blog/create-blog", {
                title: blogInfo.title,
                description: blogInfo.description,
                image: blogInfo.image,
                user: localStorage.getItem('userId')
            })
            if (data.success) {
                navigate('/all-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='register-container'>
            <div className='register-container-circle'>
                <div className='register-container-header'>
                    CREATE BLOG
                </div>
                <div className='register-container-main'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" placeholder='Title' value={blogInfo.title} onChange={handleChange} />
                        <textarea type="text" name="description" placeholder='Description' value={blogInfo.description} onChange={handleChange} className='description-style'/>
                        <input type="text" name="image" placeholder='Image Link' value={blogInfo.image} onChange={handleChange} />
                        <button type='submit'>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog