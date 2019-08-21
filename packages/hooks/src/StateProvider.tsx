import React, { ReactChild, useRef } from "react"
import { Middleware, Store, createStore } from "@nulliel/store"

//==============
// Local Imports
//==============
import { StateContext } from "./StateContext"
import { useShouldUpdate } from "./useShouldUpdate"

//======
// Props
//======
export interface ProviderProps {
    children:    ReactChild
    middleware?: Middleware[]
}

export const StateProvider = ({ children, middleware }: ProviderProps) => {
    const doUpdate = useShouldUpdate()
    const storeRef = useRef<Store>(doUpdate ? createStore(...middleware || []) : {} as Store)

    return (
        <StateContext.Provider value={storeRef.current}>
            {children}
        </StateContext.Provider>
    )
}
