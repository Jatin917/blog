import React from 'react'


const HeadingComponent = React.memo(({heading}:{heading:React.ReactNode}) => {
  return (
    <div className='text-4xl font-bold'>{heading}</div>
  )
})

export default HeadingComponent