import React from 'react'


interface buttonProp {
    text: string
}
const Button: React.FC<buttonProp> = React.memo(({text}) => {
  return (
    <div className='w-full border'>
        <button className='w-full p-2 rounded bg-[#18181a] text-white' type='submit'>{text}</button>
    </div>
  )
})
export default Button