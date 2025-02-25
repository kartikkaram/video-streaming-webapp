"use client"
import React from 'react'

function ChatSettings() {

    const chatsettings=[
        {
            label: "Enable chat",
            value:stream.ischatenabled
        },
        {
            label: "Delay chat",
            value:stream.ischatdelayed
        },
        {
            label: "Followers only chat",
            value:stream. ischatfollowersonly
        },
    ]

  return (
    <>
    Chat Settings
      <ul>
       {
        chatsettings.map((settings) => {
          return <Toggler
          label={settings.label}
          value={settings.value}
          />
        }
        )
       }
      </ul>
    </>
  )
}

export default ChatSettings
