import React from 'react'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import { verifyUser } from '@/lib/verifyuser'
import { redirect } from 'next/navigation'
import Container from './_components/sidebar/container'

async function CreatorLayout({
    children,
    params
}) {

  const {username}=await params

  const self =await verifyUser(username)

  if(!self){
    redirect("/")
  }
  

  return (
    <>
      <Navbar/>
    <div className='flex h-full pt-20 w-full '>
      <Sidebar/>
      <Container>
        {children}
      </Container>
    </div>
        
    </>
  )
}

export default CreatorLayout
