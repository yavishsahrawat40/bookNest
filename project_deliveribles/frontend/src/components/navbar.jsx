import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
    
    return <div className='h-16  bg-black text-white fixed top-0 w-full flex justify-between items-center z-50'>
        <div className='h-full text-3xl font-bold w-1/6 flex justify-center items-center'>
            BookNest
        </div>
        <div className='h-full w-1/3 text-xl flex justify-around items-center'>
            <Link to={"/login"} >User</Link>
            <Link to={"/sellerlogin"}>Seller</Link>
            <Link to={"/adminlogin"}>Admin</Link>
        </div>
        
    </div>
}