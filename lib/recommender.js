import { connect } from '@/db_connection/db_connection'
import { User } from '@/models/user.model'
import { currentUser } from '@clerk/nextjs/server'

connect()


const recommender=async function() {
    
  try {
//for testing skeleton
    // await new Promise((resolve) => setTimeout(resolve, 5000))

      const self = await currentUser()
  
      if(!self ){
        const  List= await User.find({}).sort({ createdAt: 1 }).lean().select("username clerkid  imageurl -_id")
        return List
     }
      const  userList= await User.find({
       clerkid:{$ne:self.id}
      }).sort({ createdAt: 1 }).lean().select("username clerkid  imageurl -_id")

   
      return userList
  
  } catch (error) {
    console.log("recommender list was not loaded",error.message)
    return []
  }
}


export {recommender}