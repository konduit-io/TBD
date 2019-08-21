import { useContext, useEffect, useState } from "react"
import { Reducer, Store } from "@nulliel/store"

//==============
// Local Imports
//==============
import { StateContext } from "./StateContext"
import { useShouldUpdate } from "./useShouldUpdate"

export const useSlice = <T>(reducer: Reducer<T>): T => {
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
