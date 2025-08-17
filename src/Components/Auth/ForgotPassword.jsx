
import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../Context/AuthContext'
import toast from 'react-hot-toast'
import { sendPasswordResetEmail } from 'firebase/auth'
import { __AUTH } from '../../Backend/Firebase'
import { useNavigate } from 'react-router-dom'
import CustomInputFields from '../utilities/CustomInputFields'
import { modalProviderContext } from '../Context/ModalContext'

const ForgotPassword = () => {
    let { isVisibility, setVisibility, targetModel, setTargetModel } = useContext(modalProviderContext)
    let [email, setEmail] = useState('')

    let { authUserData } = useContext(AuthUserContext)
    // console.log(authUserData)


    let navigate = useNavigate()

    let handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(email)
        if (email.trim()) {
            try {
                sendPasswordResetEmail(__AUTH, email)
                setEmail('')
                toast.success('Reset Password mail send Successfully')
                navigate("/auth/login")
            } catch (error) {
                toast.error(error.code.slice(5))
            }
        }
        else {
            toast.error('Enter Valid Email')
        }

    }


    return (
        <div className='md:min-w-[60vw] min-w-[100vw]  w min-h-[70vh] shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] bg-secondary rounded-2xl  flex justify-center items-center text-light'>
            <div className='bg-primary p-8 rounded-2xl md:w-fit w-[90%] shadow-lg'>

                {/* Heading */}
                <div className='w-full mb-6 text-center'>
                    <h2 className=' font-bold text-accent border-accent '>
                        Enter your registered email to <span className='text-light font-serif'> reset your password.</span>
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-6 items-center w-full'>

                        {/* Email Input */}
                        <CustomInputFields
                            name="email"
                            type="email"
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                        />
                        {/* back to login  */}
                        <div className='w-full'>

                            <button
                                className="hover:underline  text-start underline-offset-4 hover:text-accent transition duration-300 hover:opacity-100 ml-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // console.log('click')
                                    setVisibility(true);
                                    setTargetModel("login");
                                }}
                            >
                                Login With Password
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full px-6 py-2 bg-accent text-primary font-semibold rounded-xl hover:bg-light hover:text-primary transition-all duration-300">
                            Submit
                        </button>

                    </div>
                </form>


            </div>
        </div>

    )
}

export default ForgotPassword