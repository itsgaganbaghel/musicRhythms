import React, { useContext, useState } from 'react'
import CustomInputFields from '../../utilities/CustomInputFields'
import CustomSelectInputField from '../../utilities/CustomSelectInputField'

import countries from "../../utilities/InputData/Countries.json"
import states from "../../utilities/InputData/states.json"
import cities from "../../utilities/InputData/Cities.json"
import { doc, setDoc } from 'firebase/firestore'
import { __DB } from '../../../Backend/Firebase'
import { AuthUserContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'
import { modalProviderContext } from '../../Context/ModalContext'
import Modal from '../../Model/Modal'
import MyProfile from './MyProfile'

const EditProfile = () => {
  let { authUserData, profileData } = useContext(AuthUserContext || {})
  
  let initialProfileData = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    gender: profileData?.gender || "",
    age: profileData?.age || "",
    dob: profileData?.dob || "",
    country: profileData?.country || "india",
    state: profileData?.state || "",
    city: profileData?.city || "",
  }
  let { isVisibility, setVisibility, targetModel, setTargetModel } = useContext(modalProviderContext)

  let [userProfileData, setUserProfileData] = useState(initialProfileData)
  let { firstName, lastName, age, dob, country, state, city ,gender} = userProfileData


  let { displayName, email, uid, photoURL } = authUserData ? authUserData : ""

  let handleChange = (e) => {
    let { name, value } = e.target
    setUserProfileData({ ...userProfileData, [name]: value })
  }


  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userProfileData)


    try {
      let payload = {
        displayName, email, photoURL, uid, ...userProfileData
      }
      console.log(payload)
      await setDoc(doc(__DB, "user_Profile", uid), payload)
      setTargetModel('profile')
      setVisibility(true)
      toast.success("Data uploaded Successfully ")
      setUserProfileData(initialProfileData)
    } catch (error) {
      toast.error(error.code.slice(5))
    }

  }

  return (
    <div className=' shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] bg-secondary   text-light min-w-[90vw] md:max-w-[70%] md:min-w-[70%] min-h-[70vh] md:max-h-[70vh] md:p-10  p-5 mt-20 md:mt-0 rounded-2xl'>
      <h2 className='text-2xl font-bold underline underline-offset-4 decoration-slate-400 decoration-[1.2px]'>
        Edit Your Profile Details...
      </h2>
      <form className='w-full h-full grid grid-cols-1 grid-rows-10 md:grid-cols-3 gap-x-24 gap-y-4 md:gap-y-24 mt-12'>
        <CustomInputFields name='firstName' value={firstName} handleChange={handleChange} />
        <CustomInputFields name='lastName' value={lastName} handleChange={handleChange} />
        <CustomInputFields type='tel' name='age' value={age} handleChange={handleChange} />

        {/* Country Selection */}
        <CustomSelectInputField name={'country'} value={country} data={countries} handleChange={handleChange} />

        {/* State Selection */}
        {country === 'india' ? (
          <CustomSelectInputField name={'state'} value={state} data={states} handleChange={handleChange} />
        ) : (
          <CustomSelectInputField name={'state'} value={state} handleChange={handleChange} />
        )}

        {/* City Selection */}
        {state && cities[state] ?
          <CustomSelectInputField name={'city'} value={city} data={cities[state]} handleChange={handleChange} />
          :
          <CustomSelectInputField name={'city'} value={city} handleChange={handleChange} />
        }

        {/* Gender */}
        <div>
          <p className='text-sm text-slate-300'>Select Your Gender</p>
          <div className='flex gap-2 my-2 '>
            {
              ["male", "female", "other"].map((v, i) => {
                return (
                  <label className='flex gap-2 mr-4 ' key={i}>
                    <CustomInputFields type='radio' name='gender' value={v} handleChange={handleChange} target={gender}  />
                    {v}
                  </label>
                )
              })
            }
          </div>
        </div>

        {/* DOB  */}
        <CustomInputFields type='date' label={'Select Your Date of Birth'} name='dob' value={dob} handleChange={handleChange} />

        <div className='w-full  justify-center flex items-center'>

          <button type='submit' onClick={handleSubmit} className=' px-16 py-3 bg-accent text-primary font-bold text-2xl  tracking-wider rounded-xl hover:bg-light hover:text-primary transition-all duration-300 '>
            Update
          </button>
        </div>

      </form>
      {

        (isVisibility == true && targetModel == 'profile') &&
        <Modal >
          <MyProfile />
        </Modal>
      }
    </div>

  )
}

export default EditProfile