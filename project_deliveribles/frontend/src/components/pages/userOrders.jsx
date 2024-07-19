import React, { useEffect } from "react";
import UserNav from "../userNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import OrderCard from "../cards/orderCard";
import { useNavigate } from "react-router-dom";
import Footer from "../cards/Footer/Footer";

export default function UserOrder(){
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
            const QueryUSerOrders = useQuery({
                queryKey:["User Orders"],
                queryFn: async ()=>{
                    const data = await axios.post("http://localhost:3000/user/orders",{
                        id:decode.id
                    })
                    return data.data
                }
            })
            if(QueryUSerOrders.isLoading){
                return <div className="h-screen w-full flex justify-center items-center">
                   <UserNav></UserNav>
                    Loading...
                </div>
            }
            if(QueryUSerOrders.isError){
                return <div className="h-screen w-full flex justify-center items-center">
                    <UserNav></UserNav>
                    {QueryUSerOrders.error}
                </div>
            }
            return <div className="h-screen w-full flex flex-col justify-start pt-20 items-center">
                <p className="text-3xl font-semibold p-3">Orders</p>
                <UserNav></UserNav>
                <div className="grid grid-cols-3 gap-5">
                {QueryUSerOrders.data.message.map((order)=>{
                    return <OrderCard id={order._id} imgurl={order.imgurl} name={order.bookname} orderedat={order.createdAt.slice(0,10)}></OrderCard>
                })}
                </div>
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