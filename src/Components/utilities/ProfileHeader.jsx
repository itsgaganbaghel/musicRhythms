import { useContext } from "react"
import { AuthUserContext } from "../Context/AuthContext"


const ProfileHeader = () => {
    let { authUserData } = useContext(AuthUserContext || {})
    return (
        <div className="flex items-center bg-accent px-10 md:gap-16 gap-4  h-[22vh] text-primary rounded-t-2xl relative  ">
            <img
                src={authUserData?.photoURL}
                alt="Profile Picture"
                className="md:w-[8.5rem] md:h-[8.5rem] w-[5rem]  rounded-full object-cover object-center border-2 border-light/70  "
            />

            <div>
                <p className="md:text-4xl text-[1.7rem] text-primary font-serif font-semibold">{authUserData?.displayName}</p>
                <p className="text-secondary text-sm ">{authUserData?.email}</p>
            </div>
        </div>
    )
}

export default ProfileHeader