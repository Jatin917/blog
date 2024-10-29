import React, { useState } from 'react'
import HeadingComponent from '../comonents/headingComponent'
import InputField from '../comonents/inputField'
import SubHeading from '../comonents/subHeading'
import Button from '../comonents/Button'
import FromSideView from '../comonents/FromSideView'
import { signInType } from '@jaitin/medium-common'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../store/atom/atom'
import { useSetRecoilState } from 'recoil'

const iniTialValue: signInType = {
  email: "",
  password: ""
}

const Signin = React.memo(() => {
  const setIsAuth = useSetRecoilState(isAuthenticated);
  const [signinInitialValue, setSigninInitialValue] = useState(iniTialValue);
  const navigate = useNavigate();
  
  const handleForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log("form submitted")
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/app/v1/user/signin`, signinInitialValue);
      if (res.status === 200) {
        toast.success("Sign In Successfully");
        console.log(res.data.jwt);
        localStorage.setItem("user", res.data.jwt);
        setSigninInitialValue(iniTialValue);
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
        <HeadingComponent heading="Log In to Account" />
        <SubHeading heading="Create an account? " link="SignUp" linkto="signup" />
        <div className='flex flex-col gap-6 w-[60%]'>
          <InputField name="Email" placeholder="Enter your Email" initialValue={signinInitialValue} value={signinInitialValue.email} onchange={setSigninInitialValue} type="email" />
          <InputField name="Password" placeholder="Enter your Password" initialValue={signinInitialValue} value={signinInitialValue.password} onchange={setSigninInitialValue} type="password" />
          <Button text='Sign In' />
        </div>
      </form>
      <ToastContainer />
    </div>
  )
})

export default Signin