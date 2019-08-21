import {
    ActionCreator6,
    AnyAction,
    Dispatch,
    EffectResolver,
    InternalReducer,
    InternalStore,
    InternalWrapReducer,
    MiddlewareAPI,
    Reducer,
} from "@nulliel/store"

export const getDispatch = (store: InternalStore, api: MiddlewareAPI): Dispatch =>
    (action: AnyAction) => {
        const reducers = action.reducers as Array<InternalReducer<any>>

        reducers.forEach((reducer) => {
            if (reducer.effects.has(action.type)) {
                // (reducer.handlers.get(action.type)!)(api, action.data)
            }
        })

        return store.dispatch(action)
    }

export const getWrapReducer = <S>(store: InternalStore, api: MiddlewareAPI): InternalWrapReducer =>
    // @ts-ignore
    (reducer: InternalReducer<S>) => {
        reducer.effects = new Set()
        reducer.effect = function effect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(
            actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>,
            handler: EffectResolver<S, P>,
        ): Reducer<S> {
            const actionName = actionCreator.toString()

            if (reducer.handlers.has(actionName)) {
                throw new Error(`Duplicate action ${actionName} registered`)
            }

            actionCreator.assign(reducer)

            // @ts-ignore
            reducer.handlers.set(actionName, handler)
            reducer.effects.add(actionName)
            return reducer
        }

        return api.wrapReducer(reducer)
    }
