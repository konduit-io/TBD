import { InternalStore, Middleware } from "@nulliel/store"

import { effects } from "./effect"
import { getDispatch } from "./middleware"

export const effectMiddleware: Middleware = (store: InternalStore) => {
    effects.setStore(store)

    return {
        dispatch: getDispatch(store),
    }
}

export const { createEffect } = effects
