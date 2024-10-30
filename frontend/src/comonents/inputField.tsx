import { signInType } from '@jaitin/medium-common';
import React from 'react'
import { signUpType } from '@jaitin/medium-common';

interface InputFieldProps {
    name: string;        // Change React.ReactNode to string for better type safety
    placeholder: string; // Change React.ReactNode to string for better type safety
    value:string | undefined;
    type:string;
    initialValue:signUpType | signInType;
    onchange:(value: signUpType | signInType) => void;
  }


const InputField: React.FC<InputFieldProps> = React.memo(({name, placeholder, value, initialValue, onchange, type}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log([event.target.name], event.target.value);
        onchange({...initialValue, [event.target.name]:event.target.value})
    }
  return (
    <div className='flex items-start flex-col gap-2 w-full'>
        <label className='text-lg font-semibold' htmlFor={name}>{name}</label>
        <input className='w-[100%] border border-gray-400 p-2 rounded' required name={name.toLowerCase()} type={type} value={value} onChange={handleInputChange} id={name} placeholder={placeholder} />
    </div>
  )
});

export default InputField;