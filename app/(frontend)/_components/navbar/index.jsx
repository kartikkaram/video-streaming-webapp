import React from 'react'
import { Logo } from './logo'
import Search from './search'
import {Actions} from './action'

function Navbar() {
  return (
   <>
   <nav className='fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 py-2 flex justify-between items-center shadow-sm lg:px-4'>
    <Logo />
    <Search />
    <Actions/>
    </nav>
   </>
  )
}

export default Navbar
