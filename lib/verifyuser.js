import {connect} from "@/db_connection/db_connection"
import { authService } from "./auth-service"
import { User } from "@/models/user.model"



export async function verifyUser(username) {
  try {
    
    await connect()
     const self= await authService()
 
     if (!self) {
         throw new Error("not authorized")
     }
 
     const user = await User.findOne({username})
 
 
   if (!user) {
         throw new Error("not found")
     }
 
     if(user.username!==self.username){
         throw new Error("unauthorized")
     }
 
 return user   
   } catch (error) {
    console.log(error.message || "internal error")
    return null
   } 
}