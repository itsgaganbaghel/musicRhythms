import React, { useContext, useState } from 'react'
import { RiDislikeLine, RiPlayLargeLine } from 'react-icons/ri'
import { addAlbumContext } from '../../Context/SongContext'
import gif from "../../../assets/playing.gif"
import { FaRegHeart } from "react-icons/fa";
import { AuthUserContext } from '../../Context/AuthContext'

import toast from 'react-hot-toast'
import { doc, setDoc } from 'firebase/firestore'
import { __DB } from '../../../Backend/Firebase'

const AlbumSongs = ({ album }) => {
    let { allSongsData } = album;
    console.log(allSongsData, "albumSongs - all songs ")

    let { songIndex, setSongIndex, audioPlayerData, setAudioPlayerData, setIsPlaying, isPlaying } = useContext(addAlbumContext);
    let { profileData, authUserData } = useContext(AuthUserContext)

    let checkISFavorite = () => {
        console.log('checking')
    }


    let handleFavouriteSongs = async (song) => {
        if (!authUserData?.uid) {
            toast.error("Login first");
            return;
        }

        let isSongExists = profileData?.favouriteSongs?.some((v) => v.songName === song.songName);

        if (isSongExists) {
            toast.error("Song is already in Favourite");
            return;
        }

        let payload = {
            ...profileData,
            favouriteSongs: [...(profileData?.favouriteSongs || []), song]
        };

        try {
            await setDoc(doc(__DB, "user_Profile", authUserData?.uid), payload);
            toast.success("Song is added in Your Favourites");
        } catch (error) {
            toast.error("Failed to update favourites");
            toast.error(error.code.slice(5))
        }
    };


    let handleAudioInAlbum = (indexValue) => {
        setAudioPlayerData(album?.allSongsData)
        setSongIndex(indexValue)
        setIsPlaying(true)
    }

    return (
        <div className='w-full md:px-10 px-2 '>
            <div className=' w-full  grid grid-cols-2 md:grid-cols-4 text-2xl py-5'>
                <article className=' flex justify-start gap-4 md:gap-10 md:px-6 '>
                    <p className='text-center  w-[20%]'>#</p>
                    <p className='text-center'>Track</p>
                </article>
                <p className='text-start pl-6'>Song Name </p>
                <p className='hidden md:block text-center'>Add to favorite</p>
            </div>

            {
                allSongsData.map((song, index) => {
                    return (
                        <div key={index} className='w-full border-2 border-secondary h-[100px]   grid grid-cols-[40%_60%] md:grid-cols-4 mb-10 rounded-md  items-center md:px-10 hover:bg-secondary'
                            style={(audioPlayerData.length > 0 && audioPlayerData[songIndex]?.songName === song.songName)
                                ? { background: "#292C35" }
                                : {}}
                        >
                            {/* Song Number and Thumbnail */}
                            <div className='flex items-center pl-2  md:pl-0' >
                                <p className='text-2xl w-[20%]'>{index + 1}.</p>
                                <div className='relative group' onClick={() => handleAudioInAlbum(index)}>
                                    <img
                                        src={song?.songThumbnail}
                                        className='w-[90px] h-[80px] rounded-md object-cover border-[1px] border-slate-600/40'
                                        alt="Song Thumbnail"
                                    />
                                    {/* Overlay and Play Button */}
                                    <div className='absolute inset-0 bg-black/70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md'>
                                        <button className='text-5xl text-white'>
                                            <RiPlayLargeLine />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Song Details */}
                            <div>
                                <p className=' text-0.5rem] md:text-[1.3rem] font-semibold'>{song.songName}</p>
                                <p className='text-gray-400 font-serif text-[0.8rem]'>{song.songSingers}</p>
                            </div>

                            <div className='hidden  cursor-pointer text-xl md:flex justify-center' onClick={() => handleFavouriteSongs(song)}>
                                {
                                    // isSongExists === true ? <RiDislikeLine /> : <FaRegHeart />
                                }
                            </div>


                            <div className=' hidden md:flex justify-center items-center w-full h-full'>

                                {
                                    ((audioPlayerData.length > 0) && (audioPlayerData[songIndex].songName == song.songName)) && isPlaying == true && <img src={gif} className='w-[120px] h-1/2' />
                                }
                            </div>
                        </div >
                    )
                })
            }
        </div >
    )
}

export default AlbumSongs
