import React from 'react'
import StaffPicks from './staffPickSection'
import WritingPopup from './sidebarWritingCard'
import RecommendedTopics from './recommendedTopicsCard'
import WhoToFollow from './usersRecommendation'

const Sidebar = () => {
  return (
    <div className='w-[25%]'>
      <StaffPicks />
      <WritingPopup />
      <RecommendedTopics />
      <WhoToFollow />
    </div>
  )
}

export default Sidebar