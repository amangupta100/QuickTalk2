import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { ErrorToast } from "../Toast/AllToast";
import { AuthContext } from "./AuthContext";

export const ConversationContxt = createContext(null)

export const ConverasationProvider = ({children}) =>{
    const {userInfo} = useContext(AuthContext)

    const getAllUsers =async () =>{
        try{
            const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`,{
                withCredentials:true
            })
            if(!req.data.success) ErrorToast(req.data.message)
            else setAllConv(req.data.filteredUsers)
        }catch(err){
            ErrorToast(err.message)
        }
        }

    useEffect(()=>{
    if(!userInfo && document.cookie.includes("token")) getAllUsers()
    },[])

    const [allConv,setAllConv] = useState(null)
    const [selectedConv,setselecConv] = useState({})

    const value ={selectedConv,setselecConv,getAllUsers,allConv,setAllConv}
    return(
        <ConversationContxt.Provider value={value}>
        {children}
        </ConversationContxt.Provider>
    )
}