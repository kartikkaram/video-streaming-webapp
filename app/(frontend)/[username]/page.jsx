import { checkIsFollowing } from '@/lib/follow-service/checkisfollowing'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import Action from './_components/action'
import { checkIfBlocked } from '@/lib/block-service/checkifblocked'

async function Userpage({params}) {

    const  {username}  = await params
const user= await getUserByUsername(username)

if(!user){
    notFound()
}

const {selfBlockedOther, otherBlockedSelf}= await checkIfBlocked(user._id)

const isFollowing = await checkIsFollowing(user._id)

const isBlocking=selfBlockedOther || otherBlockedSelf

if (isBlocking) {
  
}

  return (
    <>
      <p>username: {user.username}</p>
      <p>user email : {user.email}</p>
      <p>is following: {`${isFollowing}`}</p>
      <p>is Blocking: {`${selfBlockedOther}`}</p>
      <Action 
      isFollowing={isFollowing} 
      userId={user._id}
      username={user.username}
      selfBlockedOther={selfBlockedOther}  
        />
    </>
  )
}

export default Userpage
