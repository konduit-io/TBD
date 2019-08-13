//======
// Types
//======
import { AnyAction } from "./action"
import { Slice, createSlice } from "./slice"
import { Reducer } from "./reducer"
import { Dispatch, InternalSlice, InternalStore, InternalWrapReducer, Middleware, MiddlewareAPI, Resolve } from "./types"
import { unstack } from "./unstack"

export function createStore(...middleware: Middleware[]) {
    const store = {
        slices: new Map(),
        isDispatching: false,
        isEffect: false,
    } as InternalStore

    const middlewareAPI = middleware.reduceRight<MiddlewareAPI>(
        (acc, middleware) => Object.assign({}, acc, middleware(store, acc)),
        {
            dispatch:    createDispatch(store),
            resolve:     createResolve(store),
            wrapReducer: createWrapReducer(store),
        }
    )

    Object.assign(store, middlewareAPI)

    return store
}

function createDispatch(store: InternalStore): Dispatch {
    function dispatch(action: AnyAction) {
        if (store.isDispatching) {
            throw new Error("Reducers may not dispatch actions")
        }

        if (action.reducers.length === 0) {
            throw new Error(`Action '${action.type}' has no assigned reducers. Did you forget to use reducer.on(${action.type}, ...)?`)
        }

        const slices = action.reducers.map(store.wrapReducer)

        try {
            store.isDispatching = true
            slices.forEach((slice) => { slice.updateState(action) })
        } finally {
            store.isDispatching = false
        }

        slices.forEach((slice) => slice.notify())
    }

    return unstack(dispatch)
}

function createResolve(store: InternalStore): Resolve
{
    return function resolve<TState>(slice: Slice<TState> | Reducer<TState>)
    {
        if (store.isDispatching && !store.isEffect) {
            throw new Error(
                "You may not call store.resolve() while the reducer is executing. " +
                "The reducer has already received the state as an argument. " +
                "Pass it down from the top reducer instead of reading it from the store"
            )
        }

        return (typeof slice === "function")
            ? store.wrapReducer(slice).resolve()
            : slice.resolve()
    }
}

function createWrapReducer(store: InternalStore): InternalWrapReducer
{
    return function wrapReducer<TState>(reducer: Reducer<TState>)
    {
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
