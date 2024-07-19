import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminNav from "../adminNav";
import axios from "axios";
import { TrashIcon } from "lucide-react";
export default function AdminSeller(){
    const queryClient = useQueryClient()
    const MutateDeleteSeller = useMutation({
        mutationFn:async (id)=>{
            console.log(id)
            const data = await axios.post("http://localhost:3000/admin/deleteseller",{
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
    const data = useQuery({
        queryKey:["seller data"],
        queryFn:async ()=>{
            const data = await axios.get("http://localhost:3000/admin/seller")
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
        {data.data.message.map((seller)=>{
            return <div className=" relative flex justify-center items-center flex-col h-32 w-80  rounded-lg border-2 border-gray-100 shadow-sm ">
                <button onClick={()=>{
                    MutateDeleteSeller.mutate(seller._id)
                    console.log("delete")
                }} className="absolute top-1 right-1"><TrashIcon></TrashIcon></button>
                <p className="font-bold text-xl">{seller.name}</p>
                <p>{seller.email}</p>
            </div>
        })}
        </div>
    </div>
}