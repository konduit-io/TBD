import { useContext, useEffect, useState } from "react"

//==============
// Local Imports
//==============
import { Reducer } from "../reducer"
import { StateContext } from "./stateContext"
import { Store } from "../types"
import { useShouldUpdate } from "./useShouldUpdate"

/**
 *
 * @param reducer
 */
export function useSlice<T>(reducer: Reducer<T>): T {
    const doUpdate = useShouldUpdate([ reducer ])

    const store = useContext(StateContext) as Store
    const [value, setValue] = useState(store.resolve(reducer))

    useEffect(doUpdate ? () => {
        const slice = store.wrapReducer(reducer)

        slice.subscribe(setValue)
        return () => slice.unsubscribe(setValue)
    } : () => {}, [])

    return value
}
