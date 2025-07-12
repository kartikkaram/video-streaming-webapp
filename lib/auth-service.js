import { User } from '@/models/user.model'
import { connect } from '@/db_connection/db_connection'
import { currentUser } from '@clerk/nextjs/server'






const authService=async() => {
    try {
    await connect()
      const self=await currentUser()
     if(!self || !self.username){
        throw new Error("unauthorized")
     }
      
     const user = await User.findOne({clerkid:self.id})
    
     if(!user){
        throw new Error("not found")
     }

  
      
      return user
    
} catch (error) {
    
    return null

}
}


export {authService}
