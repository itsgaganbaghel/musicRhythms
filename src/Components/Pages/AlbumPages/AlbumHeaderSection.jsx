import React, { useEffect, useRef } from 'react'

const AlbumHeaderSection = ({ album }) => {
    let { albumDescription, albumLanguage, albumName, albumThumbnail, artistName, releasedDate } = album
    let topRef = useRef()
    useEffect(() => {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });

    },[])
    return (
        <div className='w-full md:h-[35vh] bg-secondary text-primary flex  md:flex-row flex-col items-center  justify-center md:pl-6 py-5 md:py-0 gap-5 md:gap-0 ' ref={topRef}>
            <header className='h-full md:w-[30%]'>
                <figure className='h-full w-[100%] flex items-center justify-center'>
                    <img src={albumThumbnail} className=' w-[70%] md:h-[90%] rounded-lg' />
                </figure>
            </header>
            <aside className='font-semibold text-light font-mono md:w-[70%] md:pr-6 px-5'>
                <p className='text-3xl md:text-7xl text-center  tracking-widest mb-5 font-serif  text-accent'>{albumName.toUpperCase()}</p>
                <p className='pl-3 text-[1.1rem] '> By : {artistName}.</p>
                <p className='text-[1.1rem] pl-3'>{albumDescription.split(".")[0]}. </p>
                <p className=' text-[1.1rem]  pl-3'> Released on " {releasedDate} "  in {albumLanguage}.</p>
            </aside>
        </div>
    )
}

export default AlbumHeaderSection