import React, { useContext } from 'react'
import { AuthUserContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    let { authUserData } = useContext(AuthUserContext || {})
    console.log(authUserData)

    if (authUserData !== null || authUserData?.accessToken 
        || window.localStorage.getItem("TOKEN")) {
        return <>{ children }</>
    } else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoutes