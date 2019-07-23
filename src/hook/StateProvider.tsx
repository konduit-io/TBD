import React, { ReactChild, useRef } from "react"

//==============
// Local Imports
//==============
import { StateContext } from "./stateContext"
import { Store } from "../types"
import { createStore } from "../store"
import { useShouldUpdate } from "./useShouldUpdate"

//======
// Props
//======
export interface ProviderProps {
    children: ReactChild
}

/**
 *
 */
export function StateProvider({ children }: ProviderProps)
{
    const doUpdate = useShouldUpdate()
    const storeRef = useRef<Store>(doUpdate ? createStore() : {} as Store)

    return (
        <StateContext.Provider value={storeRef.current}>
            {children}
        </StateContext.Provider>
    )
}
