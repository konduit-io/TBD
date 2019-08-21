import { ActionCreator6, AnyAction, Handler, InternalReducer, Reducer, ReducerInjector } from "../index"
import { assign } from "./polyfill/object"

export const reducerInjectors: Set<ReducerInjector> = new Set()

export const reducerInjector = (injector: ReducerInjector) => {
    reducerInjectors.add(injector)
}

/**
 * TODO: Description
 *
 * @param initialState
 */
export const createReducer = <S>(initialState: S): Reducer<S> => {
    const reducer = ((state: S = initialState, action: AnyAction): S => {
        const handler = reducer.handlers.get(action.type)

        return handler
            ? assign({}, state, handler(action.data, state))
            : state
    }) as InternalReducer<S>

    reducer.handlers = new Map()

    reducer.on = <A1, A2, A3, A4, A5, A6, P>(
        actionCreator: ActionCreator6<A1, A2, A3, A4, A5, A6, P>,
        handler: Handler<S, P>,
    ) => {
        const actionName = actionCreator.toString()

        if (reducer.handlers.has(actionName)) {
            throw new Error(`Action ${actionName} registered on reducer multiple times`)
        }

        actionCreator.assign(reducer)

        reducer.handlers.set(actionName, handler)

        return reducer
    }

    reducerInjectors.forEach((injector) => {
        injector(reducer as InternalReducer<any>)
    })

    return reducer
}
