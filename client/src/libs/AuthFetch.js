import axios from 'axios'

export const SignUpFetch =async (userInp) =>{

const req = await axios.post(`http://localhost:5000/api/auth/signUp`,userInp,{
    withCredentials:true,
    headers:{
        'Content-Type': 'application/json'
    }
})
const {data} = req
return data
}

export const LoginFetch = async (userInp) =>{
    const req = await axios.post("http://localhost:5000/api/auth/login",userInp,{
        withCredentials:true,
        headers:{
            'Content-Type':'application/json'
        }
    })
    const {data} = req
    return data
}