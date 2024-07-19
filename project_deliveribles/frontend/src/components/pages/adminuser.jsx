import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminNav from "../adminNav";
import axios from "axios";
import { TrashIcon } from "lucide-react";

export default function AdminUser(){
    const queryClient = useQueryClient()
    const MutateDeleteUser = useMutation({
        mutationFn:async (id)=>{
            console.log(id)
            const data = await axios.post("http://localhost:3000/admin/deleteuser",{
                id:id
            })
            return data.data
        },
        onSettled:()=>{
            queryClient.invalidateQueries({
                queryKey:[]
            })
        }
        
    })
    const data =  useQuery({
        queryKey:["user data"],
        queryFn:async ()=>{
            const data = await axios.get("http://localhost:3000/admin/user")
            return data.data
        }
    })
    if(data.isLoading){
        return <div className="h-screen  w-full flex justify-center items-center">
            <AdminNav></AdminNav>
        Loading...
    </div>
    }
    if(data.isError){
        return <div className="h-screen  w-full flex justify-center items-center">
            {data.error}
        </div>
    }
    return <div className="min-h-screen w-full pt-20 flex  justify-center items-start">
    <AdminNav></AdminNav>
    <div className="  grid grid-cols-4 gap-5">
    {data.data.message.map((user)=>{
        return <div className=" flex relative justify-center items-center flex-col h-32 w-80  rounded-lg border-2 border-gray-100 shadow-sm ">
            <button onClick={()=>{
                console.log("delete")
                MutateDeleteUser.mutate(user._id)
            }} className="absolute right-1 top-1"><TrashIcon></TrashIcon></button>
            <p className="font-bold text-xl">{user.username}</p>
            <p>{user.email}</p>
        </div>
    })}
    </div>
</div>
}