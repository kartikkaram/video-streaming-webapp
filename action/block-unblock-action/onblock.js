"use server"


import { block } from "@/lib/block-service/block-user";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache"





const roomService=new RoomServiceClient(
    process.env.LIVEKIT_API_URL,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_SECRET_KEY,   
)

export const onBlock=async (userId,username,hostId) => {
  
 try {
// this works same as an api call and it is easier
try {
     const blocked=await block(userId)
} catch (error) {
    roomService.removeParticipant(hostId, userId)
}


revalidatePath("/");


 if (username) {
     revalidatePath(`/${username}`)
}

 return username

 } catch (error) {

    console.error("Error during blocking:", error)

    throw new Error(error.message || "internal error")


 }


}
