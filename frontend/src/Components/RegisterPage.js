import React, { useState } from 'react'
import "../styles/registerPage.css"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import loginContext from '../context/loginContext'
import { useContext } from 'react';
import toast from 'react-hot-toast';

function RegisterPage() {
    const navigate=useNavigate()
    const { setIslogin } = useContext(loginContext);
    const [userInfo,setuserInfo]=useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setuserInfo((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post("https://blog-application-96st.onrender.com/user/register",{
                username:userInfo.username,
                email:userInfo.email,
                password:userInfo.password,
                blogs:[]
            })
            if(data.success){
                setIslogin(true)
                toast.success('User Successfully Registered')
                navigate('/login')
            }
        } catch(error){
            console.log(error)
        }
    }

  return (
    <>
    <div className='register-container'>
        <div className='register-container-circle'>
            <div className='register-container-header'>
                REGISTER
            </div>
            <div className='register-container-main'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder='Username' value={userInfo.username} onChange={handleChange}/>
                    <input type="email" name="email" placeholder='Email' value={userInfo.email} onChange={handleChange}/>
                    <input type="password" name="password" placeholder='Password' value={userInfo.password} onChange={handleChange}/>
                    <button type='submit'>Submit</button>
                </form>
                <p>ALREADY REGISTERED ? PLEASE <Link to="/login">LOGIN</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default RegisterPage