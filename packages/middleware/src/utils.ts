/**
 * https://github.com/jsdf/deep-freeze
 */
import { InternalStore, Middleware, MiddlewareAPI } from "@nulliel/store"

export function deepFreeze(obj: any)
{
    Object.freeze(obj)

    Object.getOwnPropertyNames(obj).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(obj, prop)
            && obj[prop] !== null
            && (typeof obj[prop] === "object" || typeof obj[prop] === "function")
            && !Object.isFrozen(obj[prop])
        ) {
            deepFreeze(obj[prop])
        }
    })

    return obj
}

export function compose(...middlewares: Middleware[])
{
    return (store: InternalStore, api: MiddlewareAPI) => {
        middlewares.reduceRight<MiddlewareAPI>(
            (acc, middleware) => Object.assign({}, acc, middleware(store, api)),
            api,
        )
    }
}
