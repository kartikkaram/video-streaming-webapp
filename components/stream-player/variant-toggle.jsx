import { ChatVariant, useChatSidebar } from '@/store/useChatSidebar'
import { MessageSquare, Users } from 'lucide-react'
import React from 'react'
import Hint from '../hint'
import { Button } from '../ui/button'

function VariantToggle() {

  const {
      variant,
      onChangeVariant
  }=useChatSidebar((state)=>state)
  const isChat=variant===ChatVariant.CHAT


    let Icon=isChat? Users : MessageSquare

    const onToggle=() => {
    const newVariant=isChat?ChatVariant.COMMUNITY : ChatVariant.CHAT
      onChangeVariant(newVariant)

    }

    const label=isChat? "Community": "Go back to chat"
    

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

export default VariantToggle
