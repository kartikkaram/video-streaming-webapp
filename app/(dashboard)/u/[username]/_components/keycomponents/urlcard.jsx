import React from 'react'
import CopyButton from './copybutton'
import { Input } from '@/components/ui/input'

function UrlCard({
    value
}) {
  return (
    <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center gap-x-6">
                <p className="font-semibold shrink-0">
                    Server URL
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-3">
                        <Input 
                        value={value || ""}
                        disabled
                        placeholder="Server URL"
                        />
                        <CopyButton 
                        value={value || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default UrlCard
