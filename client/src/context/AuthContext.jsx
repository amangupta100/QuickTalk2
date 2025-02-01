import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "../Toast/AllToast";

export const AuthContext = createContext()

export const AuthContProvider = ({children}) =>{
    const [userInfo,setuserInfo] = useState(null)

    const fetchUserInfo =async () =>{
        const req = await axios.get("http://localhost:5000/api/auth/userInfo",{
            withCredentials:true
        })
        const {success,user} = req.data
        if(success) setuserInfo(user)
        else{
        ErrorToast("Unauthorized user")
        setuserInfo(null)
    }
        }
    
    useEffect(()=>{
    if(!userInfo && document.cookie.includes("token")){
        fetchUserInfo()
    }
    },[userInfo,setuserInfo])

    const value = {userInfo,setuserInfo,fetchUserInfo}
    return(
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}