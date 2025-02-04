import icon from '../assets/chat_app.svg'
import { HiOutlineDotsVertical } from "react-icons/hi";
import '../components/LeftSidebar.css'
import { useContext, useState } from 'react';
import { ConversationContxt } from '../context/Conversation';
import { FaUserCircle } from "react-icons/fa";
import './LeftSidebar.css'
import { SocketContxt } from '../context/SocketContext';
import { LuDot } from "react-icons/lu";
import { AuthContext } from '../context/AuthContext';
import { ErrorToast, SuccessToast } from '../Toast/AllToast';
import axios from 'axios';
import {NavLink} from 'react-router-dom'


export const LeftSideBar = () =>{
   const {allConv,setselecConv,selectedConv} = useContext(ConversationContxt)
   const {onlineUsers} = useContext(SocketContxt)
   const {setuserInfo,userInfo} = useContext(AuthContext)

  const handleLogout =async () =>{
const req = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
    withCredentials:true
})
const {success,message} = req.data
if(success){
    SuccessToast(message)
    setuserInfo(null)
}
else ErrorToast(message)
  }

   const [user,setUser] = useState("")
    return(
        <div className={`${selectedConv?._id?"lD:hidden w-[40%]":"lD:w-full w-[40%] h-full"} overflow-y-auto bg-[rgb(0,16,48)] `}>

         <div className="px-5 w-full">

         <div className="w-full items-center flex justify-between">
         
         <div className="flex items-center py-5">
            <img src={icon} className='w-10' alt="" />
            <h1 className='text-2xl ml-1 text-white font-semibold'>QuickTalk</h1>
         </div>
         
         <div className="relative group">
        <div className="flex items-center">
         {
            userInfo?.profileImg ? <img src={userInfo.profileImg} className='w-12 h-12 rounded-full' alt="" />: 
            <div className='w-14 h-14 flex items-center justify-center bg-white rounded-full'>
            <h1 className='text-black text-3xl'> {userInfo.name[0]} </h1>
            </div>
         }
        <HiOutlineDotsVertical className='text-3xl p-2 w-10 h-12 group cursor-pointer text-white'/>
        </div>
         <div className="absolute hidden py-4 px-5 top-[40px] mt-2 lm:mt-4 lm:-right-0  z-10 tb:-right-8  right-2 rounded-xl group-hover:block w-48 min-h-fit bg-white ">
        <NavLink to="/profile" className="text-lg">Edit Profile</NavLink>
        <hr className='border-[1.5px] border-zinc-200 mt-1' />
        <button onClick={handleLogout} className='my-2 text-lg'>Logout</button>
        </div>
         </div>

         </div>

         <input type="search" value={user} onChange={(e)=>setUser(e.target.value)} className='bg-white py-3 text-lg w-full rounded-lg px-5 focus:outline-none' placeholder='Search user by username' />

         <div className="w-full flex flex-col mt-6">

         {
            allConv && allConv.length>0 ?
            allConv.map((elem,idx)=>{
               return(
                  <div key={idx} className='flex flex-col gap-5'>
                  <div onClick={()=>{
                     setselecConv(elem)
                  }} className="flex items-center hover:bg-[rgb(39,52,81)] transition-all cursor-pointer duration-300 ease-in-out rounded-2xl p-3 ">
          <div className="relative">
          <LuDot className={`${onlineUsers.includes(elem._id)?"absolute text-lime-500 -right-6 text-7xl -top-8":"hidden"}`}/>
          {
            elem.profileImg? <img src={elem.profileImg} className='w-12 h-12 rounded-full' alt="" /> : <FaUserCircle className='text-white text-5xl'/>
           }
          </div>
         <div className="flex-col flex ml-4 text-white">
            <h1 className='text-lg font-semibold'> {elem.username} </h1>
            {/* <h1 className='text-sm'> {message.length-1} </h1> */}
         </div>
         </div>
                  </div>
               )
            })
             : <h1 className='text-white'>No user added ,Search user to chat with them</h1>
         }
        
         </div>

         </div>

        </div>
    )
}