"use client"
import { useSidebar } from '@/store/useSidebar'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ToggleSkeleton } from './toggle'
import { RecommendedSkeleton } from './recommended'
import { FollowListSkeleton } from './followlist'
function Wrapper({children}) {
const [isClient, setIsClient]=useState(false)
    const {collapsed}=useSidebar((state)=>state)

useEffect(() => {
  setIsClient(true)
},[]
)

if(!isClient) return(
    <aside className={cn(
        'fixed bg-background left-0 flex flex-col  border-r border-[#2D3E35] z-50 h-full transition-all',
        collapsed ? "w-[70px]": "w-[70px] lg:w-60"
    )}>
        <ToggleSkeleton/>
        <FollowListSkeleton/>
        <RecommendedSkeleton/>
    </aside>
)


  return (
    <aside className={cn(
        'fixed bg-background left-0 flex flex-col  border-r border-[#2D3E35] z-50 h-full transition-all',
        collapsed ? "w-[70px]": "w-[70px] lg:w-60"
    )}>
        {children} 
    </aside>
)
}

export default Wrapper
