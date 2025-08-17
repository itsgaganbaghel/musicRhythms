import React, { Children, useContext } from 'react'
import { AuthUserContext } from '../Context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const PublicRoutes = ({ children }) => {
    let { authUserData } = useContext(AuthUserContext)
    let navigate = useNavigate();
    // console.log(authUserData)
    if (!authUserData?.accessToken ||
        !window.localStorage.getItem("TOKEN")) {
        return <>
            {children}
        </>
    } else {
        // return <Navigate to={'/'} />
        return navigate('/')
    }
}

export default PublicRoutes