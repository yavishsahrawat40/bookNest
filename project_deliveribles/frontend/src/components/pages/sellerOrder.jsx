import React, { useEffect } from "react";
import SellerNav from "../sellerNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import OrderCard from "../cards/orderCard";
import { useNavigate } from "react-router-dom";
export default function SellerOrder(){
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
        if(decode.role=="seller"){
        const QuerySellerOrders = useQuery({
                queryKey:["seller orders"],
                queryFn:async ()=>{
                    const data = await axios.post("http://localhost:3000/seller/orders",{
                        id:decode.id
                    })
                    return data.data
                }
            })
            if(QuerySellerOrders.isLoading){
                return <div className="h-screen w-full flex justify-center items-center">
                    <SellerNav></SellerNav>
                Loading...
            </div>
            }
            if(QuerySellerOrders.isError){
                return <div className="h-screen w-full flex justify-center items-center">
                {QuerySellerOrders.error}
            </div>
            }
            return <div className="h-screen w-full flex justify-center items-start pt-20">
                <SellerNav></SellerNav>
                <div className="grid grid-cols-3 gap-5">
                {QuerySellerOrders.data.message.map((order)=>{
                     return <OrderCard imgurl={order.imgurl} name={order.bookname} orderedat={order.createdAt.slice(0,10)}></OrderCard>
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