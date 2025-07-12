import { useParticipants } from '@livekit/components-react';
import React, { useMemo, useState } from 'react'
import { CommunityItem } from './community-item';
import { Input } from '../ui/input';
import { useDebounceValue } from 'usehooks-ts';
import { ScrollArea } from '@radix-ui/react-scroll-area';

function ChatCommunity({
    hostName,
    viewerName,
    isHidden,
    hostIdentity
}) {

    const [value, setValue] = useState("");
    
    const [debouncedValue] = useDebounceValue(value,500) 

    
  
    const participants = useParticipants();
  
    const onChange = (newValue) => {
      setValue(newValue);
    };
   
  
    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
          
          const hostAsViewer = `host-${participant.identity}`;
         
          if (!acc.some((p) => p.identity === hostAsViewer)) {
            acc.push(participant);
          }
          
          return acc;
        }, [] );
   
        return deduped.filter((participant) =>
          participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        );
      }, [debouncedValue, participants]);
  

    if (isHidden) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Community is disabled</p>
        </div>
      );
    }
  


  return (
    <div className="p-4">
    <Input
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search community"
      className="border-white/10"
    />
    <ScrollArea className="gap-y-2 mt-4">
      <p className="text-center text-sm text-muted-foreground hidden last:block">
        No results
      </p>
      {filteredParticipants.map((participant) => (
        <CommunityItem
        key={participant.identity}
        hostIdentity={hostIdentity}
          hostName={hostName}
          viewerName={viewerName}
          participantName={participant.name}
          participantIdentity={participant.identity}
        />
      ))}
    </ScrollArea>
  </div>
  )
}

export default ChatCommunity



// reduce() iterates over each element, applying a callback function that 
// modifies an accumulator (`acc`) based on the current element. The callback 
// returns the updated accumulator for the next iteration. After all iterations, 
// reduce() returns the final accumulator value.