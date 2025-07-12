
import React from 'react'
import Keycard from '../_components/keycomponents/keycard'
import UrlCard from '../_components/keycomponents/urlcard'
import { ConnectModal } from '../_components/keycomponents/connectmodel'
import { getStreamDocument } from '@/lib/stream-service/getstream'


async function KeySettings() {

const stream=await getStreamDocument()
if (!stream) {
  throw new Error("stream not found")
}

  

  return (
    <div className="p-6">
      <div className=" flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Keys & URLs
        </h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverurl} />
        <Keycard value={stream.streamkey} />
      </div>
    </div>
  )
}

export default KeySettings
