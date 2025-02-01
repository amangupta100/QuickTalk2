import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext} from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContxt = createContext(null)

export const SocketContProvider = ({children}) =>{
    const [onlineUsers,setOnlineUsers] = useState([])
    const [socketSt,setsocketState] = useState(null)
    const {userInfo} = useContext(AuthContext)

    useEffect(()=>{
    if(userInfo){
        const socket = io("http://localhost:5000",{
            withCredentials:true,
            query:{userId:userInfo.id}
        })
        setsocketState(socket)
       socket.on("getOnlineUsers",(users)=>{
        setOnlineUsers(users)
       })
       return () =>socket.close()
    }else{
        if(socketSt){
            socketSt.close()
            setsocketState(null)
        }
    }
    },[userInfo])

    const value = {onlineUsers,socketSt}
    return <SocketContxt.Provider value={value}>{children}</SocketContxt.Provider>
}