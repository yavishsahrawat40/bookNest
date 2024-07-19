import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'universal-cookie'
export default function SellerSignUpCard(){
    const cookie = new Cookies()
    const navigate = useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const MutateSellerSignup = useMutation({
        mutationFn: async ()=>{
            const data = await axios.post("http://localhost:3000/seller/signup",{
                name:name,
                email:email,
                password:password
            })
            return data.data
        },
        onSettled:(data,error)=>{
            if(data.success){
                console.log(data)
                cookie.set('token',data.message)
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
    return <div className='h-96 w-96 border-2 rounded-lg border-zinc-300 shadow-md flex-col  flex justify-around items-center'>
            <p className='text-3xl font-semibold'>Seller Sign Up</p>
        <div className='flex-col  w-11/12'>
        <Label>Shop Name</Label>
        <input onChange={(e)=>{
            setName(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
        </div>
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
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
        </div>
        <Link className='hover:underline' to={"/sellerlogin"}>Already a member!Login</Link>
        <button onClick={()=>{
            MutateSellerSignup.mutate()
        }} className='disabled:bg-gray-600 p-2 bg-zinc-800 text-white rounded-lg px-3 text-center'>Login</button>
    </div>
}