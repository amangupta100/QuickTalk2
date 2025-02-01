import gallery from '../assets/gallery_icon.png';
import { IoIosSend } from "react-icons/io";
import { useContext, useEffect, useState } from 'react';
import { ConversationContxt } from '../context/Conversation';
import icon from '../assets/chat_app.svg';
import { FaUserCircle } from "react-icons/fa";
import { ErrorToast, SuccessToast } from "../Toast/AllToast";
import { MessageContxt } from "../context/MessageCont";
import { Oval } from 'react-loader-spinner';
import back from '../assets/arrow_icon.png'
import { useListenMessage } from '../libs/SocketMsgHook';
import { AuthContext } from '../context/AuthContext';
import { extractTime } from '../utils/extractTime'

export const ChatMessg = () => {
  const [sendMessage, setSendMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const { selectedConv,setselecConv } = useContext(ConversationContxt)
  const { sendMessageFunc } = useContext(MessageContxt)

  const handleSendMessage = async () => {
    if (sendMessage.length < 3) {
      ErrorToast("Message length should be greater than 3 characters")
    } else {
      setLoading(true);
      sendMessageFunc(sendMessage, selectedConv._id);
      setLoading(false);
      setSendMessage("");
    }
  }
  useListenMessage()

    const { message,getMessages,setMessage } = useContext(MessageContxt)
    const { userInfo } = useContext(AuthContext)

  
      if (selectedConv && selectedConv?.name) {
          useEffect(() => {
            getMessages(selectedConv?._id);
          }, [selectedConv?._id]);
        }
  
      const timeFunc = (timeString) => {
          let time = extractTime(timeString)
          let h1 = time[0] - '0';
          let h2 = time[1] - '0';
  
          let hh = h1 * 10 + h2;
          let Meridien = ""
          if (hh < 12) {
              Meridien = "AM";
          } else {
              Meridien = "PM";
          }
  
          hh %= 12;
          return `${hh}:${time.split(":")[1]} ${Meridien}`
      }
      
  return (
    <div className={`${selectedConv?._id?"lD:w-full w-[60%] block ":"lD:hidden w-[60%] "} transition-all bg-[rgb(241,245,255)] flex flex-col`}>
      {
        selectedConv && selectedConv?.name ?
          <div className="flex h-screen flex-col">
            {/* Top section */}
            <div className="p-2 flex items-center w-full border-l-0 border-r-0 border-[1.6px] border-zinc-300">
            <img src={back} onClick={()=>setselecConv({})} className="mr-3 hidden lD:block cursor-pointer w-6" alt="" />
              {
                selectedConv.profileImg ? <img src={selectedConv.profileImg} className='w-12 rounded-full' alt="" /> : <FaUserCircle className='text-5xl' />
              }
              <h1 className='text-xl font-semibold ml-3'> {selectedConv.username} </h1>
            </div>

            {/* Messages */}
            <div className="mt-2 flex flex-col flex-1 px-4 max-h-[68%] vlm:max-h-[77%] tb:max-h-[76%] lm: w-full overflow-y-auto">
            {
                message.length>0 ?
                message.map((elem,idx) => {
                    return (
                        <div key={idx} className={`${userInfo.id == elem.senderId ? "justify-end ml-auto rounded-ee-2xl rounded-ss-2xl rounded-es-2xl" : " rounded-se-2xl rounded-e-2xl rounded-bl-2xl"} bg-zinc-200 mb-4 relative max-w-fit py-3 px-8  min-h-16`}>
                        {/* <h1 className={`${elem}`}> {date(elem)} </h1> */}
                            <h1 className='text-lg text-start'>{elem.message}</h1>
                            <h1 className='absolute bottom-1 text-[12px] right-2'>{timeFunc(elem.createdAt)}</h1>
                        </div>
                    )
                })
             : <h1 className='text-2xl'>No conversation exist</h1>
            }
        </div>
            
            {/*chat box*/}
            <div className="border-t-2 border-zinc-300 flex w-full">
              <div className="flex items-center w-full px-4 gap-1 mr-[10px] lm:mr-0">
                <img src={gallery} className="w-6" alt="" />
                {
                  loading ? <Oval visible={true} height="30" width="30" color="#000000" /> : <IoIosSend onClick={handleSendMessage} className='text-4xl cursor-pointer px-1 min-w-9 ml-1 text-white bg-blue-500 rounded-full' />
                }
              <input value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} type="text" placeholder='Send a message' className='focus:outline-none w-[50%] lm:w-[100%] py-2 text-lg px-2' />
              </div>
            </div>
           
          </div> :
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <img src={icon} className='w-20' onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />
            <h1 className='text-2xl text-black'>Welcome to QuickTalk <span className='text-5xl'>👋</span></h1>
            <h1 className='text-lg'>Select a user to start chatting</h1>
          </div>
      }
    </div>
  )
}
