import React, { useContext } from 'react'
import { AuthUserContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
    let { profileData } = useContext(AuthUserContext)
    if (profileData?.isAdmin) {
        return <>{children}</>
    } else {
        return <Navigate to='/' />

    }

}
export default AdminRoutes