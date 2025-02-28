"use client"
import React, { useState } from 'react'
import qs from 'query-string'
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Search() {
    const router=useRouter()
    const [value, setValue]=useState("")

    const search = (e) => {
      e.preventDefault()
      if(!value)return;
      const url=qs.stringifyUrl({
        url:"/search",
        query:{term:value},
      },{skipEmptyString:true})
      router.push(url)
      //router.push(`/search?term=${value}`) above code basically does this with improved checking for empty strings
    }
    
    const clear=() => {
      setValue("")
    }
    

  return (
    <form 
    className='relative w-full lg:w-[400px] flex items-center ' 
    onSubmit={search}
    >
        <Input 
        value={value}
        onChange={(e)=>{setValue(e.target.value)}}
        className="rounded-l-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:-ring-offset-0"
        placeholder="Search"
        />
       {value && <X className='absolute top-2.5 right-14 h-5 2-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'  onClick={clear}/>}
        <Button
         type="submit"
         size="sm"
         variant="secondary"
         className="rounded-l-none"
        >
            <SearchIcon 
            className=''
        />
        </Button>
   
    </form>
  )
}

export default Search
