import { connect } from "@/db_connection/db_connection";
import { authService } from "@/lib/auth-service";
import { User } from "@/models/user.model";
import { Block } from "@/models/block.model";



connect()

const checkIfBlocked=async (otherUserId) => {
  
try {
        const self=await authService()
    
        if (!self) {
            throw new Error("user not authorised")
        }
    
        const otherUser=await User.findById(otherUserId)
    
        if (!otherUser) {
            throw new Error("user not found")
        }
    
        const  selfBlockedOther=await Block.findOne(
            {
                blocked:otherUser._id ,
                blockedby:self._id
            }
        ) 
        
        const otherBlockedSelf=await Block.findOne(
            {
                blocked:self._id ,
               blockedby:otherUser._id
            }
        )
    
        
      
    
        return { selfBlockedOther:!!selfBlockedOther, otherBlockedSelf:!!otherBlockedSelf}

} catch (error) {
    
    console.log(error.message || "Internal error");

return false
}

}

export {checkIfBlocked}