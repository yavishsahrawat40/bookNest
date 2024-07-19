import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'
export default function BookCard(props){
    const cookie =  new Cookies()
    const token = cookie.get('token')
    const decoded = jwtDecode(token)
    const MutateWishlist = useMutation({
        mutationFn: async ()=>{
            const data = await axios.post("http://localhost:3000/user/Addwishlist",{
                bookname:props.name,
                imgurl:props.imgurl,
                user:decoded.id
            })
            return data.data
        },
        onSettled:(data)=>{
            if(data.success){
                alert("done")
            }
            else{
                alert("somethingg went wrong")
            }
        }
    })
    const MutateOrder = useMutation({
        mutationFn:async ()=>{
            const data = await axios.post("http://localhost:3000/user/addOrders",{
                seller:props.seller,
                books:props.id,
                user:decoded.id,
                bookname:props.name,
                imgurl:props.imgurl
            })
            return data.data
        },
        onSettled:(data,error)=>{
            if(data.success){
                alert("order placed")
            }
            if(!data.success){
                alert(data.message)
            }
            if(error){
                alert(error)
            }
        }
    })
    return <div className='h-[550px] w-80 flex flex-col justify-between items-center border-2 border-zinc-300 rounded-lg'>
    <div className='h-1/2 w-full '>
        <img className='object-contain h-full w-full rounded-t-lg' alt='image' src={props.imgurl}></img>
        <hr className='border-2 border-zinc-300' />
    </div>
    <div className='flex flex-col justify-between items-start h-2/5 w-full p-2'>
        <p><span className="font-semibold">Name:</span>{props.name}</p>
        <p><span className="font-semibold">Author:</span>{props.author}</p>
        <p><span className="font-semibold">Price</span>{props.price}₹</p>
        <p><span className="font-semibold">Description:</span> {props.discription}</p>
    </div>
    <div className='w-full flex justify-around items-center h-1/6'>
        <button onClick={() => MutateWishlist.mutate()} className='w-1/3 rounded-lg px-3 py-2 bg-black text-white'>
            Wishlist!
        </button>
        <button onClick={() => MutateOrder.mutate()} className='w-1/3 rounded-lg px-3 py-2 bg-black text-white'>
            Order this!
        </button>
    </div>
</div>
}