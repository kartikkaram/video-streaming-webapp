import { connect } from "@/db_connection/db_connection"
import { Stream } from "@/models/stream.model"
import { authService } from "../auth-service"
import { Block } from "@/models/block.model"



export const getFeed=async()=>{

    await connect()

    const self=await authService()

    const stream=await Stream.aggregate([
        {
            $match:{islive:true}
        },
        {
             $lookup:{
          from:"users",
          as:"user",
          localField:"ownerid",
          foreignField:"_id"
        }
    }, 
     {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true }
      },
       {
        $project:{
          ownername:1,
          thumbnail:1,
          title:1,
          bio:1,
          islive:1,
          ownerid :1,
          _id:0,
          user: {
        imageurl: "$user.imageurl",
        username: "$user.username"
      }
        }
        },
          {
    $sort: { updatedat: -1 } 
  }
    ])

    if(self){
        const blockedUser=await Block.find({blockedby:self._id})
        const blocked=blockedUser.map((blocked)=>blocked.blocked.toString())
        const set=new Set(blocked)
      const streamFeed=stream.filter((stream)=>{
        if(!set.has(stream.ownerid.toString())){
            return stream
        }
      })

     
    return streamFeed
    }

    return stream



}