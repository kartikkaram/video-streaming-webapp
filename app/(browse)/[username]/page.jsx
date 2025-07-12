
import { getUserAndStreamByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'

import { checkIfBlocked } from '@/lib/block-service/checkifblocked'

import StreamPlayer from '@/components/stream-player'

async function Userpage({params}) {

    const  username  = await params
const {user, followed, followCount} =await getUserAndStreamByUsername(username.username)


if(!user || !user.stream){

  notFound()
}
const {selfBlockedOther,otherBlockedSelf}=await checkIfBlocked(user._id)
if(selfBlockedOther || otherBlockedSelf){
  console.log("here")
  notFound()
}





  return (
     <div className='w-full'>
      <StreamPlayer 
      user={user}
      isFollowing={followed}
      followCount={followCount}
      />
    </div>
  )
}

export default Userpage
