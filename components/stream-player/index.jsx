"use client"
import userviewertoken from '@/hooks/userviewertoken'
import { cn } from '@/lib/utils'
import { LiveKitRoom } from '@livekit/components-react'
import React from 'react'
import Video, { VideoSkeleton } from './video'
import { useChatSidebar } from '@/store/useChatSidebar'
import Chat, { ChatSkeleton } from './chat'
import ChatToggle from './chat-toggle'
import { Header } from './header'
import { InfoCard } from './info-card'
import { AboutCard } from './about-card'

function StreamPlayer({
    user,
    isFollowing,
    followCount
}) {

const {
    token, identity, name, imageurl
}=userviewertoken(user._id)

const {collapsed}=useChatSidebar((state)=>state)

if (!token || !identity || !name) {
  return <StreamPlayerSkeleton />;
}


  return (
<>
{
  collapsed && (
    <div className="hidden lg:block fixed top-[100px] right-2 z-50">
        <ChatToggle />
    </div>
)
}
    <div>
      {
        collapsed && (
          <div className='hidden lg:block fixed top-[100px] right-2  z-50'>
         <ChatToggle/>
          </div>
        )
      }
      <LiveKitRoom  
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEB_SOCKET_URL}
      className={cn(
        "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
        collapsed && "lg:grid-cols-2 xl:grid-cols-2"
        )}
      >
         <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-4 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video 
                    hostName={user.username}
                    hostIdentity={user._id}
                    />
                     <Header
           imageurl={user.imageurl}
            hostName={user.username}
            hostIdentity={user._id}
            isFollowing={isFollowing}
            name={user.stream.title}
          />
           <InfoCard 
                    hostName={user.username}
                    hostIdentity={user._id}
                    viewerIdentity={identity}
                    name={user.stream.title}
                    thumbnailUrl={user.stream.thumbnail}
                    />
                       <AboutCard 
                    hostName={user.username}
                    hostIdentity={user._id}
                    viewerIdentity={identity}
                    bio={user.stream.bio}
                    followedByCount={followCount}
                    />
                    </div>
                    <div className={cn(
                      "col-span-1 2xl:col-span-2",
                      collapsed && "hidden"
                    )} >
                      <Chat
                      imageurl={user.imageurl}
                      viewerimage={imageurl}
                      viewerName={name}
                      hostName={user.username}
                      hostIdentity={user._id}
                      isFollowing={isFollowing}
                      isChatEnabled={user.stream.ischatenabled}
                      isChatDelayed={user.stream.ischatdelayed}
                      isChatFollowersOnly={user.stream.ischatfollowersonly}
                      viewerIdentity={identity}
                      />
                    </div>
      </LiveKitRoom>
    </div>
  </>
  )
}

export function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
}

export default StreamPlayer
