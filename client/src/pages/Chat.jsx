import { ChatMessg } from "../components/ChatMessg"
import { LeftSideBar } from "../components/LeftSideBar"


export const Chat = () =>{
return(
    <div className="bg-gradient-to-b flex items-center justify-center w-screen h-screen from-[#596AFF] to-[#383699] ">
     
    <div className={`flex w-[80%] lD:w-[90%] relative overflow-hidden h-[600px] rounded-2xl bg-zinc-200/40 backdrop-blur-md `}>
        
    <LeftSideBar/>
    <ChatMessg/>

    </div>
    </div>
)
}