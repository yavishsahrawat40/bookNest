import React, { useEffect } from "react";
import AdminNav from "../adminNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NonUserBookCard from "../cards/nonuserbookcard";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
export default function AdminBooks(){
    const cookie= new Cookies()
    const token = cookie.get('token')
    const navigate = useNavigate()
    if(!token){
        useEffect(()=>{
            navigate("/")
        },[])
    }
    if(token){
        const decode = jwtDecode(token)
        if(decode.role=="admin"){
            const QueryAdminBooks = useQuery({
                queryKey:["Admin Books"],
                queryFn:async ()=>{
                    const data = await axios.get("http://localhost:3000/admin/books")
                    return data.data
                }
            })
            if(QueryAdminBooks.isLoading){
                return <div className="h-screen w-full flex justify-center items-center">
                    <AdminNav></AdminNav>
                Loading...
            </div>
            }
            return <div className="h-screen w-full flex justify-center items-start pt-20">
                <AdminNav></AdminNav>
                <button className="bg-black text-white px-3 py-2 rounded-lg flex justify-center items-center fixed bottom-4 right-5" onClick={()=>{
                    navigate("/addproduct")
                }}>Add Book</button>
                <div className="grid grid-cols-3 gap-5">
                {QueryAdminBooks.data.message.map((book)=>{
                    return <NonUserBookCard price={book.price} discription={book.discription} id={book._id} imgurl={book.imgurl} name={book.name} author={book.author}></NonUserBookCard>
                })}
                </div>
            </div>
        }else{
            useEffect(()=>{
                navigate(`/${decode.role}`)
            },[])
        }
    }
   
}