import React, { useState } from 'react'
import HeadingComponent from '../comonents/headingComponent'
import InputField from '../comonents/inputField'
import SubHeading from '../comonents/subHeading'
import Button from '../comonents/Button'
import FromSideView from '../comonents/FromSideView'
import { toast } from 'react-toastify'
import axios from 'axios'
import { signUpType } from '@jaitin/medium-common'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { isAuthenticated } from '../store/atom/atom'

const iniTialValue: signUpType = {
  name: "",
  email: "",
  password: ""
}

const Signup = React.memo(() => {
  const setIsAuth = useSetRecoilState(isAuthenticated);
  const navigate = useNavigate();
  const [signUpInitialValue, setSignUpInitialValue] = useState(iniTialValue);
  
  const handleForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log("form submitted")
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/app/v1/user/signup`, signUpInitialValue);
      if (res.status === 200) {
        toast.success("Sign Up Successfully");
        localStorage.setItem("user", res.data.jwt);
        setSignUpInitialValue(iniTialValue);
        setIsAuth(true);
        navigate("/")
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
  
  return (
    <div className='flex flex-col lg:flex-row-reverse h-screen lg:my-0 my-20 gap-10'>
      <div className='bg-[#f3f5f7] lg:w-[50%] flex items-center justify-center px-16'>
        <FromSideView />
      </div>
      <form className='lg:w-[50%] flex items-center justify-center flex-col lg:p-0 pb-5' onSubmit={handleForm}>
        <HeadingComponent heading="Create an Account" />
        <SubHeading heading="Already have an account? " link="Login" linkto="signin" />
        <div className='flex flex-col gap-6 w-[60%]'>
          <InputField name="Name" placeholder="Enter your name" initialValue={signUpInitialValue} value={signUpInitialValue.name} onchange={setSignUpInitialValue} type="name" />
          <InputField name="Email" placeholder="Enter your Email" initialValue={signUpInitialValue} value={signUpInitialValue.email} onchange={setSignUpInitialValue} type="email" />
          <InputField name="Password" placeholder="Enter your Password" initialValue={signUpInitialValue} value={signUpInitialValue.password} onchange={setSignUpInitialValue} type="password" />
          <Button text='Sign Up' />
        </div>
      </form>
    </div>
  )
})

export default Signup