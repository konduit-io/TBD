import {
    AnyAction,
    Dispatch,
    InternalReducer,
    InternalStore,
    MiddlewareAPI,
} from "@nulliel/store"

export const getDispatch = (store: InternalStore, api: MiddlewareAPI): Dispatch =>
    (action: AnyAction) => {
        const reducers = action.reducers as Array<InternalReducer<any>>
        let handled = false

        reducers.forEach((reducer) => {
            if (reducer.effects.has(action.type)) {
                (reducer.handlers.get(action.type)!)(api, action.data)
                handled = true
            }
        })

        return handled
            ? null
            : store.dispatch(action)
    }
