import React, { useState } from 'react'
import HeadingComponent from '../comonents/headingComponent'
import InputField from '../comonents/inputField'
import SubHeading from '../comonents/subHeading'
import Button from '../comonents/Button'
import FromSideView from '../comonents/FromSideView'
import { signUpType } from '@jaitin/medium-common'
import { toast } from 'react-toastify'
import axios from 'axios'

const iniTialValue:signUpType = {
  username:"",
  email:"",
  password:""
}


const Signup = React.memo(() => {
  const [signUpInitialValue, setSignUpInitialValue] = useState(iniTialValue);
  const handleForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> =>{
    event.preventDefault();
    console.log("form submitted")
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/app/v1/user/signup`, signUpInitialValue);
      if(res.status===200){
        toast.success("Sign Up Successfully");
        localStorage.setItem("user", JSON.stringify(res.data.jwt));
        // Navigate("/blogs")
        setSignUpInitialValue(iniTialValue);
      }
    } catch (error){
      toast.error((error as Error).message)
    }
  }
  return (
    <div className='flex h-screen my-16'>
      <form className='w-[50%] flex items-center justify-center flex-col' onSubmit={handleForm}>
        <HeadingComponent heading="Create an Account"/>
        <SubHeading heading="Already have an account? " link="Login" linkto="signin"/>
       <div className='flex flex-col gap-6 w-[60%]'>
          <InputField name="Username" placeholder="Enter your username" initialValue={signUpInitialValue} value={signUpInitialValue.username} onchange={setSignUpInitialValue} type="name" />
          <InputField name="Email" placeholder="Enter your Email" initialValue={signUpInitialValue} value={signUpInitialValue.email} onchange={setSignUpInitialValue} type="email" />
          <InputField name="Password" placeholder="Enter your Password" initialValue={signUpInitialValue} value={signUpInitialValue.password} onchange={setSignUpInitialValue} type="password" />
          <Button text='Sign Up'/>
        </div>
      </form>
      <div  className='w-[50%] bg-[#f3f5f7] flex items-center justify-center px-16 ' >
      <FromSideView/>
      </div>
    </div>
  )
})

export default Signup