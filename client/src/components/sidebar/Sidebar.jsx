import React from 'react'
import Profile from './Profile'
import Conversations from './Conversations'
import Logout from '../../pages/Logout'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r w-1/4'>
      <Profile/>
      <div className='bg-gray-400 h-[0.5px] mx-2'></div>
      <Conversations/>
      <Logout/>

    </div>
  )
}

export default Sidebar
