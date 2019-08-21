import { InternalStore, Middleware } from "../index"
import { assign } from "./polyfill/object"
import { createDispatch } from "./dispatch"
import { createResolve } from "./resolve"
import { createWrapReducer } from "./wrapReducer"

export const resolveMiddleware = (store: InternalStore, ...middlewares: Middleware[]) => {
    const api = {
        dispatch:        createDispatch(store),
        resolve:         createResolve(store),
        wrapReducer:     createWrapReducer(store),
        reducerInjector: createReducerInjector(store),
        actionInjector:  createActionInjector(store),
    }

    return middlewares.reduceRight(
        (acc, middleware) => assign({}, acc, middleware(store, acc)),
        api,
    )
}
