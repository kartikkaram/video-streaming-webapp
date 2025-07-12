import { stringToColor } from '@/lib/utils';
import { format } from 'date-fns';
import React from 'react'
import WatcherAvatar from './watcher-avatar';

function ChatMessage({
    data,
    viewerimage
}) {
    const color = stringToColor(data.from?.name || "");

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
  <div>
       <WatcherAvatar
       username={data.from?.name}
       fallbackColor={color}
       viewerimage={viewerimage}
       />
  </div>
      <div className="flex flex-col flex-wrap items-baseline gap-1 grow">
        <div className='flex'>
        <p className=" text-sm font-semibold whitespace-nowrap">
         <span className="truncate" style={{ color: color }}>
{data.from?.name}
</span> : &nbsp;&nbsp;
         </p>
        <p className="text-sm text-white/40">
 {format(data.timestamp, "HH:mm")}
</p> 
        </div>
        <div className="text-sm break-all">
          {data.message}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage




