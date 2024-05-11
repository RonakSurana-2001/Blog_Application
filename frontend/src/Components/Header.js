import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import loginContext from '../context/loginContext'
import toast from 'react-hot-toast';

function Header() {

    const { Islogin, setIslogin } = useContext(loginContext);
    
    return (
        <>
            <div className='navbar-container'>
                <div className='navbar-container-1'>My Blog</div>
                <div className='navbar-container-2'>
                    {Islogin && <>
                        <div className='grid-item'><Link to="/all-blogs" style={{ textDecoration: "none", color: "white" }}>Blogs</Link></div>
                        <div className='grid-item'><Link to="/my-blogs" style={{ textDecoration: "none", color: "white" }}>My Blog</Link></div>
                        <div className='grid-item'><Link to="/create-blog" style={{ textDecoration: "none", color: "white" }}>Create Blog</Link></div></>}
                </div>
                <div className='navbar-container-3'>
                    {!Islogin && <>
                        <div><Link to="/login" style={{ textDecoration: "none", color: "white" }}>Login</Link></div>
                        <div><Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register</Link></div>
                    </>}
                    {Islogin && <div><Link to="/login" style={{ textDecoration: "none", color: "white" }} onClick={()=>{
                        setIslogin(false);
                        localStorage.clear()
                        toast.success("Logged Out")
                    }}>Logout</Link></div>}
                </div>
            </div>
        </>
    )
}

export default Header