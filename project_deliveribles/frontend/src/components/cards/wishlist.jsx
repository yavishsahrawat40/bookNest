import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { TrashIcon } from "lucide-react"
import Footer from "./Footer/Footer"
export default function WishlistCard(props){
    const queryclinet = useQueryClient()
    const MutateWishlistDelete = useMutation({
        mutationFn: async ()=>{
            console.log(props.id)
            const data = await axios.post("http://localhost:3000/user/deletewishlist",{
                id:props.id
            })
            console.log(data.data)
            return  data.data
        },
        onSettled:()=>{
            
            queryclinet.invalidateQueries({queryKey:[]})
        }
    })
    return <div className="m-4 h-72 relative w-80 flex border-2 border-gray-300 rounded-lg">
    <button onClick={()=>{
        MutateWishlistDelete.mutate()
console.log("hah")
}} className=" absolute top-1 right-1  bg-zinc-700 text-white rounded-lg p-1"><TrashIcon></TrashIcon></button>
    <div className="h-70 w-32 ">
        <img className="w-full h-full" src={props.imgurl} alt="image">
        </img>
    </div>
    <div className="flex justify-center h-full w-48 items-center">
    <p>
         {props.bookname}
    </p>
    </div>
</div>
}