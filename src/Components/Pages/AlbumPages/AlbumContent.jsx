import React from 'react'

const AlbumContent = ({ children }) => {
    return (
        <div className='width-[100%] max-h-[90vh] h-[90vh] overflow-y-scroll'
            style={{
                scrollbarWidth: "none"
            }}>
            {children}
        </div>
    )
}

export default AlbumContent