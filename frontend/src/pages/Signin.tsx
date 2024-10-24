import React, { useState } from 'react'
import HeadingComponent from '../comonents/headingComponent'
import InputField from '../comonents/inputField'
import SubHeading from '../comonents/subHeading'
import Button from '../comonents/Button'
import FromSideView from '../comonents/FromSideView'
import { signInType } from '@jaitin/medium-common'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

// interface SigninValuesType {
//   email:string,
//   password:string
// }
const iniTialValue:signInType = {
  email:"",
  password:""
}


const Signin = React.memo(() => {
  const [signinInitialValue, setSigninInitialValue] = useState(iniTialValue);
  const handleForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> =>{
    event.preventDefault();
    console.log("form submitted")
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/app/v1/user/signin`, signinInitialValue);
      if(res.status===200){
        toast.success("Sign In Successfully");
        localStorage.setItem("user", res.data.jwt);
        // Navigate("/blogs")
        setSigninInitialValue(iniTialValue);
      }
    } catch (error){
      toast.error((error as Error).message)
    }
    // console.log(signinInitialValue)
  }
  return (
    <div className='flex h-screen my-16'>
      <form className='w-[50%] flex items-center justify-center flex-col' onSubmit={handleForm}>
        <HeadingComponent heading="Log In to Account"/>
        <SubHeading heading="Create an account? " link="SignUp" linkto="signup" />
       <div className='flex flex-col gap-6 w-[60%]'>
        {/* <InputField name="Username" placeholder="Enter your username" initialValue={signinInitialValue} value={signinInitialValue.username} onchange={setSigninInitialValue} type="name" /> */}
          <InputField name="Email" placeholder="Enter your Email" initialValue={signinInitialValue} value={signinInitialValue.email} onchange={setSigninInitialValue} type="email" />
          <InputField name="Password" placeholder="Enter your Password" initialValue={signinInitialValue} value={signinInitialValue.password} onchange={setSigninInitialValue} type="password" />
          <Button text='Sign In'/>
        </div>
      </form>
      <div  className='w-[50%] bg-[#f3f5f7] flex items-center justify-center px-16 ' >
      <FromSideView/>
      </div>
      <ToastContainer />
    </div>
  )
})

export default Signin