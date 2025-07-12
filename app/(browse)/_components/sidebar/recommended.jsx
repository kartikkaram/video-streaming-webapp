"use client"

import { useSidebar } from '@/store/useSidebar'
import React from 'react'
import UserItem, { UserItemSkeleton } from './user-item'
import { Skeleton } from '@/components/ui/skeleton'

function Recommended({data}) {

    const {collapsed}=useSidebar((state)=>state)

    const showLabel=!collapsed && data.length >0
 
    const showIcon=collapsed && data.length>0

  return (
   <>
   {showLabel &&
   <div className='pl-6 mb-4 overflow-hidden'>
        <p className='text-sm text-muted-foreground ml-4'>Recommendeds</p>
    <ul className='mt-2 mr-1 '>
    { data.map(
        (user) => {
          return <UserItem
          key={user.clerkid}
          username={user.username}
          imageurl={user.imageurl}
          isLive={user.streaminfo}
          />
       }
    )}
   </ul>
    </div>
          }
    {
showIcon &&
      <div>
           <ul className='mt-2 px-2'>
    { data.map(
      (user) => {
        return <UserItem
        key={user.clerkid}
        username={user.username}
        imageurl={user.imageurl}
        isLive={user.streaminfo}
        />
      }
    )}
   </ul>
    </div>
  }
  {
    !showIcon && !showLabel &&
      <div>no Recommendeds</div>
    
  }
   </>
  )
}

export const RecommendedSkeleton=(
    {
        size="default"
    }
)=> {
    return (
      <ul className='mt-4 px-2'>
      <li> <Skeleton className="h-6 w-[60%]  ml-5 mb-4" /></li>
{[...Array(3)].map((_,i)=>(
    <UserItemSkeleton key={i}/>
))}
      </ul>
    )
  }

export default Recommended
