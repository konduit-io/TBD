// import { Draft } from "immer"
// import { mergeRight } from "ramda"

//==============
// Local Imports
//==============

import {
    ActionCreator,
    ActionCreator1,
    ActionCreator2,
    ActionCreator3,
    ActionCreator4,
    ActionCreator5,
    ActionCreator6,
    AnyAction
} from "./action";
import { Dispatch } from "./types"

//======
// Types
//======
type Handler<S, P>        = (payload: Readonly<P>, state: S) => Partial<S>
type EffectResolver<S, P> = (api: EffectAPI<Dispatch, S>, payload: Readonly<P>) => Promise<any>

export interface EffectAPI<D extends Dispatch = Dispatch, S = any> {
    dispatch: D;
    resolve<T>(reducer: Reducer<T>): T;
}


export interface Reducer<S> {
    (state: S, action: AnyAction): S

    on<P>(actionCreator: ActionCreator, handler: Handler<S, P>): Reducer<S>
    on<Arg1, P>(actionCreator: ActionCreator1<Arg1, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, P>(actionCreator: ActionCreator2<Arg1, Arg2, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, P>(actionCreator: ActionCreator3<Arg1, Arg2, Arg3, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, Arg4, P>(actionCreator: ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, Arg4, Arg5, P>(actionCreator: ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>, handler: Handler<S, P>): Reducer<S>

    effect<P>(actionCreator: ActionCreator, handler: EffectResolver<S, P>): Reducer<S>
    effect<Arg1, P>(actionCreator: ActionCreator1<Arg1, P>, handler: EffectResolver<S, P>): Reducer<S>
    effect<Arg1, Arg2, P>(actionCreator: ActionCreator2<Arg1, Arg2, P>, handler: EffectResolver<S, P>): Reducer<S>
    effect<Arg1, Arg2, Arg3, P>(actionCreator: ActionCreator3<Arg1, Arg2, Arg3, P>, handler: EffectResolver<S, P>): Reducer<S>
    effect<Arg1, Arg2, Arg3, Arg4, P>(actionCreator: ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>, handler: EffectResolver<S, P>): Reducer<S>
    effect<Arg1, Arg2, Arg3, Arg4, Arg5, P>(actionCreator: ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>, handler: EffectResolver<S, P>): Reducer<S>
    effect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>, handler: EffectResolver<S, P>): Reducer<S>

    isEffect(name: string): boolean
    runEffect<P>(name: string, api: EffectAPI<Dispatch, S>, payload: P): void
}

//========
// Reducer
//========
export function createReducer<TState>(initialState: TState): Reducer<TState>
{
    const effects  = new Set()
    const handlers = new Map()
    const reducer  = createInternalReducer(initialState, handlers)

    reducer.on = function on<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(
        actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>,
        handler: Handler<TState, P>
    ): Reducer<TState> {
        const actionName = actionCreator.toString()

        if (handlers.has(actionName)) {
            throw new Error(`Duplicate action ${actionName} registered`)
        }

        actionCreator.assign(reducer)

        handlers.set(actionName, handler)
        return reducer
    }

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

function createInternalReducer<TState>(initialState: TState, handlers: Map<string, Handler<TState, any>>)
{
    return function reducer(state: TState = initialState, action: AnyAction): TState
    {
        const handler = handlers.get(action.type)

        // if (handler) {
        //     return produce(state, draft => {
        //         return mergeRight(draft, handler(action.payload, draft))
        //     }) as TState
        // }

        return handler
            ? Object.assign({}, state, handler(action.payload, state))
            : state
    } as Reducer<TState>
}

// const data = useSlice(store.reducers.reducer, [ "id" ])
