import { connect } from "@/db_connection/db_connection"
import { Stream } from "@/models/stream.model"
import { authService } from "../auth-service"
import { Block } from "@/models/block.model"



export const getSearch=async(term)=>{

    await connect()

    const self=await authService()

 const stream = await Stream.find({
  $or: [
    { ownername: { $regex: term, $options: "i" } },
    { title:     { $regex: term, $options: "i" } }
  ]
})
.populate("ownerid", "username imageurl _id")
.select("-_id -ingressid -streamkey -serverurl -ischatdelayed -ischatenabled -ischatfollowersonly")
.sort({ updatedAt: 1 });



    if(self){
        const blockedUser=await Block.find({blockedby:self._id})
        const blocked=blockedUser.map((blocked)=>blocked.blocked.toString())
        const set=new Set(blocked)
      const streamFeed=stream.filter((stream)=>{
        if(!set.has(stream.ownerid._id.toString())){
            return stream
        }
      })

     
    return streamFeed
    }

    return stream



}