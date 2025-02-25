import { checkIsFollowing } from '@/lib/follow-service/checkisfollowing'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import Action from './_components/action'
import { checkIfBlocked } from '@/lib/block-service/checkifblocked'
import { getBlockList } from '@/lib/block-service/getblocklist'
import { getFollowList } from '@/lib/follow-service/getfollowlist'

async function Userpage({params}) {

    const  {username}  = await params
const user= await getUserByUsername(username)

if(!user){
    notFound()
}

const blockList=await getBlockList()

const followList=await getFollowList()


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
        <div className='flex gap-6'>
<div>

        <div>blocked list</div>
        {
          blockList.map((user) => {
            return <div key={user.blockedusers[0]._id}>
              {user.blockedusers[0].username}
            </div>
          }
          
        )
      }
      </div>
      <div>

      <div>following list</div>
      {followList.map((user) => {
      return  <div key={user.followedusers[0]._id}>
          {user.followedusers[0].username}
        </div>
      }
    )}
      </div>
    </div>
    </>
  )
}

export default Userpage
