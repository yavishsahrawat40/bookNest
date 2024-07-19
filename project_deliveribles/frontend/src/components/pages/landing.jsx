import React, { useEffect } from 'react'
import Navbar from '../navbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NonUserBookCard from '../cards/nonuserbookcard';
import  Cookies from "universal-cookie"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import HeroImage from './HeroImage/HeroImage';
import Footer from '../cards/Footer/Footer';
const datafetch = async () => {
    const response = await axios.get("http://localhost:3000/user/books");
    return response.data;
};

export default function Landing() {
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
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["books"],
        queryFn: datafetch,
    });

    if (isLoading) {
        return <div className='h-screen w-full flex justify-center items-center'>
            Loading...
        </div>;
    }
    if (isError) {
        return <div className='h-screen w-full flex justify-center items-center'>
            {error.message || JSON.stringify(error)}
        </div>;
    }
    return <div className=' h-screen w-full flex flex-col justify-start items-center pt-20'>
        <Navbar />
        <HeroImage />
        <p className='w-full text-center pb-5 text-4xl font-semibold'>Books we offer!</p>
        <div className='m-0 grid grid-cols-3 gap-5'>
            {data.message.map((book)=>{
                return <NonUserBookCard discription={book.discription} imgurl={book.imgurl} name={book.name} author={book.author} price={book.price}></NonUserBookCard>
            })}
        </div>
        <Footer />
    </div>;
}