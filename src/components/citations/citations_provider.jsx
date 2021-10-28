import React, { createContext } from 'react'

export const CitationCONTEXT = createContext();

export function CitationsProvider({allCitations, children}) {

    return (
        <CitationCONTEXT.Provider value={{
            allCitations
        }}>
            {children}
        </CitationCONTEXT.Provider>
    )
}
