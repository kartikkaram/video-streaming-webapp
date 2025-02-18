import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/app/components/ui/tooltip"

  import React from 'react'
  
  function Hint(
    {
        label,
        children,
        asChild,
        side,
        align,
        duration
    }
  ) {
    return (
        <TooltipProvider>
        <Tooltip delayDuration={duration}>
          <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
          <TooltipContent
           className='text-white bg-black/80 flex '
          side={side}
          align={align}
          
           >
            <p className="font-semibold"
            >{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
    )
  }
  
  export default Hint
  