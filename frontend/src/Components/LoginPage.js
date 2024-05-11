import { useContext, useEffect } from 'react';
import React, { useState } from 'react'
import axios from 'axios';
import loginContext from '../context/loginContext'
import "../styles/registerPage.css"
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
function LoginPage() {

    const navigate=useNavigate()
    const { setIslogin } = useContext(loginContext);

    const [userInfo,setuserInfo]=useState({
        email:"",
        password:""
    })

    useEffect(()=>{
        setIslogin(true)
    },[])

    const handleChange=(e)=>{
        setuserInfo((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post("https://blog-application-96st.onrender.com/user/login",{
                email:userInfo.email,
                password:userInfo.password,
            })
            if(data.success){
                localStorage.setItem('userId',data.user._id)
                localStorage.setItem('userIdState',true)
                setIslogin(true)
                navigate('/all-blogs')
            }
        } catch(error){
            toast.error('Invalid Username or Password')
            console.log(error)
        }
    }

  return (
    <>
    <div className='register-container'>
        <div className='register-container-circle'>
            <div className='register-container-header'>
                LOGIN
            </div>
            <div className='register-container-main'>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder='Email' value={userInfo.email} onChange={handleChange}/>
                    <input type="password" name="password" placeholder='Password' value={userInfo.password} onChange={handleChange}/>
                    <button type='submit'>Submit</button>
                </form>
                <p>NOT A USER ? PLEASE <Link to="/register">REGISTER</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default LoginPage