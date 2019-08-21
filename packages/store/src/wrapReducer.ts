import { InternalStore, InternalWrapReducer, Reducer } from "../index"
import { createSlice } from "./slice"

export const createWrapReducer = (store: InternalStore): InternalWrapReducer =>
    <TState>(reducer: Reducer<TState>) => {
        if (store.slices.has(reducer)) {
            return store.slices.get(reducer)!
        }

        const slice = createSlice(reducer)

        store.slices.set(reducer, slice)

        return slice
    }
