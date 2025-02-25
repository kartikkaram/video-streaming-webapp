"use client"
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
  
} from 'lucide-react'
import NavItem, { NavItemSkeleton } from './navitem'

function Navigation() {

  const pathname=usePathname()
  const {user}=useUser()

  if(!user?.username){
    
    return (
      <ul className='space-y-2 '>
      {
        [...Array(4)].map((_,index) => {
          return <NavItemSkeleton key={index} />
        }
        )
      }
      </ul>
    )
  }

  const routes=[
    {
      label:"Stream",
      href:`/u/${user?.username}`,
      icon:Fullscreen
    },
    {
      label:"Keys",
      href:`/u/${user?.username}/keys`,
      icon:KeyRound
    },
    {
      label:"Chat",
      href:`/u/${user?.username}/chat`,
      icon:MessageSquare
    },
    {
      label:"Community",
      href:`/u/${user?.username}/community`,
      icon:Users
    },
  ]
  

  return (
       <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
        {routes.map((route) => {
         return <NavItem
         key={route.href}
         href={route.href}
         label={route.label}
         Icon={route.icon}
         isActive={pathname===route.href}
         />
        }
        )}
       </ul>
  )
}


export default Navigation
