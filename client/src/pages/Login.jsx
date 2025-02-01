import { useContext, useEffect, useState } from "react"
import { CiUser } from "react-icons/ci";
import {NavLink, useNavigate} from 'react-router-dom'
import { MdOutlinePassword } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import {ErrorToast, SuccessToast} from '../Toast/AllToast'
import { LoginFetch } from "../libs/AuthFetch";
import {Oval} from 'react-loader-spinner'
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const [visPass,setVisPass] = useState(false)
  const [loading,setLoad] = useState(false)
  const [userInp,setuserInp] = useState({username:"",password:""})

  const {fetchUserInfo} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleFormSubmit =async (e) =>{
  e.preventDefault()

  setLoad(true)
  const res = await LoginFetch(userInp)
  setLoad(false)
  const {success,message} = res
  if(success){
    SuccessToast(message)
    navigate("/")
    fetchUserInfo()
  }
  else{
    ErrorToast(message)
  }
  }

  useEffect(()=>{
   document.body.style.overflow = 'hidden'
  },[])

  return (
    <div className="w-screen flex items-center justify-center h-screen bg-[url(./assets/background.png)] ">
      
    <div className="w-[490px] flex items-center flex-col rounded-lg min-h-[350px] backdrop-blur-md bg-zinc-200/30 ">
    <h1 className="text-3xl text-center text-white mt-5 font-normal">Login User</h1>

<form onSubmit={handleFormSubmit} className="mt-8 w-full flex flex-col  px-4">
<div className="relative w-full">
    <CiUser className="absolute text-2xl left-3 top-[24px] " />
  <input required value={userInp.username} onChange={(e)=>setuserInp({...userInp,username:e.target.value})} className="focus:outline-none w-full rounded-lg bg-white py-3 px-[53px] mt-3" type="text" placeholder="Enter username" />
  </div>
  <div className="relative w-full">
    {
      visPass ? <GoEye onClick={()=>setVisPass(!visPass)} className="absolute cursor-pointer text-xl right-4 top-[26px] "/> : <GoEyeClosed onClick={()=>setVisPass(!visPass)} className="absolute cursor-pointer text-xl right-4 top-[26px] "/>
    }
  <MdOutlinePassword className="absolute text-2xl left-3 top-6"/>
  <input required value={userInp.password} onChange={(e)=>setuserInp({...userInp,password:e.target.value})} className="focus:outline-none w-full rounded-lg bg-white py-3 px-[53px] mt-3" type={`${visPass?"text":"password"}`} placeholder="Enter password" />
  </div>
  <button disabled={loading} className={`${loading?"cursor-not-allowed":null} w-full py-3 flex items-center justify-center bg-zinc-600 hover:bg-zinc-400 transition-all ease-in-out duration-300 cursor-pointer rounded-lg text-white text-lg mt-5 mb-5`}>
    {
    loading ? 
      <Oval visible={true} height="30" width="30" color="#FFFFFF"/> : "Login User"
                }
  </button>
</form>

<h1 className="text-start text-white mb-5">Didn't have an account yet ?<span> <NavLink className="text-blue-300 font-semibold" to="/signUp">SignUp user</NavLink> </span></h1>

    </div>

    </div>
  )
}
