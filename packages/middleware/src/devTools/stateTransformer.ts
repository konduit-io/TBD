import { InternalStore } from "@nulliel/store"

export const aggregateState = (store: InternalStore) => {
    const state: { [name: string]: unknown } = {}

    store.slices.forEach((slice, reducer) => {
        state[reducer.name] = store.resolve(slice)
    })

    return state
}

export const injectState = (store: InternalStore, state: any) => {
    store.slices.forEach((slice, reducer) => {
        slice.injectState(state[reducer.name])
    })
}
