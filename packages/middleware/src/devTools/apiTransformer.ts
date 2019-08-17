import { AnyAction, Dispatch, InternalStore, MiddlewareAPI } from "@nulliel/store"

import { aggregateState, injectState } from "./stateTransformer"

export const transformApi = (
    devTools: any,
    store: InternalStore,
    dispatch: Dispatch,
): Partial<MiddlewareAPI> => {
    const { init, send, subscribe } = devTools.connect()
    init({})

    subscribe((message: any) => {
        if (message.type === "DISPATCH" && message.payload.type === "JUMP_TO_ACTION") {
            const newState = JSON.parse(message.state)
            injectState(store, newState)
        }
    })

    return {
        dispatch(action: AnyAction) {
            dispatch(action)
            send(action, aggregateState(store))
        },
    }
}
