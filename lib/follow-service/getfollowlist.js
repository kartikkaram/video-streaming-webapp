import {connect} from "@/db_connection/db_connection"
import { authService } from "@/lib/auth-service"
import { Follow } from "@/models/follow.model"




export async function getFollowList(){
    
    try {
    await connect()
    const self=await authService()
    
    if (!self) {
        throw new Error("not authorised")
    }
    
    const followListMongodb=await Follow.aggregate(
        [
            {
                $match:{followedby:self._id}
            },
            {
                $lookup:{
                    from:"users",
                    as:"followedusers",
                    localField:"followedto",
                    foreignField:"_id"
                }
            },
            {
                $project:{
                    _id:0,
                    followedusers:{
                        $map:{
                            input:"$followedusers",
                            as:"user",
                            in:{
                                username:"$$user.username",
                                _id:"$$user._id".toString(),
                                imageurl:"$$user.imageurl",
                            }
                        }
                    }
                }
            }
        ]
    )

    if (!followListMongodb) {
        throw new Error("error while fetching followlist")
    }
    const followList=followListMongodb.map((user) => {
  if (user) {
        return {
          ...user,followedusers:user.followedusers.map((following)=>({...following, _id:following._id.toString()}))
        }
  }
  return user
    }
    )
    
    return followList
} catch (error) {
    console.log("error",error.message)
    throw new Error(error.message || "internal error")
}

}