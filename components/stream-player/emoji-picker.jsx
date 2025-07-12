import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { EmojiPicker } from 'frimousse'
import { Smile } from 'lucide-react'
import React from 'react'
import { LoadingVideo } from './loading'

function Emoji({
    value,
    onChange
}) {

const appendEmoji=(emoji) => {
  const newValue= value+emoji
    onChange(newValue)

}


  return (
  <Popover>
    <PopoverTrigger>
           <Smile
           className='text-white/40 hover:text-white/50 transition'
           />
    </PopoverTrigger>
    <PopoverContent side='right' className='bg-background border-none shadow-none drop-shadow-none mb-16 overflow-y-scroll h-40 relative left-24'>
      <EmojiPicker.Root     onEmojiSelect={({ emoji }) => {
      appendEmoji(emoji)
        }}
>
      <EmojiPicker.Search className='w-[90%] p-1' />
      <EmojiPicker.Viewport>
        <EmojiPicker.Loading><LoadingVideo/></EmojiPicker.Loading>
        <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
        <EmojiPicker.List />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>

    </PopoverContent>
  </Popover>
  )
}

export default Emoji
