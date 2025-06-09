import { useContext, useState } from "react"
import { AuthUserContext } from "../../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import { __AUTH } from "../../../Backend/Firebase"
import toast from "react-hot-toast"
import CustomInputFields from "../../utilities/CustomInputFields"
import { updatePassword } from "firebase/auth"



const ResetPassword = () => {
  let [newPassword, setNewPassword] = useState('')

  let { authUserData } = useContext(AuthUserContext)

  let navigate = useNavigate()

  let handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword.trim()) {
      try {
        await updatePassword(authUserData, newPassword)
        setNewPassword('')
        toast.success(' Password Update Successfully')
        navigate("/user")
      } catch (error) {
        toast.error(error.code.slice(5))
      }
    }
    else {
      toast.error('Enter Valid Email')
    }

  }


  return ( 
    <div className='  flex justify-center items-center h-[90vh] w-full text-light'  >
      <form onSubmit={handleSubmit} className='  bg-secondary shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655]  md:w-[30vw] flex flex-col items-center justify-center  gap-4 px-10 py-8 rounded-xl '>
        <h2 className='font-bold text-2xl mb-4   '>
          Update your Password..
        </h2>

        <CustomInputFields name={"password"} value={newPassword} type={"password"} handleChange={(e) => setNewPassword(e.target.value)} />

        <button className=' px-6 py-2 bg-accent text-primary font-semibold rounded-xl hover:bg-light hover:text-primary transition-all duration-300'>Update</button>
      </form>
    </div>
  )
}

export default ResetPassword