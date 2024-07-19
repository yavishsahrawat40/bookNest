import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
export default function OrderCard(props){
    const queryclinet = useQueryClient()
    const [check,setCheck]= useState(false)
    const MutateDelete = useMutation({
        mutationFn:async ()=>{
            console.log(props.id)
            const data = await axios.post("http://localhost:3000/user/deleteorder",{
                id:props.id
            })
            console.log(data.data)
            return data.data
        },
        onSettled:()=>{
            queryclinet.invalidateQueries({queryKey:[]})
        }
    })
    return <div onMouseEnter={()=>{
        setCheck(true)
    }} 
    onMouseLeave={()=>{
        setCheck(false)
    }}
    className=" m-4 w-80 h-72  flex relative  rounded-lg border-2 border-gray-300 shadow-md">
        <button onClick={()=>{
            MutateDelete.mutate()
        }} className={`${(check)?"":"hidden"} absolute top-1 right-1  bg-zinc-700 text-white rounded-lg p-1`}><TrashIcon></TrashIcon></button>
        <div className="h-70 w-32  rounded-l-lg" >
        <img src={props.imgurl} alt="image" className="h-full w-full rounded-l">
        </img>
        </div>
        <div className="h-72 w-48 flex flex-col justify-around items-start pl-2">
        <p>
        <span className="font-semibold">Name:</span>{props.name}
        </p>
        <p>
        <span className="font-semibold">Ordered at:</span> {props.orderedat}
        </p>
        </div>
    </div>
}