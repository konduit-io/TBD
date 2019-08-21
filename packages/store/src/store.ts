import { InternalStore, Middleware, Store } from "../index"
import { resolveMiddleware } from "./middleware"
import { assign } from "./polyfill/object"

/**
 *
 * @param middleware
 *
 * @return Store
 */
export const createStore = (...middleware: Middleware[]): Store => {
    const store = {
        slices:        new Map(),
        isDispatching: false,
    } as InternalStore

    return assign(
        store,
        resolveMiddleware(store, ...middleware),
    )
}
