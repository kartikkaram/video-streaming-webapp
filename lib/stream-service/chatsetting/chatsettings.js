import { connect } from "@/db_connection/db_connection";
import { getStreamDocument } from "../getstream";
import { authService } from "@/lib/auth-service";
import { Stream } from "@/models/stream.model";




export async function updateChatSettings(value, field) {
    
try {

  
    await connect()
   
    const self=await authService()
      
  
    if (!self) {
        throw new Error("unauthorised")
    }

    const streamDocument = await Stream.findOne({
      ownerid:self._id
    })

    
    if (!streamDocument) {
        throw new Error("stream document not found")
    }
    
    

    streamDocument[field]=value
    
    
    const savedDocument=await streamDocument.save()
    


    if(!savedDocument){
        throw new Error("chat settings was not updated something went wrong")
    }
    
    return true
} catch (error) {
    
    throw new Error(error.message || "internal error while updating chat settings")

}

}