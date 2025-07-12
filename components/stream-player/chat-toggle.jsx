import { useChatSidebar } from '@/store/useChatSidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import Hint from '../hint'
import { Button } from '../ui/button'

function ChatToggle() {

    const {
        collapsed,
        onExpand,
        onCollapse
    }=useChatSidebar((state)=>state)

    let Icon=collapsed? ArrowLeftFromLine : ArrowRightFromLine

    const onToggle=() => {
      if(collapsed){
        onExpand()
      }else{
        onCollapse()
      }
    }

    const label=collapsed? "Expand": "Collapse"
    

  return (
 <Hint label={label} side="left" asChild>
<Button
variant="ghost"
onClick={onToggle}
className='h-auto hover:bg-white/10 hover:text-primary bg-transparent'
>
<Icon className='h-4 w-4'/>
</Button>
 </Hint>
  )
}

export default ChatToggle
