"use server"

import { authService } from "@/lib/auth-service"
import { updateChatSettings } from "@/lib/stream-service/chatsetting/chatsettings"
import { revalidatePath } from "next/cache"



export async function chatSettingToggler(value, field) {
try {
        if(!field){
            
            throw new Error("value or field is missing")
        }
    const settingsUpdated=await updateChatSettings(value, field)
    const self= await authService()
    revalidatePath("/")
    if (!self) {
        throw new Error("unauthorised")
    }
    revalidatePath(`/u/${self.username}/chat`)
    revalidatePath(`/u/${self.username}`)
    if (!settingsUpdated) {
        throw new Error("chat settings was not updated something went wrong")
    }
    return settingsUpdated
} catch (error) {
    throw new Error(error.message || "internal error while updating settings")
}
}