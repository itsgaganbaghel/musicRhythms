import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { __AUTH, __DB } from '../../Backend/Firebase'
import { doc, onSnapshot } from 'firebase/firestore'


export let AuthUserContext = createContext()

const AuthContext = ({ children }) => {
    let [authUserData, setAuthUserData] = useState(null)
    let [showWebsite, setShowWebsite] = useState(false);
    let [isMenuVisible, setIsMenuVisible] = useState(false)
    let [profileData, setProfileData] = useState(null)
    let uid = authUserData?.uid || ""  //! because initial value of the authUserData is null  , this is the safe fallback

    
  // ! useCallback : This memoizes the function so that it is only recreated if uid changes. This helps avoid unnecessary re-renders
  // ! onSnapshot(...): Listens to real-time updates for the document. Whenever the document updates, the callback function executes.
  // ! doc(__DB, "user_profile", uid) : Retrieves a reference to a FireStore document inside the "user_profile" collection with the given uid


    let fetchProfileData = useCallback(async () => {
        if (!uid) return;  //! prevent calling the firebase with empty uid
        onSnapshot(
            doc(__DB, "user_Profile", uid),
            data => {
                // ! data.data(): Extracts the document's data.
                setProfileData(data.data())
            })
    }, [authUserData?.uid])

    useEffect(() => {
        fetchProfileData()
    }, [fetchProfileData])



    // ! onAuthStateChanged functions runs on every render 
    // todo : we are going to use the useEffect with render only in mounting phase
    useEffect(() => {
        // ! this function listen the continuously the authentication state that is login and logout , This listener remains active until you explicitly stop it.
        //  for fixing this we have to use this in the return of the useEffect 
        const unsubscribe = onAuthStateChanged(__AUTH, (userInfo) => {
            // console.log(userInfo);

            if (userInfo?.emailVerified === true) {
                setAuthUserData(userInfo);
                window.localStorage.setItem("TOKEN", userInfo.accessToken);
            } else {
                setAuthUserData(null);
            }
        });

        // console.log(unsubscribe) // ! it returns one clean up function -> isUnsubscribed === true  -> unsubscribe() 

        // Cleanup function to remove the listener when component unmounts
        return () => unsubscribe();
        //  ? why it is important to use , what will happened if we doesn't use this cleanup function 
        //  Prevents Memory Leaks – If the listener is not removed, it keeps running even when the component is removed from the screen
        //  Avoids Unnecessary API Calls – Without cleanup, Firebase will keep calling the callback function even when it's no longer needed.
        //  Prevents State Updates on Unmounted Components – If the component is gone but the listener is still active, React might throw a warning:
    }, [])


    return (
        <AuthUserContext.Provider value={{ authUserData, profileData, showWebsite, setShowWebsite , setProfileData, isMenuVisible, setIsMenuVisible }}>
            {children}
        </AuthUserContext.Provider>
    )
}

export default AuthContext