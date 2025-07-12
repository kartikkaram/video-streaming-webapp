"use client";
import React, { useRef, useState } from 'react'
import { LucideSendHorizonal } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { ChatInfo } from './chat-info';
import Emoji from './emoji-picker';
function ChatForm({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed,
    isHost
}) {

  
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing && !isHost;
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

const handleSubmit=(e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(value)

    if (!value || isDisabled) return;

    if(isDelayed && !isDelayBlocked){
        setIsDelayBlocked(true)
        setTimeout(() => {
            setIsDelayBlocked(false)
            onSubmit()
        }, 3000);
    } else {
        onSubmit();
      }

}


  // if the chat is hidden, we don't render the chat form
  if (isHidden) {
    return null;
  }

  return (
    <form 
    onSubmit={handleSubmit} 
    className="flex flex-col items-center gap-y-4 p-3"
  >
    <div className='flex flex-col w-full gap-2'>

      <ChatInfo
        isDelayed={isDelayed}
        isFollowersOnly={isFollowersOnly}
        />
        <div className='flex gap-2 w-full justify-center items-center'>

    <div className="w-full">
      <Input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={isDisabled}
        placeholder="Start chatting..."
        className={cn(
          "border-white/10",
          (isFollowersOnly || isDelayed) && "rounded "
        )}
        />
    </div>
        <div className='absolute right-20 bottom-4 bg-background pl-3'>
          <Emoji
         value={value}
         onChange={onChange}
          />
        </div>

    <div className="ml-auto">
      <Button
        type="submit"
        variant="fun"
        size="default"
        disabled={isDisabled}
        >
      <LucideSendHorizonal className='h-4 w-4'  />
      </Button>
          </div>
    </div>
        </div>
  </form>
  )
}


export const ChatFormSkeleton = () => {
    return (
      <div className="flex  items-center gap-y-4 p-3 w-full">
        <Skeleton className="w-full mr-2 h-10" />
        <div className="flex items-center gap-x-2 ml-auto">
          <Skeleton className="h-10 w-12" />
        </div>
      </div>
    );
  };

export default ChatForm
