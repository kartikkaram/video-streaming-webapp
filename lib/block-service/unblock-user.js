import { connect } from "@/db_connection/db_connection";
import { authService } from "@/lib/auth-service";
import { User } from "@/models/user.model";
import { Block } from "@/models/block.model";





const unBlock=async (otherUserId) => {
  
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
               blockedby:self._id
          }
      )
  
      if(!existingBlock){
          throw new Error("you are not blocking this user")
      }
  
      const deletedResult=await Block.deleteOne({
        blocked:otherUser._id ,
               blockedby:self._id
      })
  

  if(deletedResult.deletedCount === 0){
    return false
  }
  
      return true

  } catch (error) {
    
    console.log(error.message || "internal error while unblocking")

return false

  }

}


export {unBlock}