import React, { useEffect, useState } from 'react'
import notification  from '../assets/notification.png'
import user from '../assets/user.png'
import UserOptions from './UserOption'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isAuthenticated, Name, searchState } from '../store/atom/atom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavBar = React.memo(() => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useRecoilState(isAuthenticated);
  const setSearchItem = useSetRecoilState(searchState);
  // const [name, setName] = useState(null);
  const [name, setName] = useRecoilState(Name);
  useEffect(()=>{
    async function fetchName() {
      if(isAuth){
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/app/v1/user/get?id=${localStorage.getItem("user")}`);
          setName(res.data.name);
        } catch (error) {
          console.log((error as Error).message)
        }
      }
      else setName("");
    }
    fetchName();
  },[isAuth])
  const handleSearchText = (e: any) => {
    setTimeout(() => {
      setSearchItem(e.target.value);
    }, 1000);
  }

  const toggleDropdown =()=>{
    setIsOpen(!isOpen)
  }
  function handleLogout(){
    localStorage.removeItem('user');
    console.log("navigating to ");
    setIsAuth(false);
    navigate('/');
    toast.success("Logout Successfully!");
  }
  return (
    <div className='flex gap-2 items-center justify-between border-b pb-2 fixed left-0 w-full top-0 h-[70px] bg-white ' style={{zIndex:1}}>
        <div className='flex w-full items-center gap-3 mx-4'>
            <h2 className='font-bold text-3xl italic'>Medium</h2>
            <input onChange={handleSearchText} className='w-[300px] p-2 focus:outline-none border-none bg-gray-100 rounded' placeholder='Search Here' />
        </div>
        <div className='flex gap-6 w-full p-2 justify-end mx-4'>
            <a href='/blog/publish'>Write</a>
            <button><img className='w-6' src={notification} /></button>
            <button onClick={toggleDropdown}><img className='w-6' src={user} /></button>
        </div>
          {isOpen && (
            <UserOptions 
              name={name} 
              onLogout={handleLogout} 
              toggleDropdown={toggleDropdown} 
            />
          )}
    </div>
  )
})

export default NavBar