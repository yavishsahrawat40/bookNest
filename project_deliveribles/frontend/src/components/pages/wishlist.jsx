import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import UserNav from "../userNav"
import WishlistCard from "../cards/wishlist"
import Footer from "../cards/Footer/Footer"
export default function Wishlist(){
    const cookie = new Cookies()
    const token = cookie.get('token')
    const navigate = useNavigate()
    if(!token){
        navigate('/')
    }
    else{
        const haha = jwtDecode(token)
        const data= useQuery({
            queryKey:[],
            queryFn:async ()=>{
                const value = await axios.post('http://localhost:3000/user/wishlist',{
                    id:haha.id
                })
                return value.data
            },
            
        },
            )
        if(data.isLoading){
            return <div className="flex justify-center items-center h-screen w-full">
                Loading...
            </div>
        }
        if(data.isError){
            return <div className="flex justify-center items-center h-screen w-full">
                {data.error}
            </div>
        }
        
        return <div className="min-h-screen w-full flex flex-col justify-start pt-20 items-center">
            
            <UserNav></UserNav>
            <div className="grid grid-cols-3 gap-5">
            {data.data.message.map((wish)=>{
                
                return <WishlistCard id={wish._id} imgurl={wish.imgurl} bookname={wish.bookname}></WishlistCard>
            })}
            </div>
            <Footer />
        </div>
    }
    
    
}