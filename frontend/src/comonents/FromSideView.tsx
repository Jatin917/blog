import React from 'react'

const FromSideView = React.memo(() => {
  return (
    <div>
        <p className='text-3xl font-semibold pb-4'>"The customer service i recieved was exceptional. The support team went above and beyong to address my concerns."</p>
        <p className='text-xl font-[700]' >Jules Winnfield</p>
        <p className='text-lg font-normal text-gray-400' >Ceo, Acme Inc</p>
    </div>
  )
});

export default FromSideView