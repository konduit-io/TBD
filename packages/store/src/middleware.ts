import { InternalStore, Middleware } from "../index"
import { assign } from "./polyfill/object"
import { createDispatch } from "./dispatch"
import { createResolve } from "./resolve"
import { createWrapReducer } from "./wrapReducer"
import { reducerInjector } from "./reducer"

export const resolveMiddleware = (store: InternalStore, ...middlewares: Middleware[]) => {
    const api = {
        dispatch:    createDispatch(store),
        resolve:     createResolve(store),
        wrapReducer: createWrapReducer(store),
        reducerInjector,
    }

    return middlewares.reduceRight(
        (acc, middleware) => assign({}, acc, middleware(store, acc)),
        api,
    )
}
