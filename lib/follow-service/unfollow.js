import { connect } from "@/db_connection/db_connection";
import { authService } from "@/lib/auth-service";
import { User } from "@/models/user.model";
import { Follow } from "@/models/follow.model";




const unFollow=async (otherUserId) => {
  
  try {
   await connect()
      const self =await authService()
  
      if (!self) {
          throw new Error("user not authorised")
      }
  
      const otherUser=await User.findById(otherUserId).lean()

      //use lean to optimise the query a bit note: only use  when you don't need document methods (like .save() or .populate()) and want to reduce memory overhead. it converts mongoose document into a plain javascript object
      
      if (!otherUser) {
          throw new Error("user not found")
      }
  
      const existingFollower=await Follow.findOne(
          {
              followedto:otherUser._id ,
               followedby:self._id
          }
      )
  
      if(!existingFollower){
          throw new Error("you are not following this user")
      }
  
      const deletedResult=await Follow.deleteOne({
        followedto:otherUser._id ,
        followedby:self._id
      })
  

  if(deletedResult.deletedCount === 0){
    return false
  }
  
      return true

  } catch (error) {
    
    console.log(error.message || "internal error while unfollowing")

return false

  }

}


export {unFollow}