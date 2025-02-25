import React, { Suspense }  from 'react'
import Sidebar, { SidebarSkeleton } from './_components/sidebar'
import Container from './_components/sidebar/container'
import Navbar from './_components/navbar'

export default function layout({children}) {
  return (
    <>
      <Navbar/>
    <div className='flex h-full pt-20  '>
      <Suspense fallback={<SidebarSkeleton/>} >
    <Sidebar/>
      </Suspense>
    <Container>
{children}
    </Container>
    </div>
    </>
  )
}


