import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'


const font = Poppins({
    subsets:["latin"],
    weight:["200", "300", "400", "500", "600", "700", "800"]
})

const Logo=()=> {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <div className='bg-white rounded-full p-1'>
     <Image
     src="/spooky.svg"
     alt='twitch-clone' 
     height="50"
     width="50"
      />
      </div>
      <div className={cn(
        "flex flex-col items-center justify-center gap-2",
        font.className
      )}>
        <p className='text-xl font-semibold'>
            Twitch-clone
        </p>
        <p className='text-sm text-muted-foreground'>
            Let's stream
        </p>
      </div>
    </div>
  )
}

export  {Logo}

