import React, { useContext, useRef, useState } from 'react'
import CustomInputFields from '../../utilities/CustomInputFields'
import { updateProfile } from 'firebase/auth';
import { AuthUserContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { modalProviderContext } from '../../Context/ModalContext';
import Modal from '../../Model/Modal';
import MyProfile from './MyProfile';

const EditProfilePhoto = () => {
  let [photo, setPhoto] = useState(null);
  let [photoPreview, setPhotoPreview] = useState(null);

  let { authUserData } = useContext(AuthUserContext);
  let { isVisibility, setVisibility, targetModel, setTargetModel } = useContext(modalProviderContext);

  let handleChange = (e) => {
    let file = e.target.files[0];
    setPhoto(file);

    // ! preview code 
    let previewPhoto = new FileReader();
    previewPhoto.readAsDataURL(file);
    previewPhoto.onloadend = e => setPhotoPreview(e.target.result);

  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("file", photo);
    formdata.append("upload_preset", "rhythm");
    formdata.append("cloud_name", "dgdkrgtlv");

    try {
      let cloudinaryURL = await axios
      .post("https://api.cloudinary.com/v1_1/dgdkrgtlv/upload", formdata);
      await updateProfile(authUserData, { photoURL: cloudinaryURL.data.url });
      toast.success("Profile photo updated successfully");
      setTargetModel('profile');
      setVisibility(true);
      setPhoto(null);
      setPhotoPreview(null);

    } catch (error) {
      toast.error(error.code.slice(5));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 ">
      {photoPreview && (
        <figure className="text-light flex flex-col items-center">
          <img
            src={photoPreview}
            alt="select"
            className="rounded-full w-[150px] h-[150px] shadow-[0_0_35px_15px_#292C35]
               filter drop-shadow-2xl transition-all duration-300 object-cover object-top"
          />
          <figcaption className="text-center mt-6 text-light font-bold font-serif text-2xl">Preview</figcaption>
        </figure>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] justify-center items-center gap-4 bg-secondary min-h-[30vh] md:w-[30vw] rounded-2xl text-light px-8">

        <h2 className="font-bold text-2xl text-light mb-3">Upload New Profile Photo</h2>
        <CustomInputFields name="photo" type="file" handleChange={handleChange} />
        <button className="bg-accent text-black px-4 py-2 rounded-lg font-bold hover:bg-accent/80">Upload</button>

      </form>
      {(isVisibility === true && targetModel === 'profile') && (
        <Modal>
          <MyProfile />
        </Modal>
      )}
    </div>
  );
};

export default EditProfilePhoto;
