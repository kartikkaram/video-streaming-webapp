import StreamPlayer from '@/components/stream-player'
import { getUserAndStreamByUsername} from '@/lib/user-service'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function UserDashboard({params}) {

const username= await params


const externalUser=await currentUser()

const {user, followed, followCount} =await getUserAndStreamByUsername(username.username)



if(!user || !user.stream || externalUser.id !== user.clerkid ){
  
throw new Error("unauthorized")
}


  return (
    <div>
      <StreamPlayer 
      user={user}
      isFollowing={followed}
      followCount={followCount}
      />
    </div>
  )
}

export default UserDashboard
