"use server"



import { unFollow } from "@/lib/follow-service/unfollow"
import { revalidatePath } from "next/cache"

export const onUnfollow=async (userId,username) => {
  
 try {
// this works same as an api call and it is easier

 const unFollowed=await unFollow(userId)

//  console.log(followed)
revalidatePath("/");

if(!unFollowed){
    throw new Error("coudnt unfollow.")
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
