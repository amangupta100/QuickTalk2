import { useContext, useEffect } from "react";
import { SocketContxt } from "../context/SocketContext";
import { MessageContxt } from "../context/MessageCont";
import notificationSound from '../assets/notification.mp3'

export const useListenMessage = () =>{
    const {socketSt} = useContext(SocketContxt)
    const {message,setMessage} = useContext(MessageContxt)

    useEffect(()=>{
        socketSt?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake = true
        const sound = new Audio(notificationSound)
        sound.play()
        setMessage([...message,newMessage])
        })
        return () => socketSt?.off("newMessage");
    },[socketSt,message,setMessage])
    console.log(message)
}