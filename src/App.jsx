import React, { useContext, useEffect, useRef, useState } from 'react'
import NavbarContainer from './Components/NavBarComponent/NavbarContainer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AlbumSideBar from './Components/Pages/AlbumPages/AlbumSideBar'

import logo from "./assets/logo.png"

import { AuthUserContext } from './Components/Context/AuthContext'
import CustomAudioPlayer from './Components/utilities/CustomAudioPlayer'
import { addAlbumContext } from './Components/Context/SongContext'

const App = () => {

  let { showWebsite, setShowWebsite } = useContext(AuthUserContext)
  let { audioPlayerData } = useContext(addAlbumContext)
  console.log("audioPlayerData", audioPlayerData)
  useEffect(() => {
    setTimeout(() => {
      setShowWebsite(true);
    }, 1600);

  }, []);

  return (
    <>
      {
        !showWebsite &&
        <div className='bg-primary min-h-[100vh] min-w-full flex flex-col justify-center items-center overflow-hidden'>
          <img src={logo} className='websiteLoader w-52' alt="Loading..." />
        </div>
      }
      <div className={`w-full flex ${showWebsite ? "block" : "hidden"}`}>
        <div className='lg:w-[14%] hidden md:block'>
          <AlbumSideBar />
        </div>

        <div className='flex flex-col lg:w-[86%] w-full'>
          <NavbarContainer />
          <Outlet />
          {
            audioPlayerData.length > 0 &&
            <div className='absolute bottom-0 left-0 z-30'>
              <CustomAudioPlayer tracks={audioPlayerData} />
            </div>
          }
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default App
