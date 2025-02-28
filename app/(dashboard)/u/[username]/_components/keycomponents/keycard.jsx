"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyButton from './copybutton'
import { Button } from '@/components/ui/button'
import {EyeIcon, EyeOff} from "lucide-react"
function Keycard(
    {
        value
    }
) {

  const [show, setShow]=useState(false)

  const Icon=show? EyeOff:EyeIcon


  return (
    <div className="rounded-xl bg-muted p-6">
    <div className="flex items-center gap-x-6">
      <p className="font-semibold shrink-0">
        Stream Key
      </p>
      <div className="space-y-2 w-full">
        <div className="w-full flex items-center  ">
          <Input
            value={value || ""}
            type={show ? "text" : "password"}
            disabled
            placeholder="Stream key"
          />
        <Icon 
        onClick={()=>setShow(!show)}
        className="w-4 h-4 relative right-7 text-muted-foreground cursor-pointer hover:opacity-75 transition "/>
          <CopyButton value={value || ""} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Keycard



