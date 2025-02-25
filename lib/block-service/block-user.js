import { connect } from "@/db_connection/db_connection";
import { authService } from "@/lib/auth-service";
import { User } from "@/models/user.model";
import { Block } from "@/models/block.model";
import { Follow } from "@/models/follow.model";




const block=async (otherUserId) => {
  
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
  
      const existingBlock=await Block.findOne(
          {
            blocked:otherUser._id ,
            blockedby:self._id,
          }
      )
  
      if(existingBlock){
     
          throw new Error("you have already blocked this user")
      }
  
      const blockDoc=await Block.create({
          blocked:otherUser._id ,
          blockedby:self._id,
          isblocking:true
      })
  
      await Follow.findOneAndDelete(
        {
            followedto:otherUser._id ,
             followedby:self._id
        }
      )
      return !!blockDoc

  } catch (error) {
    
    console.log(error.message || "internal error while blocking")

return false

  }

}


export {block}
