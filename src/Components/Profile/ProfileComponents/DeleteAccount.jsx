import { deleteUser } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaRegSadCry } from 'react-icons/fa'
import ProfileHeader from '../../utilities/ProfileHeader'

const DeleteAccount = () => {
    let [condition, setCondition] = useState(false)
    let { authUserData } = useContext(AuthUserContext || {})
    console.log(authUserData)
    let navigate = useNavigate()
    let handleDelete = async (e) => {
        try {
            if (authUserData) {
                await deleteUser(authUserData) // delete user from Firebase
                toast.success("Account Deleted Successfully")
                toast.success("Come Back As Soon As Possible")
                toast.success("we are Waiting for You.")
                navigate("/") // Navigate after successful deletion

            } else {
                toast.error("No authenticated user found")
            }
        } catch (error) {
            toast.error(error.code.slice(5))
        }
    }
    return (
        <div className='text-light  flex flex-col gap-4'>
            {
                condition ?
                    <div className="bg-secondary w-[95vw]  md:w-[40vw] rounded-2xl ">
                        <ProfileHeader />

                        <div className='flex flex-col items-center gap-10 justify-center py-10 rounded-xl  '>
                            <p className='md:text-2xl text-[1rem] flex items-center gap-2 '>
                                We are felling very sad, You are going...
                                <span className='text-accent text-3xl'>
                                    <FaRegSadCry />
                                </span>
                            </p>
                            <button
                                className='px-5 py-2 border-1 rounded-xl  text-secondary hover:text-primary bg-accent  font-bold text-xl'
                                onClick={handleDelete}>
                                DeleteAccount
                            </button>

                        </div>

                    </div>
                    :
                    <div className='bg-secondary py-16 px-12 rounded-2xl shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655]'>
                        <h2 className='text-xl text-center md:text-start'>Are You really want to continue with the Account deletion Process ? </h2>
                        <div className='flex gap-10 justify-center mt-10'>
                            <button className='px-5 py-2 border-1 rounded-xl  text-primary bg-accent  font-bold text-xl'
                                onClick={() => setCondition(true)}>
                                Yes
                            </button>

                            <button className='px-5 py-2 border-1 rounded-xl  text-primary bg-accent  font-bold text-xl'
                                onClick={() => navigate("/user")}>
                                No
                            </button>

                        </div>
                    </div>
            }
        </div>)
}

export default DeleteAccount