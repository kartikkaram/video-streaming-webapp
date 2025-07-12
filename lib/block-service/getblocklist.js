import {connect} from '@/db_connection/db_connection'
import { authService } from '@/lib/auth-service'
import { Block } from '@/models/block.model'
import mongoose,{ ObjectId} from 'mongoose'









export async function getBlockList(){


 try {

  await connect()

      const self = await authService()
  
      if (!self || !self._id) {
          throw new Error("not authorized")
      }
      
     const blockList=await Block.find({blockedby:self._id}).populate("blocked", "username imageurl _id ")
  
   return blockList
 } catch (error) {
  console.log("error",error.message)
  return []
 }

}

// if you get user using mongoose query such as find one findbyid etc you dont need to use new mongoose.ObjectId(self._id) because the self._id is already an instance of ObjectId