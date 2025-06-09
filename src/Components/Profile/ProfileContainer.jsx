import React from 'react'
import { Outlet } from 'react-router-dom'
import AlbumSideBar from '../Pages/AlbumPages/AlbumSideBar'
import { Toaster } from 'react-hot-toast'
import NavbarContainer from '../NavBarComponent/NavbarContainer'


const ProfileContainer = () => {
    return (

        <div className='w-full min-h-[100vh] flex justify-center items-center bg-primary font-sans
        '>
            <div className='hidden md:block w-[14vw]'>
                <AlbumSideBar />
            </div>
            <div className='w-[100vw] md:w-[86%] flex justify-center items-center relative flex-wrap'>
                <div className='w-full block md:hidden sticky top-0'>
                    <NavbarContainer />
                </div>
                <Outlet />
            </div>
            <Toaster />

        </div>
    )
}

export default ProfileContainer