
import { getStreamDocument } from '@/lib/stream-service/getstream'
import React from 'react'
import SettingsToggle from '../_components/chatsetting/chatsettingstoggle'

async function ChatSettings() {

const stream=await getStreamDocument()
if (!stream) {
  throw new Error("stream not found")
}

    const chatsettings=[
        {
            label: "Enable chat",
            value:stream.ischatenabled,
            field:"ischatenabled",
            messageTrue:"Chat enabled",
            messageFalse:"Chat disabled"

        },
        {
            label: "Delay chat",
            value:stream.ischatdelayed,
            field:"ischatdelayed",
            messageTrue:"Chat delay enabled",
             messageFalse:"Chat delay disabled"
        },
        {
            label: "Followers only chat",
            value:stream.ischatfollowersonly,
            field:"ischatfollowersonly",
            messageTrue:"Followers only chat enabled",
             messageFalse:"Followers only chat disabled"
        },
    ]

  return (
      <div className='p-6 w-full'>
        <div className='mb-4'>
    <h1 className='text-2xl font-bold' >Chat settings</h1>
        </div>
        <div className='space-y-4'>
       {
         chatsettings.map((settings,index) => {
           return <div>
          <SettingsToggle
          key={index}
          label={settings.label}
          value={settings.value}
          field={settings.field}
          messageTrue={settings.messageTrue}
          messageFalse={settings.messageFalse}
          />
          </div> 
        }
      )
    }
    </div>
      </div>
  )
}

export default ChatSettings
