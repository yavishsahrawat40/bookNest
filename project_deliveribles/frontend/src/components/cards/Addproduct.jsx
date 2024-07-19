import { useMutation } from "@tanstack/react-query";
import SellerNav from "../sellerNav";
import { Label } from "../ui/label";
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
export default  function Addproduct(){
    const cookie = new Cookies()
    const token =  cookie.get('token')
    const decoded = jwtDecode(token)
    const [price,Setprice]=useState(0)
    const [imgurl,setImgurl] = useState("")
    const [name,setName] = useState("")
    const [AuthorName,setAuthorName] = useState("")
    const [discription,SetDiscription]=useState("")
    const MutateAddProduct = useMutation({
        mutationFn: async ()=>{
            const data = await axios.post("http://localhost:3000/seller/addbook",{
                name:name,
                author:AuthorName,
                imgurl:imgurl,
                seller:decoded.id,
                price:price,
                discription:discription
            })
            return data.data
        },
        onSettled:(data,error)=>{
            if(data){
                alert(JSON.stringify(data))
                console.log(data)
            }if(error){
                console.log(error)
            }
        }
    })
    return <div className="h-screen  w-full flex justify-center items-center">
        
        <SellerNav></SellerNav>
        <div className="h-96  w-80 border-2 border-gray-400 rounded-lg flex flex-col justify-around items-center p-2 ">
        <input type="file"onChange={ async (e)=>{
          const files = e.target.files
          const data = new FormData()
          if(files){
          data.append("file",files[0])
          data.append("upload_preset","GFGVITAP")
          const res = await fetch(`https://api.cloudinary.com/v1_1/djzuoefwo/image/upload`,{
            method:"POST",
            body:data
          })
          const file = await res.json()
          setImgurl(file.secure_url)
        }
       }}></input>
            <Label className="flex justify-start items-center w-full">BookName</Label>
            <input onChange={(e)=>{
                setName(e.target.value)
            }} className="border-2 border-gray-400 w-full rounded-lg p-2" placeholder="book name"></input>
            <Label className="flex justify-start items-center w-full">Author Name</Label>
            <input onChange={(e)=>{
                setAuthorName(e.target.value)
            }} className="border-2 border-gray-400 w-full rounded-lg p-2" placeholder="author name"></input>
            <Label className="flex justify-start items-center w-full">price</Label>
            <input onChange={(e)=>{
                Setprice(e.target.value)
            }} className="border-2 border-gray-400 w-full rounded-lg p-2" placeholder="price"></input>
            <Label className="flex justify-start items-center w-full">Discription</Label>
            <input onChange={(e)=>{
                SetDiscription(e.target.value)
            }} className="border-2 border-gray-400 w-full rounded-lg p-2" placeholder="Discription"></input>
            <button onClick={()=>{
                MutateAddProduct.mutate()
            }} className="px-3 py-2 bg-black text-white rounded-lg">Done</button>
        </div>
    </div>
}