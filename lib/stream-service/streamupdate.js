import { connect } from "@/db_connection/db_connection"
import { Stream } from "@/models/stream.model"
import { authService } from "../auth-service"



export const updatestreamtitle=async({name})=>{
try {
    await connect()

    const self=await authService()

    if(!self){
        throw new Error("unauthorised")
    }


   const stream= await Stream.findOneAndUpdate({ownerid:self._id},{title:name})

   if(!stream){
        throw new Error("stream was not updated")
    }

    return true

} catch (error) {
     throw new Error(error.message || "internal error while updating chat settings")
}

}
export const updatestreamthumbnail=async()=>{
try {
    await connect()

    const self=await authService()

    if(!self){
        throw new Error("unauthorised")
    }


   const stream= await Stream.findOneAndUpdate({ownerid:self._id},{thumbnail:""})

   if(!stream){
        throw new Error("stream was not updated")
    }

    return true

} catch (error) {
     throw new Error(error.message || "internal error while updating chat settings")
}

}