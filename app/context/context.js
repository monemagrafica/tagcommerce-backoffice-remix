import React, { createContext } from "react"

const ShareContext = createContext()


const ContextData = ({ children }) => {

    const dataToShare = {
        data: [1, 2, 3, 4, 5, 6]
    }
    //provider che wrappi i componenti che devono ricevere i dati
    return (
        <ShareContext.Provider value={{ dataToShare }} >
            {children}
        </ShareContext.Provider>
    )
}

export { ShareContext, ContextData }