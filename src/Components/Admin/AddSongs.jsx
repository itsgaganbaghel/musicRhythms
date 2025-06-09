import React, { useContext, useState, useEffect } from 'react';
import CustomInputFields from '../utilities/CustomInputFields';
import toast from 'react-hot-toast';
import { addAlbumContext } from '../Context/SongContext';
import CustomSelectInputField from '../utilities/CustomSelectInputField';
import languages from '../utilities/InputData/SpokenLanguages.json';
import songTypeDataJson from '../utilities/InputData/SongType.json';

const AddSongs = () => {
  const initialSongData = {
    songName: '',
    songUrl: '',
    songSingers: '',
    songThumbnail: '',
    songReleasedDate: '',
    songType: '',
    songTags: [],
    songLanguage: [],
    songActors: '',
    songViews: 0,
    songLikes: 0,
    songDownloads: 0,
  };

  const [songData, setSongData] = useState(initialSongData);
  const [songTagsData, setSongTagsData] = useState('');
  const [songLanguageData, setSongLanguageData] = useState('');
  const [songTagsOptions, setSongTagsOptions] = useState([]);
  console.log(songLanguageData)

  const { uploadOnCloudinary, setSongsData, songsData } = useContext(addAlbumContext);

  useEffect(() => {
    if (songData.songType) {
      const selectedType = songTypeDataJson.find((v) => v.type === songData.songType);
      setSongTagsOptions(selectedType ? selectedType.tags : []);
    } else {
      setSongTagsOptions([]);
    }
  }, [songData.songType]);

  const handleSetValue = (e, setFunValue) => {
    setFunValue(e.target.value);
  };

  const addMore = (setSingleFun, keyName, newValue) => {
    if (newValue.trim()) {
      if (!songData[keyName].includes(newValue)) {
        setSongData({ ...songData, [keyName]: [...songData[keyName], newValue] });
        setSingleFun('');
        toast.success('Added Successfully');
      } else {
        setSingleFun('');
        toast.success('Please Add Unique Tags Only');
      }
    } else {
      toast.success('Please select input')
    }
  }


  const handleDelete = (index, target, keyName) => {
    setSongData({ ...songData, [keyName]: target.filter((_, i) => i !== index) });
    toast.success('Deleted Successfully');
  };

  const handleChange = async (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setSongData({ ...songData, [name]: await uploadOnCloudinary(e) });
      toast.success(`${name} added`);
    } else {
      setSongData({ ...songData, [name]: value });
    }
  };

  useEffect(() => {
    setSongData({ ...songData, songTags: [] });
  }, [songData?.songType])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSongsData([...songsData, songData]);
    setSongData(initialSongData);
    toast.success('Song Added Successfully');
  };

  return (
    <div className='text-light border bg-secondary border-secondary w-[90%] p-10 rounded-lg mt-20 mb-32'>
      <h2 className='text-2xl text-accent font-bold underline'>Add Song's Details Here...</h2>
      <form className='w-full grid grid-cols-3 gap-x-24 gap-y-32 mt-12'>
        <CustomInputFields label={'Song Name'} name='songName' value={songData.songName} handleChange={handleChange} />
        <CustomInputFields label={'Singers Name'} name='songSingers' value={songData.songSingers} handleChange={handleChange} />
        <CustomInputFields label={'Song Actors Name'} name='songActors' value={songData.songActors} handleChange={handleChange} />
        <CustomInputFields label={'Song Released Date'} type='date' name='songReleasedDate' value={songData.songReleasedDate} handleChange={handleChange} />
        <CustomInputFields label={'Select Song Url'} type='file' name='songUrl' handleChange={handleChange} />
        <CustomInputFields label={'Select Song Thumbnail'} type='file' name='songThumbnail' handleChange={handleChange} />

        <div>
          <CustomSelectInputField label={'Select Song Language'} data={languages} value={songLanguageData} name={'songLanguageData'} handleChange={(e) => handleSetValue(e, setSongLanguageData)} />
          <div className='flex justify-between mt-2'>
            {
              (songData?.songLanguage.length > 0 || songLanguageData !== '') &&
              <>
                <p>Selected Languages</p>
                <p className='border px-3 py-1 rounded-xl cursor-pointer' onClick={() => addMore(setSongLanguageData, 'songLanguage', songLanguageData)}>
                  Add
                </p>
              </>
            }
          </div>
          <div className='flex gap-2 flex-wrap'>
            {songData.songLanguage.map((lang, index) => (
              <div key={index} className='flex w-fit gap-4 px-2 py-1 my-1 rounded bg-gray-700 text-white'>
                <p>{lang}</p>
                <p onClick={() => handleDelete(index, songData.songLanguage, 'songLanguage')}>❌</p>
              </div>
            ))}

          </div>
        </div>

        <CustomSelectInputField label={'Select Song Type'} data={songTypeDataJson.map((v) => v.type)} value={songData.songType} name={'songType'} handleChange={handleChange} />
        <div>
          {songTagsOptions.length > 0 && (
            <>
              <CustomSelectInputField label={'Select Song Tags'} data={songTagsOptions} value={songTagsData} name={'songTagsData'} handleChange={(e) => handleSetValue(e, setSongTagsData)} />
              <div className='flex justify-between mt-2'>
                {
                  (songData?.songTags.length > 0 || songTagsData !== '') &&
                  <>
                    <p>Selected Tags</p>
                    <p className='border px-3 py-1 rounded-xl cursor-pointer' onClick={() => addMore(setSongTagsData, 'songTags', songTagsData)}>
                      Add
                    </p>
                  </>
                }
              </div>
              <div className='flex gap-2 flex-wrap'>
                {songData.songTags.map((tag, index) => (
                  <div key={index} className='flex w-fit gap-4 px-2 py-1 my-1 rounded bg-gray-700 text-white'>
                    <p>{tag}</p>
                    <p onClick={() => handleDelete(index, songData.songTags, 'songTags')}>❌</p>
                  </div>
                ))}
              </div>
            </>
          )

          }
        </div>

        <div className='flex justify-center items-center  col-span-3'>
          <button type='submit' onClick={handleSubmit} className='px-12 py-3 bg-accent text-primary font-extrabold tracking-wider rounded-xl hover:bg-light transition-all duration-300 text-2xl'>
            Add Song
          </button>
        </div>
      </form >
    </div >
  );
};

export default AddSongs;
