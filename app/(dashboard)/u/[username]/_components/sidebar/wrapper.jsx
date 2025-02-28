"use client"
import { useCreatorSidebar } from '@/store/useCreatorSidebar'
import React from 'react'
import { cn } from '@/lib/utils'
import { NavItemSkeleton } from './navitem'
function Wrapper({children}) {

    const {collapsed}=useCreatorSidebar((state)=>state)

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

