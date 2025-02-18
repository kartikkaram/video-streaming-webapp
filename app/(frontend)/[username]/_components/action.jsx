"use client"
import { onBlock } from '@/action/block-unblock-action/onblock'
import { onUnBlock } from '@/action/block-unblock-action/onunblock'
import { onFollow } from '@/action/follow-unfollow-action/follow'
import { onUnfollow } from '@/action/follow-unfollow-action/unfollow'
import { Button } from '@/app/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

function Action({
isFollowing,
selfBlockedOther,
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
    const handleBlock=() => {
        startTransition(() => {
            onBlock(userId,username)
            .then((data) =>
              toast.success(`you blocked ${data}`)  )
            .catch((err) =>
                toast.error(`something went wrong`))
        }
        )
    }
    const handleUnBlock=() => {
        startTransition(() => {
            onUnBlock(userId,username)
            .then((data) =>
              toast.success(`you unblocked ${data}`)  )
            .catch((err) =>
                toast.error(`something went wrong`))
        }
        )
    }
    
    



    const followService=() => {
     if (isFollowing) {
        handleUnfollow()
     }
     else{
        handleFollow()
     }
    }
    
    const blockService=() => {
     if (selfBlockedOther) {
        handleUnBlock()
     }
     else{
        handleBlock()
     }
    }
    

  return (
    <div>
      <Button
      variant="custom"
      onClick={followService}
    disabled={ispending}
      >
     {isFollowing? "unfollow":"follow"}
      </Button>
      <Button
      variant="destructive"
      onClick={blockService}
      >
      {selfBlockedOther? "unblock":"block"}
      </Button>
    </div>
  )
}

export default Action
