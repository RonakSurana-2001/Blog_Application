import loginContext from "./loginContext"
import { useState } from "react";
const LoginState=(props)=>{
    const [Islogin,setIslogin]=useState(false);
    return (
        <loginContext.Provider value={{Islogin,setIslogin}}>
            {props.children}
        </loginContext.Provider>
    )
}

export default LoginState