"use server"
import { connect } from "@/db_connection/db_connection"
import { authService } from "@/lib/auth-service"
import { updatestreamthumbnail, updatestreamtitle } from "@/lib/stream-service/streamupdate.js"
import { Stream } from "@/models/stream.model"
import { revalidatePath } from "next/cache"









export async function updateStreamTitle({name, hostName}) {
    try {
        
       const updated= await updatestreamtitle({name})

       if(!updated){
        return false
       }

        revalidatePath(`/u/${hostName}`)
        revalidatePath(`/${hostName}`)

       return updated

    } catch (error) {
        console.log("something went wrong while updating stream title".error)
    }
}
export async function updateBio(bio) {
    try {
        await connect()
        const self=await authService()
        if(!self){
            throw new Error("user not authorised")
        }
       const updated= await Stream.findOneAndUpdate({ownerid:self._id},{bio})
      

       if(!updated){
        return false
       }

        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

       return true

    } catch (error) {

        console.log("something went wrong while updating stream title".error)
    }
}
export async function updateStreamThumbnail(hostName) {
    try {
        
       const updated= await updatestreamthumbnail()

       if(!updated){
        return false
       }
        revalidatePath(`/u/${hostName}`)
        revalidatePath(`/${hostName}`)
        

       return updated

    } catch (error) {
        console.log("something went wrong while updating stream title".error)
    }
}