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
                $lookup:{
                    from:"streams",
                    as:"streaminfo",
                    localField:"followedto",
                    foreignField:"ownerid"
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
                                _id:"$$user._id",
                                imageurl:"$$user.imageurl",
                            }
                        }
                    },
                      streaminfo: "$streaminfo.islive"
                }
            }
        ]
    )

  
    const followList=followListMongodb.map((user) => {
  if (user) {
        return {
          ...user,followedusers:user.followedusers.map((following)=>({...following, _id:following._id.toString()}))
        }
        return user
  }
  return null
    }
    )

    
    return followList
} catch (error) {
    return []
}

}



