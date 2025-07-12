"use client"
import { chatSettingToggler } from '@/action/stream-chat-action/chatsetting'
import { Switch } from '@/components/ui/switch'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

function SettingsToggle({
    label,
    value,
    field,
    messageTrue,
    messageFalse
}
) {

    const [ispending, startTransition]=useTransition()

    

    const onchange=() => {
      startTransition(() => {
        chatSettingToggler(!value, field)
        .then(()=>toast.success(`${!value?messageTrue:messageFalse}`))
        .catch(()=>toast.error("something went wrong while updating chat settings"))
      }
      )
    

    }

    
    

  return (
  <>
  
  <div className='flex justify-between items-center bg-muted rounded-xl w-full py-4 px-3'>
    <p className='font-semibold'>{label}</p>
    <div className='space-y-2'>
    <Switch
    disabled={ispending}
    checked={value}
    onCheckedChange={onchange}
   />
    </div>
  </div>
  </>
  )
}

export default SettingsToggle
