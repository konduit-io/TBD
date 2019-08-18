import { AnyAction, InternalStore, InternalWrapReducer, Reducer } from "../index"

export function createWrapReducer(store: InternalStore): InternalWrapReducer {
    return function wrapReducer<TState>(reducer: Reducer<TState>) {
        if (store.slices.has(reducer)) {
            return store.slices.get(reducer)!
        }

        // @ts-ignore
        let state   = reducer(undefined, { type: "@store/init" })
        const slice = createSlice(() => state, state) as InternalSlice<TState>

        slice.updateState = function updateState(action: AnyAction) {
            if (reducer.isEffect(action.type)) {
                try {
                    store.isEffect = true
                    reducer.runEffect(action.type, store, action.payload)
                } finally {
                    store.isEffect = false
                }

                return
            }

            const oldState = state
            const newState = state = reducer(state, action)

            if (oldState !== newState) {
                slice.update()
            }
        }

        // @ts-ignore
        slice.injectState = function injectState(newState = reducer(undefined, { type: "@store/init"})) {
            if (state !== newState) {
                state = newState
                slice.update()
            }
        }

        store.slices.set(reducer, slice)

        return slice
    }
}
