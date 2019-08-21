import { InternalStore, Reducer } from "@nulliel/store"

export function aggregateReducers(store: InternalStore, ...reducers: Reducer<any>[]) {
    const state: { [props: string]: unknown } = {}

    reducers.forEach((reducer) => {
        state[reducer.name] = store.resolve(reducer)
    })

    return state
}