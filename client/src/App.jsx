import {Routes,Route, Navigate, Outlet} from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { Chat } from './pages/Chat'
import { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext'
import { ConversationContxt } from './context/Conversation'

export const App = () =>{
  const {userInfo} = useContext(AuthContext)
  const {getAllUsers,setselecConv} = useContext(ConversationContxt)

  useEffect(()=>{
  if(userInfo){
    getAllUsers()
  }
  },[userInfo])
 
  const ProtectedRoute = ({children,user,redirect}) =>{
    if (!user) return <Navigate to={redirect} />
    return children ? children : <Outlet/>
    }
  return(
    
    <Routes>
      
   <Route element={<ProtectedRoute user={userInfo} redirect="/login"/>}>

   <Route path='/' element={<Chat/>}/>
   <Route path='/profile' element={<Profile/>}/>

   </Route>

   <Route element={<ProtectedRoute user={!userInfo} redirect="/"/>}>
   
    <Route path='/login' element={<Login/>}/>
    <Route path='/signUp' element={<SignUp/>}/>

   </Route>

    </Routes>

  )
}