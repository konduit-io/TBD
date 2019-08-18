import { ActionCreator6, AnyAction, Handler, Reducer } from "../index"

function createInternalReducer<TState>(initialState: TState, handlers: Map<string, Handler<TState, any>>) {
    return function reducer(state: TState = initialState, action: AnyAction): TState {
        const handler = handlers.get(action.type)

        return handler
            ? Object.assign({}, state, handler(action.payload, state))
            : state
    } as Reducer<TState>
}

export function createReducer<TState>(initialState: TState): Reducer<TState> {
    const handlers = new Map()
    const reducer  = createInternalReducer(initialState, handlers)

    reducer.on = <A1, A2, A3, A4, A5, A6, P>(
        actionCreator: ActionCreator6<A1, A2, A3, A4, A5, A6, P>,
        handler: Handler<TState, P>,
    ) => {
        const actionName = actionCreator.toString()

        if (handlers.has(actionName)) {
            throw new Error(`Action ${actionName} registered on reducer multiple times`)
        }

        actionCreator.assign(reducer)

        handlers.set(actionName, handler)

        return reducer
    }

    return reducer
}

/*
    const effects  = new Set()


    reducer.effect = function effect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(
        actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>,
        handler: EffectResolver<TState, P>
    ): Reducer<TState> {
        const actionName = actionCreator.toString()

        if (handlers.has(actionName)) {
            throw new Error(`Duplicate action ${actionName} registered`)
        }

        actionCreator.assign(reducer)

        handlers.set(actionName, handler)
        effects.add(actionName)
        return reducer
    }

    reducer.isEffect = function isEffect(name: string) {
        return effects.has(name)
    }

    reducer.runEffect = function runEffect<P>(name: string, api: EffectAPI<Dispatch, TState>, payload: P)
    {
        if (!handlers.has(name)) {
            throw new Error(`Unknown effect '${name}'`)
        }

        (handlers.get(name)!)(api, payload)
    }

    return reducer
}

*/
