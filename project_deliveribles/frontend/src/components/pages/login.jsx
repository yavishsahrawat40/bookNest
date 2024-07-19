import React, { useEffect } from 'react'
import LoginCard from '../cards/loginCard'
import  Cookies from "universal-cookie"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
export default function Login(){
    const cookie = new Cookies()
    const token = cookie.get('token')
    const navigate = useNavigate()
    if(token){
        useEffect(()=>{
            const decode = jwtDecode(token)
            navigate(`/${decode.role}`)
        },[])
        return <div>
            {token}
        </div>
    }

    return <div className='h-screen w-full flex justify-center items-center'>
        <LoginCard></LoginCard>
    </div>
}