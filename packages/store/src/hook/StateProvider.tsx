import React, { ReactChild, useRef } from "react"

//==============
// Local Imports
//==============
import { StateContext } from "./stateContext"
import {Middleware, Store} from "../types"
import { createStore } from "../store"
import { useShouldUpdate } from "./useShouldUpdate"

//======
// Props
//======
export interface ProviderProps {
    children:    ReactChild
    middleware?: Middleware[]
}

/**
 *
 */
export function StateProvider({ children, middleware }: ProviderProps)
{
    const doUpdate = useShouldUpdate()
    const storeRef = useRef<Store>(doUpdate ? createStore(...middleware || []) : {} as Store)

    return (
        <StateContext.Provider value={storeRef.current}>
            {children}
        </StateContext.Provider>
    )
}
