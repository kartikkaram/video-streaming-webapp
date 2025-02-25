import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'


const font = Poppins({
    subsets:["latin"],
    weight:["200", "300", "400", "500", "600", "700", "800"]
})

const Logo=()=> {
  return (
    <Link href={"/"}>
    <div className=' flex items-center justify-center gap-3 hover:opacity-75 transition'>
      <div className='bg-white rounded-full p-1 mr-2'>
     <Image
     
     src="/spooky.svg"
     alt='twitch-clone' 
     height="32"
     width="32"
      />
      </div>
      <div className={cn(
        " flex-col items-center justify-center gap-2 hidden lg:flex ",
        font.className
      )}>
        <p className='text-lg font-semibold'>
            Twitch-clone
        </p>
        <p className='text-xs text-muted-foreground'>
            Creator Dashboard
        </p>
      </div>
    </div>
    </Link>
  )
}

export  {Logo}

