import { createContext } from "react"

//==============
// Local Imports
//==============
import { Dispatch, Resolve, Store, WrapReducer } from "../types"

function contextError() {
    throw new Error("StateContext referenced from outside of a StateProvider")
}

export const StateContext = createContext<Store>({
    dispatch:    contextError as Dispatch,
    resolve:     contextError as Resolve,
    wrapReducer: contextError as unknown as WrapReducer,
})
