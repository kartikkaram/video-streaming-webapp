




import { cn } from '@/lib/utils'
import React from 'react'

function LiveBadge() {
  return (
    <div className={
        cn(
            "bg-rose-600 text-center px-[10px] py-[1.5px]  text-[10px] border border-background font-semibold tracking-wide rounded-md uppercase ml-2 "
        )
    }>
      Live
    </div>
  )
}

export default LiveBadge
