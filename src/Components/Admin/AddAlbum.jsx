import React, { useContext, useState } from 'react'
import CustomInputFields from '../utilities/CustomInputFields'
import { addAlbumContext } from '../Context/SongContext'
import toast from 'react-hot-toast'
import { addDoc, collection } from 'firebase/firestore'
import { __DB } from '../../Backend/Firebase'

const AddAlbum = () => {
  let initialAlbumData = {
    albumName: "",
    artistName: "",
    releasedDate: "",
    albumThumbnail: "",
    albumLanguage: "",
    albumDescription: ""
  }

  let [albumData, setAlbumData] = useState(initialAlbumData)

  let { albumName, artistName, releasedDate, albumLanguage, albumDescription } = albumData

  let { uploadOnCloudinary, songsData } = useContext(addAlbumContext)

  let handleChange = async (e) => {
    let { name, value, type } = e.target
    type == "file" ?
      setAlbumData({ ...albumData, [name]: await uploadOnCloudinary(e) })
      :
      setAlbumData({ ...albumData, [name]: value })
    type == "file" &&
      toast.success(`${name} added`)
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(albumData)
    if (songsData.length > 0) {
      let payload = { ...albumData, allSongsData: [...songsData] }

      try {
        let albumCollection = collection(__DB, "albumData")
        await addDoc(albumCollection, payload)
        setAlbumData(initialAlbumData)
        toast.success("Album Added Successfully")
      } catch (error) {
        toast.error(error.code.slice(5))
      }
    } else {
      toast.error("Please Add One Song at least")
    }
  }
  return (
    <div className='text-light border bg-secondary border-secondary w-[90%]  p-10 rounded-lg'>
      <h2 className='text-2xl text-accent font-bold underline underline-offset-4 decoration-slate-400 decoration-[1.2px]'>
        Add Album  Details Here...
      </h2>
      <form className='w-full  grid grid-cols-3 gap-x-24 gap-y-20 mt-12'>
        <CustomInputFields label={"Album Name"} name='albumName' value={albumName} handleChange={handleChange} />
        <CustomInputFields label={"Artist Name"} name='artistName' value={artistName} handleChange={handleChange} />
        <CustomInputFields label={"Album Language"} name='albumLanguage' value={albumLanguage} handleChange={handleChange} />

        <div className='col-span-3'>
          <CustomInputFields label={"Album Description"} name='albumDescription' value={albumDescription} handleChange={handleChange} />
        </div>
        <CustomInputFields label={"select Released Data"} type='date' name='releasedDate' value={releasedDate} handleChange={handleChange} />
        <CustomInputFields label={"select ALbum Thumbnail"} type='file' name='albumThumbnail' handleChange={handleChange} />

        <div className='col-span-1 flex justify-center py-2'  >
          <button type='submit' onClick={handleSubmit} className=' px-10 text-2xl bg-accent text-primary font-extrabold tracking-wider font-serif rounded-xl hover:bg-light hover:text-primary transition-all duration-300 '>
            Add Album
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddAlbum