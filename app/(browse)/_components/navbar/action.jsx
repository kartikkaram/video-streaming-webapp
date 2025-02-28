
import { SignInButton, SignUpButton, UserButton,  } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

export const Actions=async ()=> {

    const user= await currentUser()

  return (
<>
<div>
{!user? 
<div className='flex-col flex  justify-center items-center w-full gap-3 sm:flex-row'>
    <SignUpButton>
    <Button 
    variant="custom"
    size="custom"
    >
        signUp
        </Button>
    </SignUpButton>
<SignInButton>
    <Button 
    variant="custom"
    size="custom"
    >
        signIn
        </Button>
        </SignInButton></div>:
         <div className='flex justify-center items-center w-full gap-3'>
         <Button
         className="text-muted-foreground hover:text-primary flex items-center"
         variant="ghost"
         size="sm"
         asChild
         >
             <Link href={`/u/${user.username}`}>
      <Clapperboard
       className='h-5 w-5 lg:mr-1'
       />
      <span className='hidden lg:block' >{user.username}</span>
             </Link>
         </Button>
      <UserButton/>
     </div>
        }


</div>

</>
  )
}

