import React from 'react'
import AddAlbum from './AddAlbum'
import AddSongs from './AddSongs'

const Admin = () => {
    return (
        <div className='w-[100%] rounded-2xl bg-primary h-[90vh] text-light overflow-y-scroll flex flex-col  items-center pt-16 '
            style={{
                scrollbarWidth: "none",
            }} >
            <AddAlbum />
            <AddSongs />

        </div>
    )
}

export default Admin