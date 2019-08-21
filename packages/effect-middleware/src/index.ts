import { InternalStore, Middleware, MiddlewareAPI } from "@nulliel/store"
import { getDispatch } from "./middleware"
import { addReducerInjector } from "./reducer"

export const effectMiddleware: Middleware = (store: InternalStore, api: MiddlewareAPI) => {
    addReducerInjector(api)

    return {
        dispatch: getDispatch(store, api),
    }
}
