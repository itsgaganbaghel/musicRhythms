import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { __AUTH } from '../../Backend/Firebase'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CustomInputFields from '../utilities/CustomInputFields'
import { FaGooglePlusG } from "react-icons/fa";
import { modalProviderContext } from '../Context/ModalContext'

const Login = () => {
  let { setVisibility, setTargetModel } = useContext(modalProviderContext)

  let initialRegisterFormData = {
    email: "",
    password: '',
  }

  let [registerFormData, setRegisterFormData] = useState(initialRegisterFormData)
  let { email, password } = registerFormData
  let navigate = useNavigate()

  let handleInput = (e) => {
    let { name, value } = e.target
    setRegisterFormData({ ...registerFormData, [name]: value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterFormData(initialRegisterFormData)
    try {
      let { user } = await signInWithEmailAndPassword(__AUTH, email, password)
      if (user.emailVerified) {
        toast.success("Login Successfully")
        navigate('/')
      } else {
        toast.error("Verify your email first")
      }
    } catch (error) {
      toast.error(error.code.slice(5))
    }
  }

  let handleSignInWithGoogle = async () => {
    try {
      let provider = new GoogleAuthProvider()
      await signInWithPopup(__AUTH, provider)
      navigate('/')
      setVisibility(false)
      setTargetModel(null)
      toast.success("Successfully Logged in with Google")
    } catch (error) {
      toast.error(error.code.slice(5))
    }
  }

  return (
    <div className='md:w-full min-w-[100vw] md:min-w-[70vw] px-6 py-16  min-h-[80vh] shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655]  bg-secondary rounded-2xl flex justify-center md:gap-24 items-center text-light'>
      {/* Heading */}
      <div className='w-[35%] mb-6 text-center hidden md:block '>
        <h2 className='text-[2.9rem] font-bold text-accent border-accent pb-4'>Welcome Back!</h2>
        <h2 className='text-[2rem] font-bold text-light border-accent pb-4 font-serif tracking-wide'>
          Thank You for Connecting With Us
        </h2>
      </div>

      <div className='bg-primary p-8 rounded-2xl md:w-[43%] w-full '>

        {/* Login With Google */}
        <button
          onClick={handleSignInWithGoogle}
          className="flex w-full justify-center items-center gap-3 mt-6 md:px-6 py-2 bg-light text-primary font-semibold rounded-2xl hover:bg-accent hover:text-primary transition-all duration-300"
        >
          <span className='text-2xl'><FaGooglePlusG /></span>
          <span className='md:tracking-wider text-[16px]'> Sign In With Google</span>
        </button>

        {/* Divider */}
        <div className='w-full my-8 relative'>
          <span className='absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-[35px] w-[35px] text-center border-2 border-light/30 rounded-full bg-secondary text-[1.2rem] text-light/90'>or</span>
          <hr className='border-light/30' />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6 items-center w-full '>

            {/* Email Input */}
            <CustomInputFields
              name="email"
              type="email"
              value={email}
              handleChange={handleInput}
            />

            {/* Password Input */}
            <CustomInputFields
              name="password"
              type="password"
              value={password}
              handleChange={handleInput}
            />

            {/* Forgot Password */}
            <div className='w-full text-light opacity-90 flex justify-between'>
              <div>
                <input id='remember' type='checkbox' className='mr-2' />
                <label htmlFor='remember' className='cursor-pointer'>Remember Me</label>
              </div>
              <button
                onClick={(e) => {
                  setVisibility(true);
                  setTargetModel("forgotPassword")
                }}
              >Forgot Password</button>

            </div>


            {/* Login Button */}
            <button className="w-full px-6 py-2 bg-accent text-primary font-semibold tracking-wider rounded-2xl hover:bg-light hover:text-primary transition-all duration-300">
              Sign In
            </button>

          </div>
        </form>


        {/* Register Link */}
        <p className='w-full text-light text-center mt-6'>
          You don't have an account?
          <button
            className="underline underline-offset-4 hover:text-accent transition duration-300 hover:opacity-100 ml-2"
            onClick={(e) => {
              e.preventDefault();
              setVisibility(true);
              setTargetModel("register");
            }}
          >
            Register
          </button>
        </p>
      </div>

    </div>
  )
}

export default Login
