

import { cva } from 'class-variance-authority'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import LiveBadge from './live-badge'
import { Skeleton } from './ui/skeleton'




const avatarSizes=cva(
    "",{
    variants:{
        size:{
            default:"h-8 w-8",
            lg:"h-14 w-14"
        }
    },
    defaultVariants:{
        size:"default"
    }
}
)

function UserAvatar(
    {
        username,
        imageurl,
        isLive,
        showBadge,
        size="default"
    }
) {

    
    const canShowBadge=showBadge && isLive

  return (
    <div className='relative '>
        <Avatar className={cn(
            "",
            isLive && "ring-2 ring-rose-700 border border-background",
            avatarSizes({size})
        )}>
            <AvatarImage src={imageurl} className="object-cover" />
            <AvatarFallback>
                {username?.[0]?.toUpperCase()|| "U"}
            </AvatarFallback>
        </Avatar>
        {canShowBadge && (
            <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
                <LiveBadge />
            </div>
        )}
    </div>
  )
}


const UserAvatarSkeleton=(
    {
        size="default"
    }
)=> {
    return (
      <Skeleton
      className={cn(
          "rounded-full",
          avatarSizes({size})
      )}
      />
    )
  }
  
  

export default UserAvatar
