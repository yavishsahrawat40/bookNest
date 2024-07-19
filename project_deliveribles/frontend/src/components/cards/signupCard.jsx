import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Link,useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from "universal-cookie"
export default function SignUpCard(){
    const navigate = useNavigate()
    const [name,setName]= useState("")
    const [email,Setemail] = useState("")
    const [password,Setpassword]= useState("")
    const [address,setAddress] = useState("")
    const cookie = new Cookies()
    const MutateUSerSignUp= useMutation({
        mutationFn: async ()=>{
            const data = await axios.post("http://localhost:3000/user/signup",{
                name:name,
                email:email,
                password:password,
                address:address
            })
            return data.data
        },
        onSettled: (data, error) => {
            if (data) {
                cookie.set("token",data.message)
              console.log('Mutation success:', data);
              navigate('/user')
            }
            if (error) {
              console.error('Mutation error:', error);
            }
          }

    })
    return <div className='h-[400px] w-96 border-2 rounded-lg border-zinc-300 shadow-md flex-col  flex justify-around items-center'>
            <p className='text-3xl font-semibold'>Sign Up</p>
        <div className='flex-col  w-11/12'>
        <Label>Name</Label>
        <input onChange={(e)=>{
            setName(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
        </div>
        <div className='flex-col  w-11/12'>
        <Label>Email</Label>
        <input onChange={(e)=>{
            Setemail(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
        </div>
        <div className='flex-col  w-11/12'>
        <Label>Password</Label>
        <input type='password' onChange={(e)=>{
            Setpassword(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
         <Label>Address</Label>
        <input onChange={(e)=>{
            setAddress(e.target.value)
        }} className='block py-2 w-full border-2 border-gray-300 rounded-lg'></input>
        </div>
        <Link className='hover:underline' to={"/login"}>Already a member!Login</Link>
        <button onClick={()=>{
            MutateUSerSignUp.mutate()
        }} className='p-2 bg-zinc-800 text-white rounded-lg px-3 text-center'>Signup</button>
    </div>
}