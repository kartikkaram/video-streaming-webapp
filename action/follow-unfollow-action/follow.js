"use server"


import { follow } from "@/lib/follow-service/follow"
import { revalidatePath } from "next/cache"

export const onFollow=async (userId,username) => {
  
 try {
// this works same as an api call and it is easier

 const followed=await follow(userId)

//  console.log(followed)
revalidatePath("/");


if(!followed){
    throw new Error("You are already following this user.")
}

 if (username) {
     revalidatePath(`/${username}`)
}

 return username

 } catch (error) {

    console.error("Error during follow:", error)

    throw new Error(error.message || "internal error")


 }


}
