import { Stream } from "@/models/stream.model"
import { WebhookReceiver } from "livekit-server-sdk"
import { headers } from "next/headers"



const receiver=new WebhookReceiver(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_SECRET_KEY
)

export async function POST(req) {
    
 try {
       const body= await req.text()

   
   const headerPayload=await headers()
   
   const authorization=headerPayload.get("Authorization")
   
   if (!authorization) {
       return new Response("No authorization header", { status: 400 });
     }
   
    const event=await receiver.receive(body,authorization)
   
    if (!event || !event.event) {
       return new Response("Invalid event data", { status: 400 })
     }
   

     if(event.event=== "ingress_started"){
   await Stream.findOneAndUpdate({
           ingressid:event.ingressInfo?.ingressId
       },{islive:true})
       
     }
     if(event.event=== "ingress_ended"){
      await Stream.findOneAndUpdate({
           ingressid:event.ingressInfo?.ingressId
       },{islive:false})
  
     }
   
     return new Response(`${event.event} received`);
   
 } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response("Internal Server Error", { status: 500 });
 }
}