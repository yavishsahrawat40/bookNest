import React from "react";
import Cookies from 'universal-cookie';
import {jwtDecode} from "jwt-decode"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "./bookCard";
export default function UserCard(){
    const cookie = new Cookies()
    const token = cookie.get('token')
    const decoded = jwtDecode(token)
    const BooksQuery = useQuery({
        queryKey:["All Books"],
        queryFn: async ()=>{
            const data = await axios.get("http://localhost:3000/user/books")
            return data.data
        }
    })
    if(BooksQuery.isLoading){
        return <div className="h-screen w-full flex justify-center items-center">
            Loading...
        </div>
    }
    if(BooksQuery.isError){
        return <div className="h-screen w-full flex justify-center items-center">
        Error
    </div>
    }
return <div className="flex justify-center items-start">    
    
    <div className="min-h-screen w-full grid grid-cols-3 gap-5 ">
       {BooksQuery.data.message.map((book)=>{
        return <BookCard discription={book.discription} price={book.price} seller={book.seller} imgurl={book.imgurl} name={book.name} author={book.author} id={book._id}  ></BookCard>
       })}
    </div>
    </div>
}