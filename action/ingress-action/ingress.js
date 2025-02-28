"use server"

import {
IngressAudioEncodingPreset,
IngressInput,
IngressClient,
IngressVideoEncodingPreset,
RoomServiceClient,
TrackSource,
} from 'livekit-server-sdk'

import { connect } from '@/db_connection/db_connection'

import { authService } from '@/lib/auth-service'
import { Stream } from '@/models/stream.model'
import { revalidatePath } from 'next/cache'




const roomService=new RoomServiceClient(
    process.env.LIVEKIT_API_URL,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_SECRET_KEY,   
)

const ingressClient=new IngressClient(process.env.LIVEKIT_API_URL)


export const resetIngresses =async function (hostIdentity) {
    const ingresses=await ingressClient.listIngress({
        roomName:hostIdentity
    })

    const rooms=await roomService.listRooms([hostIdentity])

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }

    for (const room of rooms) {
        await roomService.deleteRoom(room.name)
    }
}

export const  createIngress =async function (ingressType) {

try {

    await connect()
    
    const self=await authService()
    await resetIngresses(self._id)
    
    
    
    const options ={
    name:self.username,
    roomName:self._id,
    participantName:self.username,
    participantIdentity:self._id
    }
    
    if (ingressType===IngressInput.RTMP_INPUT) {
        options.video={
            source:TrackSource.CAMERA,
            preset:IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
        }
        options.audio={
            source:TrackSource.MICROPHONE,
            preset:IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        }
    }
    const ingress= await ingressClient.createIngress(
        ingressType,
        options
    )
    
    if(!ingress || !ingress.url || !ingress.streamKey){
        throw new Error("failed to create ingress")
    }
    
    
    await Stream.findOneAndUpdate({ownerid:self._id},{
        ingressid:ingress.ingressId,
        serverurl:ingress.url,
        streamkey:ingress.streamKey
    })
    
    revalidatePath(`/u/${self.username}/keys`)
    
    return ingress
} catch (error) {
    throw new Error(error.message || "internal error")
}

}





