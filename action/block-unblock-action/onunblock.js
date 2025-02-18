"use server"



import { unBlock } from "@/lib/block-service/unblock-user"
import { revalidatePath } from "next/cache"

export const onUnBlock=async (userId,username) => {
  
 try {
// this works same as an api call and it is easier

 const unBlocked=await unBlock(userId)

//  console.log(followed)
revalidatePath("/");

if(!unBlocked){
    throw new Error("coudnt unblock.")
}

 if (username) {
     revalidatePath(`/${username}`)
}

 return username

 } catch (error) {
 
    console.error("Error during unblocking:", error)

    throw new Error(error.message || "internal error")

 }


}
