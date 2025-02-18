"use client"
import { onFollow } from '@/action/follow-unfollow-action/follow'
import { onUnfollow } from '@/action/follow-unfollow-action/unfollow'
import { Button } from '@/app/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

function Action({
isFollowing,
userId,
username
}) {

    const [ispending, startTransition]=useTransition()

    const handleUnfollow=() => {
        startTransition(() => {
            onUnfollow(userId,username)
            .then((data) =>
              toast.success(`you have now unfollowed ${data}`)  )
            .catch((err) =>
                toast.error(`something went wrong`))
        }
        )
    }

    const handleFollow=() => {
        startTransition(() => {
            onFollow(userId,username)
            .then((data) =>
              toast.success(`you are now following ${data}`)  )
            .catch((err) =>
                toast.error(`something went wrong`))
        }
        )
    }
    
    



    const onClick=() => {
     if (isFollowing) {
        handleUnfollow()
     }
     else{
        handleFollow()
     }
    }
    

  return (
    <div>
      <Button
      variant="custom"
      onClick={onClick}
    disabled={ispending}
      >
     {isFollowing? "unfollow":"follow"}
      </Button>
    </div>
  )
}

export default Action
