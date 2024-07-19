import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'universal-cookie';
export default function LoginCard(){
    const navigate = useNavigate()
    const cookie = new Cookies()
    const MutateUSerLogin= useMutation({
        mutationFn:async ()=>{
            const data = await axios.post("http://localhost:3000/user/login",{
                email:email,
                password:password
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
    const forColor={
        color:'red'
    }
    const [email,Setemail] = useState("")
    const [password,Setpassword]= useState("")
    return <div className='h-80 w-96 border-2 rounded-lg border-zinc-300 shadow-md flex-col  flex justify-around items-center'>
        
            <p className='text-3xl font-semibold'>Login</p>
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
        </div>
        
        <Link className='hover:underline' to={"/signup"}>Not a member yet?<label style={forColor}>Signup</label></Link>
        <button onClick={()=>{
            MutateUSerLogin.mutate()
        }} className='p-2 bg-zinc-800 text-white rounded-lg px-3 text-center'>Login</button>
    </div>
}