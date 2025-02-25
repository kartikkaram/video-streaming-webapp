import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { connect } from '@/db_connection/db_connection'
import { User } from '@/models/user.model'
import { Stream } from '@/models/stream.model'




export async function POST(req) {
  await connect()
  
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET
  
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }
  
  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)
  
  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')
  
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt
  
  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) 
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }
  
  // Do something with payload
  // For this guide, log payload to console
  
const eventType=evt.type
  if (eventType==='user.created') {
    const existingUser=await User.findOne({username:payload.data.username})
  
    if (existingUser) {
      return new Response({message:"user already exists", status:400, success:false})
    }
    
 const createdUser=await User.create({
    username:payload.data.username,
    email:payload.data.email_addresses[0].email_address,
    clerkid:payload.data.id,
    imageurl:payload.data.image_url
 })

 if(!createdUser){
  return new Response({message:"user was not created", status:400, success:false})
}


 const stream=await Stream.create({
  ownername:`${payload.data.username}'s stream`,
  ownerid:createdUser._id
 })


 if(!stream){
  return new Response({message:"stream model was not created", status:400, success:false})
}

  }

  if (eventType==='user.updated') {
    const user = await User.findOne({clerkid:payload.data.id})

    if(!user){
        return new Response({message:"user not found", status:400, success:false})
    }

    user.username = payload.data.username
    await user.save()

    console.log("updated")

    return new Response({message:"user updated", status:200,success:true
  })}

  if (eventType==='user.deleted') {
    
    const user = await User.findOne({clerkid:payload.data.id})
    if(!user){
        return new Response({message:"user not found", status:400, success:false})
       
    }
  await  User.deleteOne({clerkid:payload.data.id})

  return new Response({message:"user deleted", status:200,success:true})

  }

  return new Response('Webhook received', { status: 200 })
}