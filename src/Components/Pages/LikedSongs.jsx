import React, { useContext } from 'react'
import { AuthUserContext } from '../Context/AuthContext'
import { RiPlayLargeLine } from 'react-icons/ri'
import { addAlbumContext } from '../Context/SongContext'
import gif from "../../assets/playing.gif"
import { doc, setDoc } from 'firebase/firestore'
import { __DB } from '../../Backend/Firebase'
import toast from 'react-hot-toast'

const LikedSongs = () => {
    let { setProfileData, profileData, authUserData } = useContext(AuthUserContext)

    let { isPlaying, setIsPlaying } = useContext(addAlbumContext)
    let { audioPlayerData, setAudioPlayerData, setSongIndex, songIndex, favorite } = useContext(addAlbumContext)
    console.log(profileData?.favouriteSongs)

    let handleFavSongPlay = (indexValue) => {
        console.log(profileData?.favouriteSongs)
        setAudioPlayerData(profileData?.favouriteSongs)
        setSongIndex(indexValue)
    }
    let handleDeletionFavouriteSongs = async (index) => {
        if (authUserData?.uid) {
            let payload = { ...profileData, favouriteSongs: profileData?.favouriteSongs.filter((_, i) => i !== index) }
            console.log(payload)
            payload &&
                await setDoc(doc(__DB, "user_Profile", authUserData?.uid), payload)
            toast.success('Removed from favourites')
        } else {
            toast.error("login First")
        }
    }
    return (
        <div className='w-[100vw] px-2 md:w-[86vw]  md:px-10 mt-10 '>
            <span className='text-[22px] md:text-[28px] text-accent font-serif font-bold'>Your Favourite Rhythms...</span>
            <div className=' w-full  grid  grid-cols-[35%_45%_20%]  md:grid-cols-4 text-2xl pb-5 pt-10  text-[18px]'>
                <article className=' flex justify-start gap-10 px-6 '>
                    <p className='text-center  w-[20%]'>#</p>
                    <p className='text-center'>Track</p>
                </article>
                <p className='text-start pl-6'>Song Name </p>
                <p className='text-center '>Remove</p>
            </div>
            {profileData !== null &&
                profileData.favouriteSongs.length > 0 &&
                profileData?.favouriteSongs.map((song, index) => {
                    return (
                        <div key={index} className='w-full border-2 border-secondary min-h-[100px]   grid grid-cols-[40%_50%_10%]  md:grid-cols-4 mb-10 rounded-md  items-center px-0 md:px-10 hover:bg-secondary'
                            style={(audioPlayerData.length > 0 && audioPlayerData[songIndex]?.songName === song.songName)
                                ? { background: "#292C35" }
                                : {}}
                        >
                            {/* Song Number and Thumbnail */}
                            <div className='flex items-center pl-2  ' >
                                <p className='text-2xl w-[20%]'>{index + 1}.</p>
                                <div className='relative group ' onClick={() => handleFavSongPlay(index)}>
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
                            <div className=''>
                                <p className='text-[1rem] md:text-[1.3rem] font-semibold'>{song.songName}</p>
                                <p className='text-gray-400 font-serif text-[0.8rem]'>{song.songSingers}</p>
                            </div>

                            <p className='cursor-pointer text-xl text-center ' onClick={() => handleDeletionFavouriteSongs(index)}>❌</p>


                            <div className='hidden md:flex justify-center items-center w-full h-full'>

                                {
                                    ((audioPlayerData.length > 0) && (audioPlayerData[songIndex].songName == song.songName)) && isPlaying == true &&

                                    <img src={gif} className='w-[30%]' />
                                }
                            </div>
                            
                        </div >
                    )
                })

            }
        </div>
    )
}

export default LikedSongs