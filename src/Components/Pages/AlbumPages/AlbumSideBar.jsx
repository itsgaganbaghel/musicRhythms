import React, { useContext } from 'react'
import CustomNavLink from '../../utilities/CustomNavLink'
import Logo from '../../NavBarComponent/Logo'
import { modalProviderContext } from '../../Context/ModalContext'
import Modal from '../../Model/Modal'
import { signOut } from 'firebase/auth'
import { __AUTH } from '../../../Backend/Firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthUserContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'

const AlbumSideBar = () => {
    let { isVisibility, setVisibility, targetModel, setTargetModel } = useContext(modalProviderContext)
    let { profileData, authUserData, role } = useContext(AuthUserContext || {})
    let { isMenuVisible, setIsMenuVisible } = useContext(AuthUserContext)
    let navigate = useNavigate()
    let location = useLocation()
    let handleSingOut = (e) => {
        signOut(__AUTH)
        window.localStorage.removeItem("TOKEN")
        navigate('/')
        toast.success("Log Out Successfully")
    }

    let handleSingOutMethods = () => {
        navigate('/')
        setTargetModel('logout')
        setVisibility(true)
    }

    let linksArray = [["Home", '#Hero'], ["Top Albums", '#top_Album'], ["Trending Artist", '#trending_Artist'], [' New Release', '#new_Release'], ['Random Songs', '#random_Songs']]

    return (
        <div className=' md:min-h-[100vh] min-h-[90vh]  flex flex-col gap-2  items-center bg-primary border-r-2 border-r-accent text-light font-bold tracking-wide px-3  '
            onClick={() => setIsMenuVisible(false)}
        >
            <div className='hidden md:block my-3'>
                <Logo />
            </div>
            <p className='w-full pl-1 opacity-70 text-sm text-accent'>Browse</p>
            {
                location?.pathname == "/" ?
                    <>
                        {
                            linksArray.map((v, i) => {
                                return (
                                    <a href={v[1]} key={i}
                                        className='w-full text-start  hover:text-center py-2 px-4 rounded-lg hover:bg-light hover:text-primary transition-all duration-300'
                                    >
                                        {v[0]}
                                    </a>
                                )
                            })
                        }

                    </>
                    :
                    <>
                        <CustomNavLink to={'/'} text={"Home"} />
                        <CustomNavLink to={'/'} text={"Top Albums"} />
                        <CustomNavLink to={'/'} text={"Trending Artist "} />
                        <CustomNavLink to={'/'} text={"New Release"} />
                        <CustomNavLink to={'/'} text={"Random Songs"} />
                    </>
            }



            <p className='w-full pl-1 opacity-70 text-sm text-accent mt-3'>Library</p>
            <CustomNavLink to={'/'} text={"All Albums"} />
            {
                authUserData !== null &&
                <CustomNavLink to={'/user/FavoriteSongs'} text={"Liked Songs"} />
            }

            {
                authUserData !== null &&
                <>
                    <p className='w-full pl-1 opacity-70  text-accent mt-3'>user</p>
                    {
                        profileData?.isAdmin &&
                        < CustomNavLink to={'/user/addAlbum'} text={"Add Album"} />
                    }
                    <CustomNavLink to={'/user'} text={"Setting"} />
                    <button className='w-full text-start  hover:text-center py-2 px-4 rounded-lg hover:bg-light hover:text-primary transition-all duration-300'
                        onClick={handleSingOutMethods}
                    >Sign Out</button>

                    {
                        (isVisibility == true && targetModel == 'logout') &&
                        <Modal >
                            <div className='px-44 rounded-2xl py-24 shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] bg-secondary '>
                                <p className='text-3xl font-serif text-light pb-10'>Are You want to Log Out ?</p>
                                <div className='flex gap-10 '>
                                    <button className='w-full border   text-accent text-center py-2 px-4 rounded-lg hover:bg-light hover:text-primary transition-all duration-300'
                                        onClick={handleSingOut}
                                    >Yes</button>
                                    <button className='w-full border  text-accent  text-center py-2 px-4 rounded-lg hover:bg-light hover:text-primary transition-all duration-300'
                                        onClick={() => { setTargetModel(null), setVisibility(false) }}
                                    >No</button>
                                </div>
                            </div>
                        </Modal>
                    }

                </>
            }
        </div>
    )
}

export default AlbumSideBar