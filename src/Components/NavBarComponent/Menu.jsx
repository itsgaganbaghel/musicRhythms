import React, { useContext } from 'react'
import { AuthUserContext } from '../Context/AuthContext'
import { __AUTH } from '../../Backend/Firebase'
import { modalProviderContext } from '../Context/ModalContext'
import MyProfile from '../Profile/ProfileComponents/MyProfile'
import Modal from '../Model/Modal'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import ForgotPassword from '../Auth/ForgotPassword'
import { useTheme } from '../Context/ThemeProvider'
import Logo from './Logo'

const Menu = () => {

  let { authUserData } = useContext(AuthUserContext)
  const { theme, setTheme } = useTheme();

  let { isVisibility, setVisibility, targetModel, setTargetModel } = useContext(modalProviderContext)

  let isAuthenticatedUser = () => {
    return (
      <div onClick={(e) => {
        setVisibility(true);
        setTargetModel("profile")
      }} className=' cursor-pointer'>
        {
          authUserData?.photoURL ?
            <img src={authUserData?.photoURL} width={32} className='rounded-full hover:scale-105' />
            :
            <span className='pb-3  rounded-2xl px-6 py-2 border-2 border-primary hover:bg-secondary  hover:shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] '>Profile</span>
        }
      </div>
    )
  }

  let isAnonymousUser = () => {
    return (
      <>
        <button
          onClick={(e) => {
            setVisibility(true);
            setTargetModel("login")
          }}
          className='underline-offset-2 hover:underline'
        >Login</button>
        <button
          onClick={(e) => {
            setVisibility(true);
            setTargetModel("register")
          }}
          className='underline-offset-2 hover:underline hidden md:block'
        >Register</button>

      </>
    )
  }
  return (
    <div className='flex items-center  text-xl gap-5  text-light font-semibold'>

      {
        authUserData ?
          isAuthenticatedUser()
          : isAnonymousUser()
      }
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className=" text-white rounded-full text-2xl h-full  "
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>


      {

        (isVisibility == true && targetModel == 'profile') &&
        <Modal >
          <MyProfile />
        </Modal>
      }
      {

        (isVisibility == true && targetModel == 'login') &&
        <Modal >
          <Login />
        </Modal>
      }
      {

        (isVisibility == true && targetModel == 'register') &&
        <Modal >
          <Register />
        </Modal>
      }
      {

        (isVisibility == true && targetModel == 'forgotPassword') &&
        <Modal >
          <ForgotPassword />
        </Modal>
      }
    </div>
  )
}

export default Menu
