import {connect} from "@/db_connection/db_connection"
import { authService } from "../auth-service"
import { Stream } from "@/models/stream.model"



const getStreamDocument=async () => {
    try {
        await connect()
        
      const self=await authService()
      
  
      if (!self) {
          throw new Error("unauthorised")
      }
  
      const stream = await Stream.findOne({
        ownerid:self._id
      })
  
  

      if (!stream) {
          throw new Error("stream model not found")
      }
  
      return stream
  } catch (error) {
    throw new Error(error.message || "internal error while getting stream model")
  }

}

export {getStreamDocument}