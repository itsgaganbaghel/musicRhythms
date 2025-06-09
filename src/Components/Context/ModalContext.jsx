import React, { createContext, useState } from 'react'

export let modalProviderContext = createContext()

const ModalContext = ({ children }) => {
    let [isVisibility, setVisibility] = useState(false)
    let [targetModel, setTargetModel] = useState(null)
    return (
        <modalProviderContext.Provider value={{ isVisibility, setVisibility, targetModel, setTargetModel }}>
            {children}
        </modalProviderContext.Provider>
    )
}

export default ModalContext