import React, { useEffect } from "react";
import UserCard from "../cards/userCard";
import UserNav from "../userNav";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HeroImage from "./HeroImage/HeroImage";
import Footer from "../cards/Footer/Footer";
export default function User(){
    const cookie = new Cookies()
    const token = cookie.get('token')
    const navigate = useNavigate()
    if(!token){
        useEffect(()=>{
            navigate('/')
        },[])
    }
    if(token){
        const decode = jwtDecode(token)
        if(decode.role="user"){
            return <div className="min-h-screen w-full flex flex-col justify-start items-center pt-20">
            <UserNav></UserNav>
            <HeroImage />
            <p className="text-3xl font-semibold pb-5 flex justify-center w-full items-center ">Books</p>
            <UserCard></UserCard>
            <Footer />
        </div>
        }
        else{
            useEffect(()=>{
                navigate(`/${decode.role}`)
            },[])
        }
    }
 
}