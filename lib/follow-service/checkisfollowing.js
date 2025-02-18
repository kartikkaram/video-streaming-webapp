import { connect } from "@/db_connection/db_connection";
import { authService } from "../auth-service";
import { User } from "@/models/user.model";
import { Follow } from "@/models/follow.model";



connect()

const checkIsFollowing=async (otherUserId) => {
  
try {
        const self=await authService()
    
        if (!self) {
            throw new Error("user not authorised")
        }
    
        const otherUser=await User.findById(otherUserId)
    
        if (!otherUser) {
            throw new Error("user not found")
        }
    
        const followed=await Follow.findOne(
            {
                followedto:otherUser._id ,
                 followedby:self._id
            }
        )
    
      
    
        return !!followed

} catch (error) {
    
    console.log(error.message || "Internal error");

return false
}

}

export {checkIsFollowing}