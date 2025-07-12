import { connect } from '@/db_connection/db_connection'
import { User } from '@/models/user.model'
import { getFollowList } from './follow-service/getfollowlist'
import { getBlockList } from './block-service/getblocklist'
import { authService } from '@/lib/auth-service'
import mongoose from 'mongoose'



const recommender=async function() {
  
  try {
    
    await connect()
    
    //for testing skeleton
    // await new Promise((resolve) => setTimeout(resolve, 5000))

      const self = await authService()
  
      if(!self || !self._id ){
      const  List= await User.find({}).sort({ createdAt: 1 }).lean().select("username clerkid  imageurl -_id")
       return List
     }
     const followlist=await getFollowList() 
     const blocklist=await getBlockList() 

     const blockedIds= blocklist.map((user) => {
       return user.blocked._id
     } 
     )
     const followerIds= followlist.map((user) => {
       return user.followedusers[0]._id
     }
     )

     const Ids=[...blockedIds,...followerIds, self._id]


     const exclusionIds=Ids.map((id) => new mongoose.Types.ObjectId(id))

    
     const userList= await User.aggregate([
      {
        $match:{  _id:{$nin:exclusionIds}}
      },
      {
        $limit:20
      },
      {
        $lookup:{
          from:"streams",
          as:"streaminfo",
          localField:"_id",
          foreignField:"ownerid"
        }
      },
      {
        $unwind: { path: "$streaminfo", preserveNullAndEmptyArrays: true }
      },
      {
        $project:{
          username:1,
          imageurl:1,
          clerkid:1,
          _id:0,
          streaminfo: "$streaminfo.islive"
        }
        },
     ])
     if (!userList) {
      console.log("server from recommender ")
    
     }

   
  return userList
  
  } catch (error) {
    return []
  }
}


export {recommender}

