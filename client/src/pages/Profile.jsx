import { useContext, useEffect, useRef, useState } from 'react'
import img1 from '../assets/avatar_icon.png'
import { AuthContext } from '../context/AuthContext'
import { IoMdArrowBack } from "react-icons/io";
import { NavLink } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { ErrorToast, SuccessToast } from '../Toast/AllToast';
import {Oval} from 'react-loader-spinner'

export const Profile = () =>{
    const [image,setImage] = useState(false)
    const [file,setFile] = useState(null)
    const {userInfo,setuserInfo} = useContext(AuthContext)
    const [loading,setLoading] = useState(false)

    const ImageInputRef = useRef()

    const handleSubmitDet =async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("image",file)
    const userId = userInfo.id
    formData.append("userId",userId)
    setLoading(true)
    const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/userDetails/update`,{
        method:"POST",body:formData
    })
    const res = await req.json()
    setLoading(false)
    const {success,message} =res
    if(success){
        SuccessToast(message)
        setuserInfo({...userInfo,profileImg:res.profUrl})
    }else ErrorToast(message)
    }

    const handleImagCh = (e) =>{
    const file = e.target.files[0]
    if(file){
        setFile(file)
        setImage(URL.createObjectURL(file))
    }
    }
    return(
        <div className="w-screen flex items-center justify-center h-screen bg-[url(./assets/background.png)] ">
            
       <div className="min-w-fit py-6 px-8 flex-col rounded-lg min-h-fit backdrop-blur-md bg-zinc-200/30">
       <NavLink to="/" className="bg-white w-24 py-3 flex items-center justify-center rounded-lg">
        <IoMdArrowBack className='text-xl mr-1'/>
        Back
       </NavLink>
       <h1 className="text-white text-2xl mt-3 font-semibold">Profile Details</h1>   

      <div className="flex items-center w-full justify-baseline">

    <div className="flex flex-col w-[60%]">

    <div onClick={()=>ImageInputRef.current?.click()} className="mt-5 flex cursor-pointer items-center">
        <img src={`${image?image:img1}`} alt="profile" className="w-[60px] h-[60px] rounded-full"/>
        <input type="file" onChange={handleImagCh} className='hidden' ref={ImageInputRef} />
        <h1 className='text-white ml-4 text-xl'>Upload profile image</h1>
     </div>

    <div className="">
        <form onSubmit={handleSubmitDet}>
            <h1 className='text-lg text-white'>Username : <span className='font-extrabold'>{userInfo.username}</span></h1>
              <button disabled={loading} className={`${loading?"cursor-not-allowed":null} w-full text-white flex items-center justify-center bg-blue-500 rounded-lg py-3 hover:transition-all duration-300 ease-in-out cursor-pointer my-3 hover:bg-blue-400`}>
                {
                    loading ? <Oval visible={true} height="30" width="30" color="#FFFFFF"/> : <h1>Upload Photo</h1>
                }
              </button>
        </form>
    </div>

    </div>

    {
        userInfo?.profileImg? <img src={`${userInfo.profileImg}`} className='w-32 h-32 ml-10 rounded-full' alt="" /> :
        <FaUserCircle className='text-white text-9xl ml-10'/>
    }
      </div>

       </div>   
 
        </div>
    )
}