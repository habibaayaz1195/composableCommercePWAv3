import React, {createContext, useContext, useState} from 'react'

console.log('✅ Custom StoreLocatorContext loaded from overrides')

const StoreLocatorContext = createContext(undefined)

export const StoreLocatorProvider = ({children}) => {
    const [selectedStore, setSelectedStore] = useState(null)

    return (
        <StoreLocatorContext.Provider value={{selectedStore, setSelectedStore}}>
            {children}
        </StoreLocatorContext.Provider>
    )
}

// 🩹 Safe version of hook – no error even if provider missing
export const useSelectedStore = () => {
    const context = useContext(StoreLocatorContext)
    if (!context) {
        console.warn('⚠️ useSelectedStore used outside StoreLocatorProvider — returning fallback context.')
        return {
            selectedStore: null,
            setSelectedStore: () => {}
        }
    }
    return context
}
