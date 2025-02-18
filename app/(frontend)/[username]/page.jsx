import { checkIsFollowing } from '@/lib/follow-service/checkisfollowing'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React from 'react'
import Action from './_components/action'

async function Userpage({params}) {

    const  {username}  = await params
const user= await getUserByUsername(username)

if(!user){
    notFound()
}

const isFollowing = await checkIsFollowing(user._id)


  return (
    <>
      <p>username: {user.username}</p>
      <p>user email : {user.email}</p>
      <p>is following: {`${isFollowing}`}</p>
      <Action isFollowing={isFollowing} userId={user._id} username={user.username} />
    </>
  )
}

export default Userpage
