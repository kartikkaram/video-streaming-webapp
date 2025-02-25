import React from 'react'
import Wrapper from './wrapper'
import Toggle from './toggle'
import Navigation from './navigation'

function Sidebar() {
  return (
    <div>
      <Wrapper>
        <Toggle/>
        <Navigation/>
      </Wrapper>
    </div>
  )
}

export default Sidebar
