import { AnyAction, Middleware } from "@nulliel/store"

import { deepFreeze } from "../utils"

/**
 * @param store
 * @param dispatch
 */
export const freezerMiddleware: Middleware = (store, { dispatch }) => {
    return {
        dispatch(action: AnyAction) {
            dispatch(action)

            action.reducers.forEach((reducer) => {
                deepFreeze(store.resolve(reducer))
            })
        },
    }
}
