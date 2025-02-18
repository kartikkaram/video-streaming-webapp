import { Button } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/useSidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import UserAvatar from '@/app/components/user-avatar'
import LiveBadge from '@/app/components/live-badge'
import { Skeleton } from '@/app/components/ui/skeleton'

function UserItem({
    username, 
    imageurl, 
    isLive
}) {

    const pathname=usePathname()

    const {collapsed}=useSidebar((state)=>state)

    const href=`/${username}`

    const isActive=pathname===href

  return (
    <div>
      <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12 ",
        collapsed ? "justify-center":"justify-start",
        isActive && "bg-accent"
      )}
      >
<Link href={href} >
<div className={cn(
    "flex items-center w-full gap-x-2",
    collapsed&& "justify-center"
)}>
<UserAvatar
imageurl={imageurl}
username={username}
isLive={isLive}
/>{!collapsed && <p className='trunket'>{username}</p>}
{!collapsed && isLive && <LiveBadge className="ml-auto"/>}
</div>
</Link>
      </Button>
    </div>
  )
}
export const UserItemSkeleton=() => {
  
    return (
        <li className=' flex items-center gap-x-4 px-3 py-2'>
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className='flex-1'>
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}


export default UserItem
