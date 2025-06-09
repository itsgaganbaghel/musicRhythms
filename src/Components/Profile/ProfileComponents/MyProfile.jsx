
import { useCallback, useContext, useState } from "react"
import { AuthUserContext } from "../../Context/AuthContext"
import { __DB } from "../../../Backend/Firebase"
import { NavLink } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa"
import profile404 from "../../../assets/profile404.png"
import ProfileHeader from "../../utilities/ProfileHeader"
import { modalProviderContext } from "../../Context/ModalContext"

const MyProfile = () => {


  let { authUserData, profileData } = useContext(AuthUserContext || {})
  let { setVisibility, setTargetModel } = useContext(modalProviderContext)

  return (
    authUserData ? (
      <div className="bg-secondary min-w-[95vw] md:min-w-fit h-[60vh] rounded-2xl">
        <ProfileHeader />

        <section className="max-h-[38vh] w-full  rounded-b-2xl bg-secondary text-light shadow-[inset_5px_-5px_5px_#101215,inset_-5px_2px_6px_#424655]">

          {profileData ? (
            <section className="h-[38vh] pt-5 rounded-lg shadow-lg grid grid-cols-2 text-light  relative pl-16">

              <NavLink to="/user/editProfile" className="text-accent text-[1.6rem] top-3 right-5  absolute"
                onClick={() => { setTargetModel(null), setVisibility(false) }}
              >
                <FaRegEdit />
              </NavLink>

              {
                ['age', 'dob', 'country', "state", "city", "gender"].map((v, i) => {
                  return (
                    <div key={i}>
                      <p className="font-medium text-accent ">{v.slice(0, 1).toLocaleUpperCase()}{v.slice(1)}: </p>
                      <p className="font-serif">{profileData[v]} </p>
                    </div>
                  )
                })
              }

            </section>

          ) : (
            <figure className="w-full h-[38vh] flex flex-col gap-1 justify-center items-center">
              <img src={profile404} className="w-[34%] p-2" />
              <figcaption className="font-bold text-xl">
                Profile Data is Not Available
              </figcaption>
            </figure>
          )}
        </section>
      </div>
    ) : (
      <p className="text-accent">Loading....</p>
    )

  )
}

export default MyProfile