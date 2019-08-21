import {
    ActionCreator,
    ActionCreator1,
    ActionCreator2,
    ActionCreator3,
    ActionCreator4,
    ActionCreator5,
    ActionCreator6,
    Dispatch,
    Middleware,
} from "@nulliel/store"

export const effectMiddleware: Middleware

declare module "@nulliel/store" {
    export interface EffectResolver<S, P> {
        (api: EffectAPI<Dispatch, S>, payload: Readonly<P>): Promise<any>
    }

    export interface EffectAPI<D extends Dispatch = Dispatch, S = any> {
        dispatch: D;
        resolve<T>(reducer: Reducer<T>): T;
    }

    /* eslint-disable max-len */
    export interface Reducer<S> {
        effect<P>(actionCreator: ActionCreator, handler: EffectResolver<S, P>): Reducer<S>
        effect<Arg1, P>(actionCreator: ActionCreator1<Arg1, P>, handler: EffectResolver<S, P>): Reducer<S>
        effect<Arg1, Arg2, P>(actionCreator: ActionCreator2<Arg1, Arg2, P>, handler: EffectResolver<S, P>): Reducer<S>
        effect<Arg1, Arg2, Arg3, P>(actionCreator: ActionCreator3<Arg1, Arg2, Arg3, P>, handler: EffectResolver<S, P>): Reducer<S>
        effect<Arg1, Arg2, Arg3, Arg4, P>(actionCreator: ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>, handler: EffectResolver<S, P>): Reducer<S>
        effect<Arg1, Arg2, Arg3, Arg4, Arg5, P>(actionCreator: ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>, handler: EffectResolver<S, P>): Reducer<S>
        effect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>, handler: EffectResolver<S, P>): Reducer<S>
    }
    /* eslint-enable max-len */

    export interface InternalReducer<TState> extends Reducer<TState> {
        effects: Set<string>
    }
}
