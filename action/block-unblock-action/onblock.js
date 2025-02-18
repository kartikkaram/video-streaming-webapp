"use server"


import { block } from "@/lib/block-service/block-user";
import { revalidatePath } from "next/cache"

export const onBlock=async (userId,username) => {
  
 try {
// this works same as an api call and it is easier

 const blocked=await block(userId)


revalidatePath("/");

if(!blocked){
    throw new Error("You have already blocked this user.")
}

 if (username) {
     revalidatePath(`/${username}`)
}

 return username

 } catch (error) {

    console.error("Error during blocking:", error)

    throw new Error(error.message || "internal error")


 }


}
