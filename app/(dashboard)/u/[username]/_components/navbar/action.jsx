import { Button } from '@/components/ui/button';
import React from 'react'
import { ArrowLeftFromLine, Clapperboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export const Actions=async ()=> {
  return (
<>
<div className='flex items-center justify-end gap-x-2'>
    <Button
    className='text-muted-foreground hover:text-primary flex items-center'
    variant="ghost"
    size="sm"
    asChild
    >
        <Link href={`/`}>
        <div className='flex justify-center items-center h-full w-full'>
        <LogOut className='h-8 w-8 mr-2' />
        Exit
        </div>
         </Link>

    </Button>
    <UserButton/>
</div>

</>
  )
}

