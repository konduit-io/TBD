import {
    ActionCreator6,
    EffectResolver,
    MiddlewareAPI,
    Reducer,
    ReducerInjector,
} from "@nulliel/store"

export const addReducerInjector = <S>(api: MiddlewareAPI) => {
    const injector: ReducerInjector = (reducer) => {
        reducer.effects = new Set()
        reducer.effect = function effect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(
            actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>,
            handler: EffectResolver<S, P>,
        ): Reducer<unknown> {
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
    }

    api.reducerInjector(injector)
}
