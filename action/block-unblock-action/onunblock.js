"use server"



import { unBlock } from "@/lib/block-service/unblock-user"
import { revalidatePath } from "next/cache"

export const onUnBlock=async (userId,username) => {
  
 try {
// this works same as an api call and it is easier

 const unBlockedUser=await unBlock(userId)
console.log("unblock",unBlockedUser)
//  console.log(followed)
revalidatePath("/");

if(!unBlockedUser){
    throw new Error("coudnt unblock.")
}

 if (username) {
     revalidatePath(`/${username}`)
}

 return unBlockedUser

 } catch (error) {
 
    console.error("Error during unblocking:", error)

    throw new Error(error.message || "internal error")

 }


}
