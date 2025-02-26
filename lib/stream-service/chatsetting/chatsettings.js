import { connect } from "@/db_connection/db_connection";
import { getStreamDocument } from "../getstream";




export async function updateChatSettings(value, field) {
    
try {

    await connect()

    const streamDocument=await getStreamDocument()
    
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