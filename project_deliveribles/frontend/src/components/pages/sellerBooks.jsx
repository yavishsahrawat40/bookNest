import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import SellerNav from "../sellerNav";
import { useNavigate } from "react-router-dom";
import BookCard from "../cards/bookCard";
import NonUserBookCard from "../cards/nonuserbookcard";
export default function SellerBook(){
    const navigate = useNavigate()
    const cookie = new Cookies()
    const token = cookie.get('token')
    
    if(!token){
        useEffect(()=>{
            navigate("/")
        },[])
    }
    if(token){
        const decode = jwtDecode(token)
        if(decode.role=="seller"){
            const SellerBooksQuery = useQuery({
                queryKey:["seller Books"],
                queryFn: async ()=>{
                    const data = await axios.post("http://localhost:3000/seller/books",{
                        id:decode.id
                    })
                    return data.data
                }
            })
            if(SellerBooksQuery.isLoading){
                return <div className="h-screen w-full flex justify-center items-center">
                    <SellerNav></SellerNav>
                    loading...
                </div>
            }
            return <div className="min-h-screen pb-10 w-full flex justify-center items-start pt-20">
                <SellerNav></SellerNav>
                <button className="bg-black text-white px-3 py-2 rounded-lg flex justify-center items-center fixed bottom-4 right-5" onClick={()=>{
                    navigate("/addproduct")
                }}>Add Book</button>
                <div className="grid grid-cols-3 gap-5"> 
                    {SellerBooksQuery.data.message.map((book,index)=>{
                        return <NonUserBookCard discription={book.discription} key={index} id={book._id} price={book.price} imgurl={book.imgurl} name={book.name} author={book.author} ></NonUserBookCard>
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