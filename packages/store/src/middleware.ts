import { InternalStore, Middleware } from "../index"
import { createDispatch } from "./dispatch"
import { createResolve } from "./resolve"

export function resolveMiddleware(store: InternalStore, ...middlewares: Middleware[]) {
    const api = {
        dispatch:    createDispatch(store),
        resolve:     createResolve(store),
        wrapReducer: createWrapReducer(store),
    }

    return middlewares.reduceRight(
        (acc, middleware) => Object.assign({}, acc, middleware(store, acc)),
        api,
    )
}
