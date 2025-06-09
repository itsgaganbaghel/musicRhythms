import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomNavLink from '../utilities/CustomNavLink';

const ProfileSidebar = () => {
  return (
    <div className='relative basis-[16%] flex flex-col gap-6 pt-10 items-center bg-primary border-r-2 border-r-secondary text-light font-bold tracking-wide p-6 shadow-md border-t-2 border-t-primary'
    >
  
    <CustomNavLink to={'/user'} text={"My Profile"} />
    <CustomNavLink to={'/user/editProfile'} text={"Edit Profile"} />
    <CustomNavLink to={'/user/editProfilePhoto'} text={"Edit Profile Photo"} />
    <CustomNavLink to={'/user/updatePassword'} text={"Update Password"} />
    <CustomNavLink to={'/user/deleteAccount'} text={"Delete Account"} />
  
  </div>
  
  );
}

export default ProfileSidebar;
