import { cva } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"






const avatarSizes=cva(
    "",{
    variants:{
        size:{
            default:"h-8 w-8",
            lg:"h-11 w-11"
        }
    },
    defaultVariants:{
        size:"default"
    }
}
)

function WatcherAvatar(
    {
        username,
        size="lg",
        fallbackColor,
        viewerimage
    }
) {

    

  return (
    <div className='relative '>
        <Avatar className={cn(
            "rounded-md",
            avatarSizes({size})
        )}>
            <AvatarImage src={viewerimage} className=" rounded-md object-cover" />
            <AvatarFallback className="rounded-md"
  style={{ backgroundColor: fallbackColor }}>
                {username?.[0]?.toUpperCase()|| "U"}
            </AvatarFallback>
        </Avatar>
   </div>
  )
}


const WatcherAvatarSkeleton=(
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
  
  

export default WatcherAvatar
