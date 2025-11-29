import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import FallbackUI from "../Pages/Home/FallbackUI";

// ✅ Lazy imports
const ProfileContainer = lazy(() => import("../Profile/ProfileContainer"));
const EditProfile = lazy(() =>
  import("../Profile/ProfileComponents/EditProfile")
);
const DeleteAccount = lazy(() =>
  import("../Profile/ProfileComponents/DeleteAccount")
);
const EditProfilePhoto = lazy(() =>
  import("../Profile/ProfileComponents/EditProfilePhoto")
);
const ResetPassword = lazy(() =>
  import("../Profile/ProfileComponents/ResetPassword")
);
const Admin = lazy(() => import("../Admin/Admin"));
const AlbumDetails = lazy(() => import("../Pages/AlbumPages/AlbumDetails"));
const AlbumContainer = lazy(() => import("../Pages/AlbumPages/AlbumContainer"));
const Home = lazy(() => import("../Pages/Home"));
const Setting = lazy(() => import("../Profile/ProfileComponents/Setting"));
const LikedSongs = lazy(() => import("../Pages/LikedSongs"));

// ✅ Suspense wrapper for all routes
const withSuspense = (element) => (
  <Suspense fallback={<FallbackUI data={"Content"} />}>{element}</Suspense>
);

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AlbumContainer />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "album/:id",
            element: withSuspense(<AlbumDetails />),
          },
          {
            path: "/user/FavoriteSongs",
            element: (
              <ProtectedRoutes>{withSuspense(<LikedSongs />)}</ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoutes>{withSuspense(<ProfileContainer />)}</ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<Setting />),
      },
      {
        path: "addAlbum",
        element: <AdminRoutes>{withSuspense(<Admin />)}</AdminRoutes>,
      },
      {
        path: "editProfile",
        element: withSuspense(<EditProfile />),
      },
      {
        path: "deleteAccount",
        element: withSuspense(<DeleteAccount />),
      },
      {
        path: "editProfilePhoto",
        element: withSuspense(<EditProfilePhoto />),
      },
      {
        path: "updatePassword",
        element: withSuspense(<ResetPassword />),
      },
    ],
  },
]);
