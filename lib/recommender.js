import { connect } from '@/db_connection/db_connection'
import { User } from '@/models/user.model'
import { getFollowList } from './follow-service/getfollowlist'
import { getBlockList } from './block-service/getblocklist'
import { authService } from '@/lib/auth-service'



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
       return user.blockedusers[0]._id
     }
     )
     const followerIds= followlist.map((user) => {
       return user.followedusers[0]._id
     }
     )

     const exclusionIds=[...blockedIds,...followerIds, self._id]

    
      const  userList= await User.find({
       
        _id:{$nin:exclusionIds}
       
      }).sort({ createdAt: 1 }).lean().select("username clerkid  imageurl -_id")

   
      return userList
  
  } catch (error) {
    console.log("recommender list was not loaded",error.message)
    return []
  }
}


export {recommender}

