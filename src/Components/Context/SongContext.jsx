import axios from 'axios'
import { collection, getDocs } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { __DB } from '../../Backend/Firebase'

export let addAlbumContext = createContext()

const SongContext = ({ children }) => {
    let [songsData, setSongsData] = useState([]) // songs data : for payload
    let [songIndex, setSongIndex] = useState(null) //songIndex : dynamic indexing updation
    const [isPlaying, setIsPlaying] = useState(false);

    let [audioPlayerData, setAudioPlayerData] = useState([]) // current song data 
    
    let [allAlbums, setAllAlbums] = useState([]) // all albums data : for displaying albums
    let [allSongs, setAllSongs] = useState([]) // all songs for new release , top , random etc

    let [favorite, setFavorite] = useState()

    // for uploading all the phots and songs url one by one in the cloudinary and return the url of the file
    let uploadOnCloudinary = async (e) => {
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", "rhythm")
        formData.append("cloud_name", "dgdkrgtlv")
        formData.append("folder", "rhythm")

        try {
            let cloudinaryURL = await axios.post("https://api.cloudinary.com/v1_1/dgdkrgtlv/upload", formData)
            return cloudinaryURL?.data?.url;
        } catch (error) {
            toast.error(error.code.slice(5))
        }
    }

    let fetchAllAlbums = async () => {
        const albumCollections = collection(__DB, "albumData");
        const getAlbumDocs = await getDocs(albumCollections)
        const payload = getAlbumDocs.docs.map(
            album => {
                return { ...album.data(), id: album.id }
            }
        )
        setAllAlbums([...allAlbums, ...payload])
    }

    useEffect(() => {
        fetchAllAlbums()
    }, [])

    let mergeAllSongs = () => {
        setAllSongs(allAlbums.flatMap(album => album?.allSongsData))
    }
    useEffect(() => {
        mergeAllSongs()
    }, [allAlbums])

    return (
        <addAlbumContext.Provider value={{ songIndex, setSongIndex, uploadOnCloudinary, setSongsData, songsData, allAlbums, allSongs, audioPlayerData, setAudioPlayerData, favorite, isPlaying, setIsPlaying }} >
            {children}
        </addAlbumContext.Provider>
    )
}

export default SongContext