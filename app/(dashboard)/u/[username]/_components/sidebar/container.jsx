"use client"

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/useCreatorSidebar'
import React, { useEffect } from 'react'
import useMedia from 'use-media'


function Container({children}) {


    const {collapsed,
        onExpand,
        onCollapse
    }=useCreatorSidebar((state)=>state)

const matches=useMedia({maxWidth:1024})
useEffect(() => {
 if (matches) {
  onCollapse()
 } else {
  onExpand()
 }
},[matches, onCollapse, onExpand]
)


  return (
    <div className={cn("transition-all w-full",
       collapsed ? "ml-[70px]":"ml-[70px] lg:ml-60"
    )}>
      {children}
    </div>
  )
}

export default Container
