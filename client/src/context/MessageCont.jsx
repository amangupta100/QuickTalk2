import { createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../Toast/AllToast";
import { ConversationContxt } from "./Conversation";

export const MessageContxt = createContext()

export const MessageContProv = ({children}) =>{
    const sendMessageFunc =async (sendMessage,receiverid) =>{

     const response = await axios.post(`http://localhost:5000/api/message/send/${receiverid}`, {
        message: sendMessage,
      },{
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {success} = response.data
      if(success){
        SuccessToast(response.data.message)
        setMessage([...message,response.data.newMessages])
      }
        else ErrorToast(response.data.message)
    }

    const getMessages = async (userToChatID) =>{
        const response = await axios.get(`http://localhost:5000/api/message/getMessages/${userToChatID}`,{
            withCredentials:true
        })
        const {success,message} = response.data 
        if(success){
            setMessage(response.data.messages)
        }
        else ErrorToast(message)
    }
    const [message,setMessage] = useState([])

    const value={sendMessageFunc,message,setMessage,getMessages}
    return(
        <MessageContxt.Provider value={value}>
        {children}
        </MessageContxt.Provider>
    )
}