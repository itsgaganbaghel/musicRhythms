import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { __AUTH } from '../../Backend/Firebase'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CustomInputFields from '../utilities/CustomInputFields'
import { modalProviderContext } from '../Context/ModalContext'
import Modal from '../Model/Modal'
import Login from './Login'

const Register = () => {

  let { isVisibility, setVisibility, targetModel, setTargetModel } = useContext(modalProviderContext)

  let initialRegisterFormData = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  let [registerFormData, setRegisterFormData] = useState(initialRegisterFormData)

  let { email, password, userName, confirmPassword } = registerFormData

  let navigate = useNavigate()

  let handleInput = (e) => {
    let { name, value } = e.target
    setRegisterFormData({ ...registerFormData, [name]: value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterFormData(initialRegisterFormData)

    try {
      let { user } = await createUserWithEmailAndPassword(__AUTH, email, password)
      toast.success("Registered Successfully")

      await sendEmailVerification(user)
      toast.success("Verification email sent!")

      updateProfile(user, {
        displayName: userName,
        photoURL: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
      })

      navigate('/auth/login')

    } catch (error) {
      toast.error(error.code.slice(5))
    }
  }

  return (
    <div className='md:min-w-[70vw]  min-w-[100vw]  md:min-h-[80vh] py-16 shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] bg-secondary rounded-2xl flex justify-center md:gap-10 items-center text-light'>
      {/* Heading */}
      <div className='w-[45%] mb-6 text-center hidden md:block'>
        <h2 className='text-[3rem] font-bold text-accent border-accent pb-4'>Create an Account</h2>
        <h2 className='text-[1.5rem] font-semibold tracking-wider text-light border-accent pb-4 font-serif'>Join us and start your journey <br /> With Rhythm..</h2>
      </div>
      {/* Container */}
      <div className='bg-primary md:p-8 px-4 py-8 rounded-2xl md:w-[43%] w-[90%] shadow-lg'>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5 items-center w-full px-2'>

            {/* Username Input */}
            <CustomInputFields

              name='userName'
              type='text'
              value={userName}
              handleChange={handleInput}
            />

            {/* Email Input */}
            <CustomInputFields
              name='email'
              type='email'
              value={email}
              handleChange={handleInput}
            />

            {/* Password Input */}
            <CustomInputFields
              name='password'
              type='password'
              value={password}
              handleChange={handleInput}
            />

            {/* Confirm Password Input */}
            <CustomInputFields
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              handleChange={handleInput}
            />

            {/* Register Button */}
            <button className='w-full px-6 py-2 bg-accent text-primary font-semibold rounded-xl hover:bg-light hover:text-primary transition-all duration-300'>
              Register
            </button>
          </div>
        </form >


        {/* Already have an account? */}
        <p className='w-full text-light text-center mt-6' >
          Already have an account ?
          <button className="underline underline-offset-4 hover:text-accent transition duration-300 hover:opacity-100 ml-2"
            onClick={(e) => {
              setVisibility(true);
              setTargetModel("login")
            }}
          > Sign In</button>
        </p >
      </div >
      {
        (isVisibility == true && targetModel == 'login') &&
        <Modal >
          <Login />
        </Modal>
      }
    </div >


  )
}

export default Register
