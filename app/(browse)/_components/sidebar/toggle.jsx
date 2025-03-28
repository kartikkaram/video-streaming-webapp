"use client"
import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSidebar } from '@/store/useSidebar'
import { ArrowLeftFromLineIcon, ArrowRightFromLine } from 'lucide-react'
import React from 'react'

function Toggle() {

  const {
    collapsed,
    onExpand,
    onCollapse
  }=useSidebar((state)=>state)

  const label=collapsed ? "Expand": "Collapse"
  return (
    <>
      {
        !collapsed? <div className='p-3 pl-6 mb-2 flex item-center w-full'>
          <p className='font-semibold text-primary fixed'>
            for you
          </p>
          <Hint label={label} duration={0} asChild side={`right`}>
          <Button
          className="h-auto p-2 ml-auto"
          variant="ghost"
          onClick={onCollapse}
          >
            <ArrowLeftFromLineIcon className='h-4 w-4' />
          </Button>
            </Hint>
        </div>:<div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'> 
          <Hint label={label} duration={0} asChild side={`right`}>
        <Button
          className="h-auto p-2 ml-auto"
          variant="ghost"
          onClick={onExpand}
          >
            <ArrowRightFromLine className='h-4 w-4' />
          </Button>
            </Hint>
          </div>
      }
    </>
  )
}

export const ToggleSkeleton=() => {
  return(
    <div  className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full" >
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />

    </div>
  )
}


export default Toggle
