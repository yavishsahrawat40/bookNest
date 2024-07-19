import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import Cookies from 'universal-cookie'
export default function AdminNav(){
    const cookie = new Cookies()
    const navigate = useNavigate()
    return <div className="fixed z-20 bg-black text-white top-0 h-16 flex justify-between items-center  w-full ">
    <div className="h-full w-1/6 flex justify-center items-center text-3xl font-bold">
        BookNest
    </div>
    <div className="w-1/3 h-full flex justify-around items-center">
    <Link to={'/admin/user'}>Users</Link>
    <Link to={"/admin/seller"}>Seller</Link>
    <Link to={"/admin"}>
    Books
    </Link>
        <Link to={"/adminorders"}>
        Orders
        </Link>
        <button onClick={()=>{
            cookie.remove('token')
            navigate('/')
        }} className="px-3 py-1 text-black rounded-md flex justify-center items-center bg-white">
            Logout
        </button>
    </div>
</div>
}