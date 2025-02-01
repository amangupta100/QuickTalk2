import { useContext, useRef, useState } from 'react'
import img1 from '../assets/avatar_icon.png'
import { AuthContext } from '../context/AuthContext'

export const Profile = () =>{
    const [image,setImage] = useState(false)
    const [file,setFile] = useState(null)

    const ImageInputRef = useRef()

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
        
       <h1 className="text-white text-2xl font-semibold">Profile Details</h1>   

      <div className="flex items-center w-full justify-baseline">

    <div className="flex flex-col w-[60%]">

    <div onClick={()=>ImageInputRef.current?.click()} className="mt-5 flex cursor-pointer items-center">
        <img src={`${image?image:img1}`} alt="profile" className="w-[60px] h-[60px] rounded-full"/>
        <input type="file" onChange={handleImagCh} className='hidden' ref={ImageInputRef} />
        <h1 className='text-white ml-4 text-xl'>Upload profile image</h1>
     </div>

    <div className="">
        <form>
            <input type="text" placeholder='Your name' className='focus:outline-none py-3 w-full bg-white rounded-lg mt-5 px-4' name="" id="" />
            <textarea name="" placeholder='Write Profile Bio' className='focus:outline-none w-full py-2 px-4 bg-white rounded-lg mt-4 max-h-40  ' id=""></textarea>
            <button className='w-full text-white bg-blue-500 rounded-lg py-3 hover:transition-all duration-300 ease-in-out cursor-pointer my-3 hover:bg-blue-400'>Save Details</button>
        </form>
    </div>

    </div>

    <img src={`${image?image:img1}`} className='w-32 h-32 ml-10 rounded-full' alt="" />

      </div>

       </div>   
 
        </div>
    )
}