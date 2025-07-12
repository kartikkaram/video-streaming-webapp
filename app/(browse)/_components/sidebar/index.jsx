import React from 'react'
import Wrapper from './Wrapper'
import Toggle from './toggle'
import { recommender } from '@/lib/recommender'
import Recommended, { RecommendedSkeleton } from './recommended'
import Followlist, { FollowListSkeleton } from './followlist'
import { getFollowList } from '@/lib/follow-service/getfollowlist'

const Sidebar=async()=>{
  const recommendedList= await recommender()
  const followlList=await getFollowList()
  
  return (
    <Wrapper>
  <Toggle />
  <div className='space-y-4 pt-4 lg:pt-0'>
    <Followlist data={followlList} />
    <Recommended data={recommendedList}/>
  </div>
    </Wrapper>
  )
}

export const SidebarSkeleton=(
  {
      size="default"
  }
)=> {
  return (
<aside className='"fixed pt-4 left flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
  <FollowListSkeleton/>
<RecommendedSkeleton/>
</aside>
  )
}

export default Sidebar
