"use client"
import { useSidebar } from '@/store/useSidebar'
import React from 'react'
import UserItem, { UserItemSkeleton } from './user-item'
import { Skeleton } from '@/components/ui/skeleton'

function Followlist({
    data
}) {

    if(!data.length){
      return null
    }

    const {collapsed}=useSidebar((state)=>state)

  return (
    <>
    {!collapsed ?   <div className='pl-6 mb-4 overflow-hidden' >
        <p className='text-sm text-muted-foreground ml-4'>Following</p>
        <ul className='mt-2 mr-1'>
            {data.map((user, index) => {
              return <UserItem 
              key={index}
              username={user.followedusers[0].username}
              imageurl={user.followedusers[0].imageurl}
              isLive={true}
              />
            }
            )}
        </ul>
      </div>:
        <div>
        <ul className='mt-2 px-2 '>
            {data.map((user, index) => {
              return <UserItem 
              key={index}
              username={user.followedusers[0].username}
              imageurl={user.followedusers[0].imageurl}
              isLive={true}
              />
            }
            )}
        </ul>
      </div>}
    </>
  )
}

export const FollowListSkeleton=() => {
  
  return(
    <ul className='mt-4 px-2'>
    <li> <Skeleton className="h-6 w-[60%]  ml-5 mb-4" /></li>
{[...Array(3)].map((_,i)=>(
  <UserItemSkeleton key={i}/>
))}
    </ul>
  )
}





export default Followlist
