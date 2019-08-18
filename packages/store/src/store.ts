import { InternalStore, Middleware, Store } from "../index"
import { resolveMiddleware } from "./middleware"

function createInternalStore(): InternalStore {
    return {
        slices:        new Map(),
        isDispatching: false,
        isEffect:      false,
    } as InternalStore
}

/**
 *
 * @param middleware
 *
 * @return Store
 */
export function createStore(...middleware: Middleware[]): Store {
    const store = createInternalStore()
    const api   = resolveMiddleware(store, ...middleware)

    Object.assign(store, api)

    return store
}
