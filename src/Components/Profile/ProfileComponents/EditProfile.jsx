import React, { useContext, useState } from "react";
import CustomInputFields from "../../utilities/CustomInputFields";
import CustomSelectInputField from "../../utilities/CustomSelectInputField";

import countries from "../../utilities/InputData/Countries.json";
import states from "../../utilities/InputData/states.json";
import cities from "../../utilities/InputData/Cities.json";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../../Backend/Firebase";
import { AuthUserContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { modalProviderContext } from "../../Context/ModalContext";
import Modal from "../../Model/Modal";
import MyProfile from "./MyProfile";

const EditProfile = () => {
  let { authUserData, profileData } = useContext(AuthUserContext || {});

  let initialProfileData = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    gender: profileData?.gender || "",
    age: profileData?.age || "",
    dob: profileData?.dob || "",
    country: profileData?.country || "india",
    state: profileData?.state || "",
    city: profileData?.city || "",
  };
  let { isVisibility, setVisibility, targetModel, setTargetModel } =
    useContext(modalProviderContext);

  let [userProfileData, setUserProfileData] = useState(initialProfileData);
  let { firstName, lastName, age, dob, country, state, city, gender } =
    userProfileData;

  let { displayName, email, uid, photoURL } = authUserData ? authUserData : "";

  let handleChange = (e) => {
    let { name, value } = e.target;
    setUserProfileData({ ...userProfileData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userProfileData);

    try {
      let payload = {
        displayName,
        email,
        photoURL,
        uid,
        ...userProfileData,
      };
      // console.log(payload);
      await setDoc(doc(__DB, "user_Profile", uid), payload);
      setTargetModel("profile");
      setVisibility(true);
      toast.success("Data uploaded Successfully ");
      setUserProfileData(initialProfileData);
    } catch (error) {
      toast.error(error.code.slice(5));
    }
  };

  return (
    <div
      className="shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655] 
      bg-secondary text-light 
      w-[95vw] sm:w-[90vw] md:w-[70vw] lg:w-[75vw] xl:w-[65vw] 
      max-h-[85vh]  h-fit
      p-5 sm:p-6 md:p-8 lg:p-10 
      mt-8 md:mt-10 rounded-2xl mx-auto      "
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold underline underline-offset-4 decoration-slate-400 decoration-[1.2px]">
        Edit Your Profile Details...
      </h2>

      <form
        className="w-full h-full grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
        gap-x-6 md:gap-x-10 lg:gap-x-14 
        gap-y-3 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 
        mt-8 sm:mt-10 md:mt-12 
        "
      >
        <CustomInputFields
          name="firstName"
          value={firstName}
          handleChange={handleChange}
        />
        <CustomInputFields
          name="lastName"
          value={lastName}
          handleChange={handleChange}
        />
        <CustomInputFields
          type="tel"
          name="age"
          value={age}
          handleChange={handleChange}
        />

        {/* Country */}
        <CustomSelectInputField
          name={"country"}
          value={country}
          data={countries}
          handleChange={handleChange}
        />

        {/* State */}
        {country === "india" ? (
          <CustomSelectInputField
            name={"state"}
            value={state}
            data={states}
            handleChange={handleChange}
          />
        ) : (
          <CustomSelectInputField
            name={"state"}
            value={state}
            handleChange={handleChange}
          />
        )}

        {/* City */}
        {state && cities[state] ? (
          <CustomSelectInputField
            name={"city"}
            value={city}
            data={cities[state]}
            handleChange={handleChange}
          />
        ) : (
          <CustomSelectInputField
            name={"city"}
            value={city}
            handleChange={handleChange}
          />
        )}

        {/* Gender */}
        <div className="col-span-1">
          <p className="text-sm text-slate-300">Select Your Gender</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {["male", "female", "other"].map((v, i) => (
              <label className="flex gap-2 items-center" key={i}>
                <CustomInputFields
                  type="radio"
                  name="gender"
                  value={v}
                  handleChange={handleChange}
                  target={gender}
                />
                {v}
              </label>
            ))}
          </div>
        </div>

        {/* DOB */}
        <CustomInputFields
          type="date"
          label={"Select Your Date of Birth"}
          name="dob"
          value={dob}
          handleChange={handleChange}
        />

        {/* Button full width row */}
        <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center items-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 sm:px-12 md:px-16 py-2 sm:py-3 bg-accent text-primary font-bold text-lg sm:text-xl md:text-2xl tracking-wider rounded-xl hover:bg-light hover:text-primary transition-all duration-300"
          >
            Update
          </button>
        </div>
      </form>

      {isVisibility === true && targetModel === "profile" && (
        <Modal>
          <MyProfile />
        </Modal>
      )}
    </div>
  );
};

export default EditProfile;
