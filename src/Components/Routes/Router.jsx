import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import ProfileContainer from '../Profile/ProfileContainer'
import EditProfile from '../Profile/ProfileComponents/EditProfile'
import DeleteAccount from '../Profile/ProfileComponents/DeleteAccount'
import EditProfilePhoto from '../Profile/ProfileComponents/EditProfilePhoto'
import ResetPassword from '../Profile/ProfileComponents/ResetPassword'
import Admin from '../Admin/Admin'
import AlbumDetails from '../Pages/AlbumPages/AlbumDetails'
import AlbumContainer from '../Pages/AlbumPages/AlbumContainer'
import Home from '../Pages/Home'
import Setting from '../Profile/ProfileComponents/Setting'
import ProtectedRoutes from './ProtectedRoutes'
import AdminRoutes from './AdminRoutes'
import LikedSongs from '../Pages/LikedSongs'
export const Routers = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: <AlbumContainer />,
                children: [
                    {
                        path: '/',
                        element:
                            <Home />
                    },
                    {
                        path: "album/:id",
                        element: <AlbumDetails />
                    },
                    {
                        path: '/user/FavoriteSongs',
                        element: <LikedSongs />
                    }
                ]
            },




        ]

    },
    {
        path: '/user',
        element:
            <ProtectedRoutes>
                <ProfileContainer />
            </ProtectedRoutes>,
        children: [

            {
                index: true,
                element: <Setting />
            },
            {
                path: 'addAlbum',
                element: (
                    <AdminRoutes>
                        <Admin />
                    </AdminRoutes>)
            },
            {
                path: "editProfile",
                element: <EditProfile />
            },
            {
                path: "deleteAccount",
                element: <DeleteAccount />
            },
            {
                path: "editProfilePhoto",
                element: <EditProfilePhoto />
            },
            {
                path: 'updatePassword',
                element: <ResetPassword />
            }


        ]
    },
])
