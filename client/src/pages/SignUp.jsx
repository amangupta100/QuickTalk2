import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from 'react-router-dom'
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import icon from '../assets/chat_app.svg'
import { ErrorToast, SuccessToast } from "../Toast/AllToast";
import { SignUpFetch } from "../libs/AuthFetch";
import {Oval} from 'react-loader-spinner'
import { AuthContext } from "../context/AuthContext";

export const SignUp = () => {
  
  const [visPass, setVisPass] = useState(false)
  const [userInp, setuserInp] = useState({ name: "", username: "", email: "", password: "" })
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const {fetchUserInfo} = useContext(AuthContext)
 
  const handleForm =async (e) => {
    e.preventDefault()

    const {name,email,password,username} = userInp
    if(!name || !email || !password || !username) ErrorToast("Recheck the form")
    else{
    
    setLoading(true)
    const response =await SignUpFetch(userInp)
    setLoading(false)
    const {success,message} = response
    if(success){
      SuccessToast(message)
      navigate("/")
      fetchUserInfo()
    }
    else{
      ErrorToast(message)
    }

    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div className="w-screen flex items-center justify-center h-screen bg-[url(./assets/background.png)] ">

    <div className="flex items-center mr-44">
      <img src={icon} className="w-32" alt="" />
      <h1 className="text-7xl text-white mt-5 ">QuickTalk</h1>
    </div>
   
      <div className="w-[490px] rounded-lg min-h-fit backdrop-blur-md bg-zinc-200/30 ">
        <h1 className="text-3xl text-center text-white mt-5 font-normal">SignUp User</h1>

        <form onSubmit={handleForm} className="mt-4 w-full flex flex-col  px-4">
          <input required value={userInp.name} onChange={(e) => setuserInp({ ...userInp, name: e.target.value })} className="focus:outline-none w-full rounded-lg bg-white p-3 mt-4" type="text" placeholder="Enter name" />
          <input required value={userInp.username} onChange={(e) => setuserInp({ ...userInp, username: e.target.value })} className="focus:outline-none  w-full rounded-lg bg-white p-3 mt-4" type="text" placeholder="Enter a unique username" />
          <input required value={userInp.email} onChange={(e) => setuserInp({ ...userInp, email: e.target.value })} className="focus:outline-none  w-full rounded-lg bg-white p-3 mt-4" type="email" placeholder="Enter email" />

           <div className="relative w-full">
            {
              visPass ? <GoEye onClick={() => setVisPass(!visPass)} className="absolute cursor-pointer text-xl right-4 top-[30px] " /> : <GoEyeClosed onClick={() => setVisPass(!visPass)} className="absolute cursor-pointer right-4 text-xl top-[30px] " />
            }
            <input required value={userInp.password} onChange={(e) =>setuserInp({...userInp,password:e.target.value})} className="focus:outline-none w-full rounded-lg bg-white p-3 mt-4" type={`${visPass ? "text" : "password"}`} placeholder="Enter password" />
          </div>

          <button disabled={loading} className={`${loading?"cursor-not-allowed":null} w-full py-3 flex items-center justify-center bg-zinc-600 hover:bg-zinc-400 transition-all ease-in-out duration-300 cursor-pointer rounded-lg text-white text-lg mt-8 mb-5`}>
            {
              loading ? 
  <Oval visible={true} height="30" width="30" color="#FFFFFF"/> : "SignUp User"
            }
          </button>
        </form>

        <h1 className="text-start text-white mx-4 mb-5">Already have an account? <span><NavLink className="text-blue-500 font-semibold" to="/login">Login user</NavLink></span></h1>
      </div>
    </div>
  )
}
