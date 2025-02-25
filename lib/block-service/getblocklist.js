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
      
      const blockListMongodb= await Block.aggregate(
        [
         {
             $match:{blockedby:self._id}
         },
         {
             $lookup:{
                 from:"users",
                 as:"blockedusers",
                 localField:"blocked",
                 foreignField:"_id"
             }
         },
         {
             $project:{
                 _id:0,
                 blockedusers:{
                 $map:{
                     input:"$blockedusers",
                     as:"user",
                     in:{
                         username:"$$user.username",
                         _id:"$$user._id",
                         imageurl:"$$user.imageurl"
                    }
                 }
             }
         }
         }
        ]
      )
         
  
   if(!blockListMongodb){
  throw new Error("no blocked users")
   }
 
   const blockList=blockListMongodb.map((user) => {
     if(user){
       return {
        ...user,
        blockedusers:user.blockedusers.map((blocked)=>({
          ...blocked,
          _id:blocked._id.toString()
        }))
       }
     }
     return user
   }
   
   )
  
   return blockList
 } catch (error) {
  console.log("error",error.message)
  throw new Error(error.message || "internal error")
 }

}

// if you get user using mongoose query such as find one findbyid etc you dont need to use new mongoose.ObjectId(self._id) because the self._id is already an instance of ObjectId