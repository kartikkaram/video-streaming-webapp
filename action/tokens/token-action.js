"use server"

import { connect } from "@/db_connection/db_connection"
import { authService } from "@/lib/auth-service"
import { checkIfBlocked } from "@/lib/block-service/checkifblocked"
import { User } from "@/models/user.model"
import { secondsInMonth } from "date-fns/constants"
import { AccessToken } from "livekit-server-sdk"
import { v4 } from "uuid"








export async function createViewerToken(hostIdentity) {
    
   try {
     await connect()
 
     
 
     let self
 
     
         self=await authService()
         
     if(!self){
         const _id=v4()
         const username=`guest${Math.floor(Math.random()*1000)}`
         self={_id, username}
     }
     
     const selfId=self._id.toString()
 
     const host = await User.findById(hostIdentity)
 
     
     if(!host){
         throw new Error("user not found")
     }
     const hostId=host._id.toString()
 
     const isBlocked=await checkIfBlocked(hostIdentity)
 
 
     if(isBlocked.selfBlockedOther || isBlocked.otherBlockedSelf){
         throw new Error("user not found")
     }
 
     const ishost=hostId===selfId
     console.log(self.imageurl)
 
     const token=new AccessToken(
         process.env.LIVEKIT_API_KEY,
         process.env.LIVEKIT_SECRET_KEY,
         {
             // if viewer is host, identity is guest id for host, because host id is already configured in ingress action
             identity:ishost? `host-${selfId}`:selfId,
             name:self.username,
              metadata: JSON.stringify({
              imageurl: self.imageurl,
    }),
         }
     )
 
       // add grant permissions to viewer
 
       token.addGrant({
         room:hostId,
         roomJoin:true,
         canPublish: false,
         canPublishData: true,
       })
     
 
        // return token as jwt
   // jwt is used to connect to livekit server
   return token.toJwt();
   } catch (error) {
    throw new Error(error.message || "internal server error")
   }

}