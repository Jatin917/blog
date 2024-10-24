import React from 'react'
import { Link } from 'react-router-dom';

interface InputFieldProps {
    heading: string;        // Change React.ReactNode to string for better type safety
    link: string; // Change React.ReactNode to string for better type safety
    linkto:string;
  }

const SubHeading = React.memo(({heading, link, linkto}:InputFieldProps) => {
  return (
    <div className=' text-gray-500 flex items-center gap-1'>
        <span className='text-lg'>{heading}</span>
        <Link className='text-lg underline' to={`/${linkto}`} >{link}</Link>
    </div>
  )
})
export default SubHeading