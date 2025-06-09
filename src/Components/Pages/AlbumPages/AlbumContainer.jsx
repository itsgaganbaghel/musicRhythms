import React from 'react'
import AlbumSideBar from './AlbumSideBar'
import { Outlet } from 'react-router-dom'
import AlbumContent from './AlbumContent'

const AlbumContainer = () => {
    return (
        <div className='w-full min-h-[90vh] bg-primary text-light flex'>
            <AlbumContent>
                <Outlet />
            </AlbumContent>
        </div>
    )
}

export default AlbumContainer