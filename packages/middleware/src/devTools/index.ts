import { Middleware } from "@nulliel/store"

import { transformApi } from "./apiTransformer"

/**
 * https://github.com/zalmoxisus/redux-devtools-extension
 *
 * @param store
 * @param dispatch
 */
export const devToolsMiddleware: Middleware = (store, { dispatch }) => {
    // eslint-disable-next-line no-underscore-dangle
    const devTools = window && (window as any).__REDUX_DEVTOOLS_EXTENSION__

    return devTools
        ? transformApi(devTools, store, dispatch)
        : {}
}
