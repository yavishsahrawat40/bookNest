import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from "universal-cookie"
export default function SellerLoginCard(){
    const navigate = useNavigate()
    const cookie = new Cookies()
    const MutateSellerLogin=useMutation({
        mutationFn: async ()=>{
            const data = await axios.post("http://localhost:3000/seller/login",{
                email:email,
                password:password
            })
            return data.data
        },
        onSettled:(data,error)=>{
            if(data.success){
                cookie.set('token',data.message)
                console.log(data)
                navigate("/seller")
            }
            if(!data.success){
                alert(data.message)
            }
            if(error){
                console.log(error)
            }
        }
    })
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const forColor={
        color:'red'
    }
    return <div className='h-80 w-96 border-2 rounded-lg border-zinc-300 shadow-md flex-col  flex justify-around items-center'>
            <p className='text-3xl font-semibold'>Seller Login</p>
        <div className='flex-col  w-11/12'>
        <Label>Email</Label>
        <input onChange={(e)=>{
            setEmail(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
        </div>
        <div className='flex-col  w-11/12'>
        <Label>Password</Label>
        <input type='password' onChange={(e)=>{
            setPassword(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg p-2'></input>
        </div>
        
        <Link className='hover:underline' to={"/sellersignup"}>Not a member yet?<label style={forColor}>Signup</label></Link>
        <button onClick={()=>{
            MutateSellerLogin.mutate()
        }} className='p-2 bg-zinc-800 text-white rounded-lg px-3 text-center'>Login</button>
    </div>
}