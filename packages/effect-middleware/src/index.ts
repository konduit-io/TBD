import { InternalStore, Middleware, MiddlewareAPI } from "@nulliel/store"
import { getDispatch, getWrapReducer } from "./middleware"

export const effectMiddleware: Middleware = (store: InternalStore, api: MiddlewareAPI) => ({
    dispatch:    getDispatch(store, api),
    wrapReducer: getWrapReducer(store, api),
})
