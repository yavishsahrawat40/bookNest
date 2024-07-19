import React, { useEffect } from "react";
import AdminNav from "../adminNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderCard from "../cards/orderCard";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
export default function Adminorder(){
    const cookie= new Cookies()
    const token = cookie.get('token')
    const navigate = useNavigate()
    if(!token){
        useEffect(()=>{
            navigate("/")
        },[])
    }if(token){
        const decode =  jwtDecode(token)
        if(decode.role=="admin"){
            const QueryAdminOrders = useQuery({
                queryKey:["Admin orders"],
                queryFn:async ()=>{
                    const data = await axios.get("http://localhost:3000/admin/orders")
                    return data.data
                }
            })
        
            if(QueryAdminOrders.isLoading){
                return <div className="h-screen w-full flex justify-start items-center">
                    <AdminNav></AdminNav>
                    Loading...
                </div>
            }
            return <div className="h-screen w-full flex justify-center items-start pt-20">
                <AdminNav></AdminNav>
                <div className="grid grid-cols-3 gap-5">
                {QueryAdminOrders.data.message.map((order)=>{
                   return <OrderCard id={order._id} imgurl={order.imgurl} name={order.bookname} orderedat={order.createdAt.slice(0,10)}></OrderCard>
                })}
                </div>
            </div>
        }
        else{
            useEffect(()=>{
                navigate(`/${decode.role}`)
            },[])
        }
    }
   
}