import { InternalStore, Middleware, Store } from "../index"
import { resolveMiddleware } from "./middleware"
import { assign } from "./polyfill/object"

/**
 *
 * @param middleware
 *
 * @return InternalStore
 */
const createInternalStore = (...middleware: Middleware[]): InternalStore => {
    const store = {
        slices:        new Map(),
        isDispatching: false,
    } as InternalStore

    return assign(
        store,
        resolveMiddleware(store, ...middleware),
    )
}

/**
 * Restricts store creation to only one instance.
 *
 * TODO: Reasoning
 */
export const createStore = (() => {
    let instantiated = false

    return (...middleware: Middleware[]): Store => {
        if (instantiated) {
            throw new Error("Only one store may be created")
        }

        instantiated = true

        return createInternalStore(...middleware)
    }
})()
